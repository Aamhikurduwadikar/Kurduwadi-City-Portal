/* आपली माणसं, जगभर — live city directory from approved public profiles. */
(function(){
  const CFG=window.KURDUWADI_CONFIG||{};
  const API=CFG.SUPABASE_URL;
  const KEY=CFG.SUPABASE_ANON_KEY;
  if(!API||!KEY)return;

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const norm=v=>String(v||'').trim().replace(/\s+/g,' ');
  const cityKey=(city,country)=>`${norm(city).toLowerCase()}|${norm(country).toLowerCase()}`;
  let people=[];

  function injectStyles(){
    if(document.getElementById('worldPeopleStyles'))return;
    const s=document.createElement('style');s.id='worldPeopleStyles';
    s.textContent=`
      .world-people-section{position:relative;overflow:hidden;background:linear-gradient(135deg,#0b1f33 0%,#123b5d 55%,#0b273d 100%);color:#fff;border-radius:28px;padding:42px 34px;margin:0 auto 34px;max-width:1180px;box-shadow:0 18px 50px rgba(8,35,56,.18)}
      .world-people-section:before{content:'🌍';position:absolute;right:-18px;top:-42px;font-size:170px;opacity:.08;pointer-events:none}
      .world-people-section .section-label{color:#9ed8ff}.world-people-section h2{color:#fff;margin-bottom:8px}.world-people-section .section-sub{color:rgba(255,255,255,.76)}
      .world-people-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-end;position:relative;z-index:1}.world-people-count{min-width:105px;text-align:center;padding:12px 16px;border:1px solid rgba(255,255,255,.16);border-radius:16px;background:rgba(255,255,255,.07)}
      .world-people-count b{display:block;font-size:28px}.world-people-count span{font-size:12px;color:rgba(255,255,255,.7)}
      .world-city-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:24px;position:relative;z-index:1}
      .world-city-card{display:flex;align-items:center;gap:12px;padding:15px 16px;border:1px solid rgba(255,255,255,.12);border-radius:17px;background:rgba(255,255,255,.075);color:#fff;text-decoration:none;transition:.2s transform,.2s background}.world-city-card:hover{transform:translateY(-3px);background:rgba(255,255,255,.13)}
      .world-city-pin{font-size:22px}.world-city-info{min-width:0;flex:1}.world-city-name{display:block;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.world-city-country{display:block;font-size:11px;color:rgba(255,255,255,.58);margin-top:2px}.world-city-count{font-weight:900;font-size:15px;white-space:nowrap}
      .world-people-all{display:inline-flex;margin-top:20px;padding:11px 17px;border:1px solid rgba(255,255,255,.2);border-radius:999px;color:#fff;text-decoration:none;background:rgba(255,255,255,.08);font-weight:700;position:relative;z-index:1}
      .world-empty{padding:20px;border:1px dashed rgba(255,255,255,.22);border-radius:18px;color:rgba(255,255,255,.76);margin-top:20px}.world-empty b{display:block;color:#fff;margin-bottom:5px}
      .world-people-modal{position:fixed;inset:0;background:rgba(3,15,25,.72);backdrop-filter:blur(6px);z-index:9999;display:none;align-items:center;justify-content:center;padding:20px}.world-people-modal.open{display:flex}.world-modal-card{width:min(760px,100%);max-height:86vh;overflow:auto;background:#fff;color:#102a43;border-radius:24px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.3)}
      .world-modal-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.world-modal-head h3{margin:0;font-size:25px}.world-modal-close{border:0;background:#edf3f7;border-radius:50%;width:38px;height:38px;font-size:20px;cursor:pointer}.world-person-list{display:grid;gap:10px;margin-top:18px}.world-person{border:1px solid #e5edf2;border-radius:16px;padding:15px}.world-person b{display:block;font-size:17px}.world-person small{display:block;color:#5d7284;margin-top:4px}.world-person-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.world-person-actions a{padding:8px 12px;border-radius:999px;text-decoration:none;background:#edf6fb;color:#0b4d70;font-size:13px;font-weight:700}
      @media(max-width:900px){.world-city-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.world-people-section{margin-left:14px;margin-right:14px;padding:30px 22px}}
      @media(max-width:560px){.world-people-head{align-items:flex-start;flex-direction:column}.world-city-grid{grid-template-columns:1fr}.world-people-section{border-radius:22px;padding:28px 18px}.world-city-card{padding:14px}}
    `;document.head.appendChild(s);
  }

  function mount(){
    if(document.getElementById('worldPeopleSection'))return;
    const main=document.querySelector('main');if(!main)return;
    injectStyles();
    const section=document.createElement('section');section.id='worldPeopleSection';section.className='section world-people-section';
    section.innerHTML=`<div class="world-people-head"><div><div class="section-label">KURDUWADI • EVERYWHERE</div><h2>🌍 आपली माणसं, जगभर</h2><p class="section-sub">कुर्डूवाडीतील आपली माणसं आज कोणकोणत्या शहरांत आहेत ते जाणून घ्या.</p></div><div class="world-people-count"><b id="worldPeopleTotal">—</b><span>कुर्डूवाडीकर</span></div></div><div id="worldCityGrid" class="world-city-grid"><div class="world-empty" style="grid-column:1/-1"><b>शहरे शोधत आहोत…</b><span>मंजूर सार्वजनिक प्रोफाइलमधून माहिती तयार होत आहे.</span></div></div><a class="world-people-all" href="profile.html">👥 आपली प्रोफाइल माहिती जोडा →</a>`;
    const anchor=main.querySelector('.home-photo-section')||main.firstElementChild;main.insertBefore(section,anchor);
    const modal=document.createElement('div');modal.id='worldPeopleModal';modal.className='world-people-modal';modal.innerHTML=`<div class="world-modal-card" role="dialog" aria-modal="true" aria-labelledby="worldModalTitle"><div class="world-modal-head"><div><div class="section-label" style="color:#16709d">कुर्डूवाडीकर</div><h3 id="worldModalTitle">शहर</h3></div><button class="world-modal-close" type="button" aria-label="बंद करा">×</button></div><div id="worldPersonList" class="world-person-list"></div></div>`;document.body.appendChild(modal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});modal.querySelector('.world-modal-close').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
    load();
  }

  function closeModal(){document.getElementById('worldPeopleModal')?.classList.remove('open');}
  function openCity(key){
    const parts=key.split('|');const city=parts[0],country=parts[1];
    const rows=people.filter(p=>cityKey(p.city,p.country)===key);
    document.getElementById('worldModalTitle').textContent=`${norm(rows[0]?.city)||city}${country?' • '+norm(rows[0]?.country):''}`;
    const list=document.getElementById('worldPersonList');
    list.innerHTML=rows.map(p=>{const phone=String(p.phone||'').replace(/[^0-9+]/g,'');return `<article class="world-person"><b>${esc(p.name||'कुर्डूवाडीकर')}</b>${p.job?`<small>💼 ${esc(p.job)}</small>`:''}${p.education?`<small>🎓 ${esc(p.education)}</small>`:''}<div class="world-person-actions">${phone?`<a href="tel:${esc(phone)}">📞 संपर्क</a><a href="https://wa.me/${encodeURIComponent(phone.replace(/^\+/,''))}" target="_blank" rel="noopener">💬 WhatsApp</a>`:''}</div></article>`;}).join('');
    document.getElementById('worldPeopleModal').classList.add('open');
  }

  async function load(){
    const grid=document.getElementById('worldCityGrid');
    try{
      const params=new URLSearchParams({select:'id,name,job,education,city,state,country,phone',status:'eq.approved',is_public:'eq.true',order:'city.asc',limit:'5000'});
      const r=await fetch(`${API}/rest/v1/profiles?${params}`,{headers:{apikey:KEY,Authorization:`Bearer ${KEY}`}});if(!r.ok)throw new Error(`profiles HTTP ${r.status}`);
      people=await r.json();
      const groups=new Map();people.forEach(p=>{if(!norm(p.city))return;const key=cityKey(p.city,p.country);if(!groups.has(key))groups.set(key,{key,city:norm(p.city),country:norm(p.country),count:0});groups.get(key).count++;});
      const cities=[...groups.values()].sort((a,b)=>b.count-a.count||a.city.localeCompare(b.city,'mr'));
      document.getElementById('worldPeopleTotal').textContent=people.length;
      if(!cities.length){grid.innerHTML='<div class="world-empty" style="grid-column:1/-1"><b>अजून शहरांची माहिती उपलब्ध नाही.</b><span>नागरिकांची प्रोफाइल Admin ने मंजूर झाल्यानंतर येथे शहर आणि संख्या आपोआप दिसेल.</span></div>';return;}
      grid.innerHTML=cities.map(c=>`<a href="#" class="world-city-card" data-city-key="${esc(c.key)}"><span class="world-city-pin">📍</span><span class="world-city-info"><span class="world-city-name">${esc(c.city)}</span><span class="world-city-country">${esc(c.country||'भारत')}</span></span><span class="world-city-count">${c.count}</span></a>`).join('');
      grid.querySelectorAll('[data-city-key]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openCity(a.dataset.cityKey);}));
    }catch(err){console.error('World people:',err);grid.innerHTML='<div class="world-empty" style="grid-column:1/-1"><b>माहिती सध्या लोड झाली नाही.</b><span>कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.</span></div>';}
  }

  document.addEventListener('DOMContentLoaded',mount);
})();
