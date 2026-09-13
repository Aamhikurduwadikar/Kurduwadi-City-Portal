const {SUPABASE_URL,SUPABASE_ANON_KEY}=window.KURDUWADI_CONFIG;

function toggleNav(){
  const nav=document.getElementById('nav');
  if(nav) nav.classList.toggle('open');
}

async function loadCitizens(){
  const grid=document.getElementById('citizenGrid');
  if(!grid) return;
  if(SUPABASE_URL.includes('YOUR-PROJECT')){
    grid.innerHTML='<div class="empty">नागरिक Directory सध्या Demo Mode मध्ये आहे. Supabase जोडल्यावर मंजूर नागरिक येथे दिसतील.</div>';
    const count=document.getElementById('citizenCount'); if(count) count.textContent='0+';
    return;
  }
  try{
    const q=document.getElementById('searchInput')?.value?.trim()||'';
    const city=document.getElementById('cityFilter')?.value||'';
    let url=SUPABASE_URL+'/rest/v1/profiles?select=id,name,education,job,city,state,country,skills,blood_group,phone&status=eq.approved&is_public=eq.true&order=name.asc';
    if(city) url+='&city=eq.'+encodeURIComponent(city);
    const res=await fetch(url,{headers:{apikey:SUPABASE_ANON_KEY,Authorization:'Bearer '+SUPABASE_ANON_KEY}});
    if(!res.ok) throw new Error('API error');
    let data=await res.json();
    if(q){const s=q.toLowerCase();data=data.filter(x=>[x.name,x.education,x.job,x.city,x.state,x.country,x.skills].join(' ').toLowerCase().includes(s));}
    if(!data.length){grid.innerHTML='<div class="empty">शोधानुसार नागरिक सापडले नाहीत.</div>';return;}
    grid.innerHTML=data.map(x=>`<article class="citizen-card"><h3>${escapeHtml(x.name)}</h3><div class="meta">${escapeHtml(x.education||'')} • ${escapeHtml(x.job||'')}</div><div class="meta">📍 ${escapeHtml(x.city||'')}, ${escapeHtml(x.state||'')}</div><div>${(x.skills||'').split(',').slice(0,4).map(s=>`<span class="badge">${escapeHtml(s.trim())}</span>`).join('')}</div></article>`).join('');
  }catch(e){grid.innerHTML='<div class="empty">Database कनेक्शन उपलब्ध नाही. कृपया Supabase सेटिंग तपासा.</div>';}
}
function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
document.addEventListener('DOMContentLoaded',()=>{loadCitizens();});
