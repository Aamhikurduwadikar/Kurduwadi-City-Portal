// Shared Phase 3 utilities + homepage slidebar.
(function(){
  window.KP={
    share: async function(title){const data={title:title||document.title,text:'कुर्डूवाडी सिटी पोर्टल',url:location.href};try{if(navigator.share){await navigator.share(data);return true;}await navigator.clipboard.writeText(location.href);alert('लिंक कॉपी झाला.');return true;}catch(e){return false;}},
    copy: async function(){try{await navigator.clipboard.writeText(location.href);alert('लिंक कॉपी झाला.');}catch(e){prompt('लिंक कॉपी करा:',location.href);}},
    print:function(){window.print()},
    addTools:function(target,title){const el=typeof target==='string'?document.querySelector(target):target;if(!el||el.dataset.kpTools)return;el.dataset.kpTools='1';const box=document.createElement('div');box.className='share-tools';box.innerHTML='<button type="button" class="tab" data-share>↗️ शेअर</button><button type="button" class="tab" data-copy>🔗 लिंक कॉपी</button><button type="button" class="tab" data-print>🖨️ प्रिंट</button>';box.querySelector('[data-share]').onclick=()=>KP.share(title);box.querySelector('[data-copy]').onclick=KP.copy;box.querySelector('[data-print]').onclick=KP.print;el.appendChild(box)}
  };
  document.addEventListener('DOMContentLoaded',async function(){
    document.querySelectorAll('[data-share-tools]').forEach(el=>KP.addTools(el,el.dataset.title||document.title));
    if(!document.body.classList.contains('premium-home'))return;
    const items=[
      ['🎓','शिक्षण','शाळा व कॉलेज','education.html'],['🏥','आरोग्य','हॉस्पिटल व दवाखाने','health.html'],['🌾','शेती','कृषी माहिती व योजना','agriculture.html'],['💼','नोकरी व व्यवसाय','स्थानिक संधी','jobs-business.html'],['🏛️','शासकीय सेवा','योजना व कार्यालये','government.html'],['🛕','धार्मिक स्थळे','मंदिरे व माहिती','religious.html'],
      ['📍','नकाशा / ठिकाणे','कुर्डुवाडीतील ठिकाणे शोधा','map.html'],['👥','लोकप्रतिनिधी','लोकप्रतिनिधींची माहिती','representatives.html'],['🏙️','लोकसंख्या व शहर माहिती','कुर्डुवाडीची माहिती','city-info.html'],['📋','शासकीय योजना','योजना व सरकारी सुविधा','schemes.html'],['🤝','बचत गट','बचत गटांची माहिती','self-help-groups.html']
    ];
    const menu=document.getElementById('menuBtn');if(!menu)return;
    menu.setAttribute('aria-label','सर्व विभाग उघडा');menu.title='सर्व विभाग';menu.style.display='inline-flex';menu.style.alignItems='center';menu.style.justifyContent='center';

    // Remove the old sidebar contact + quick-link boxes.
    document.querySelectorAll('.sidebar .side-box').forEach(box=>{
      const text=(box.querySelector('.side-title b')?.textContent||'').trim();
      if(text==='महत्त्वाचे संपर्क' || text==='त्वरित दुवे')box.remove();
    });

    // Slidebar contains all requested service/quick-link sections.
    const panel=document.createElement('aside');panel.id='homeSlidePanel';panel.setAttribute('aria-hidden','true');panel.innerHTML='<div class="home-slide-head"><div><b>🧭 सर्व विभाग</b><small>कुर्डुवाडीची माहिती व सेवा</small></div><button type="button" id="closeHomeSlide" aria-label="बंद करा">×</button></div><div class="home-slide-links">'+items.map(x=>'<a href="'+x[3]+'"><span>'+x[0]+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div><strong>→</strong></a>').join('')+'</div>';
    const overlay=document.createElement('div');overlay.id='homeSlideOverlay';document.body.appendChild(overlay);document.body.appendChild(panel);

    // Show real approved photos/videos on the homepage.
    const hubFeature=document.querySelector('.hub-feature');
    const cfg=window.KURDUWADI_CONFIG||{};
    if(hubFeature && window.supabase && cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY){
      try{
        const db=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
        const {data}=await db.from('gallery_items').select('media_url,title,media_type').eq('status','approved').order('created_at',{ascending:false}).limit(6);
        if(data&&data.length){
          const safe=s=>String(s||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
          hubFeature.innerHTML='<div class="home-gallery-head"><div><div class="hub-feature-icon">📸</div><div><b>आपली Photo / Video</b><small>कुर्डुवाडीतील नागरिकांनी पाठवलेले फोटो आणि व्हिडिओ</small></div></div><a href="gallery.html">सर्व पहा →</a></div><div class="home-gallery-preview">'+data.map(x=>x.media_type==='video'?'<a href="gallery.html" class="home-gallery-item video"><video src="'+safe(x.media_url)+'" muted preload="metadata"></video><span>▶</span><b>'+safe(x.title||'व्हिडिओ')+'</b></a>':'<a href="gallery.html" class="home-gallery-item"><img src="'+safe(x.media_url)+'" alt="'+safe(x.title||'कुर्डुवाडी फोटो')+'" loading="lazy"><b>'+safe(x.title||'कुर्डुवाडी फोटो')+'</b></a>').join('')+'</div>';
          hubFeature.style.display='block';
        }
      }catch(e){console.warn('Homepage gallery preview unavailable',e);}
    }

    const style=document.createElement('style');style.textContent=`
      #menuBtn{display:inline-flex!important;cursor:pointer!important}
      #homeSlidePanel{position:fixed;top:0;right:0;width:min(410px,92vw);height:100vh;background:#fff;z-index:100001;box-shadow:-18px 0 50px rgba(0,0,0,.22);transform:translateX(105%);transition:transform .32s ease;overflow:auto;padding:22px;box-sizing:border-box}
      #homeSlidePanel.open{transform:translateX(0)}#homeSlideOverlay{position:fixed;inset:0;background:rgba(10,20,35,.5);z-index:100000;opacity:0;visibility:hidden;transition:opacity .25s ease}#homeSlideOverlay.open{opacity:1;visibility:visible}
      .home-slide-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:18px;border-bottom:1px solid #e8edf3}.home-slide-head b{display:block;font-size:21px}.home-slide-head small{display:block;color:#718096;margin-top:4px}.home-slide-head button{width:42px;height:42px;border:0;border-radius:12px;background:#f1f5f9;font-size:28px;cursor:pointer}
      .home-slide-links{display:grid;gap:10px;margin-top:18px}.home-slide-links a{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #e5eaf0;border-radius:16px;text-decoration:none;color:#172033;background:#fff}.home-slide-links a:hover{box-shadow:0 8px 24px rgba(15,23,42,.1);transform:translateX(-2px)}.home-slide-links a>span{width:46px;height:46px;display:grid;place-items:center;border-radius:13px;background:#f2f6fa;font-size:23px;flex:none}.home-slide-links a div{flex:1}.home-slide-links a b{display:block;font-size:16px}.home-slide-links a small{display:block;color:#718096;margin-top:3px}.home-slide-links a strong{font-size:20px;color:#64748b}body.home-slide-open{overflow:hidden}
      .home-gallery-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:16px}.home-gallery-head>div{display:flex;align-items:center;gap:12px}.home-gallery-head .hub-feature-icon{margin:0}.home-gallery-head b{display:block;font-size:18px}.home-gallery-head small{display:block;color:#718096;margin-top:4px}.home-gallery-head>a{white-space:nowrap;text-decoration:none;font-weight:700}.home-gallery-preview{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.home-gallery-item{position:relative;display:block;overflow:hidden;border-radius:14px;background:#f1f5f9;text-decoration:none;color:inherit;min-height:150px}.home-gallery-item img,.home-gallery-item video{width:100%;height:150px;display:block;object-fit:cover}.home-gallery-item b{position:absolute;left:0;right:0;bottom:0;padding:28px 10px 9px;color:#fff;font-size:13px;background:linear-gradient(transparent,rgba(0,0,0,.75));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.home-gallery-item.video>span{position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.7);color:#fff}.home-gallery-item:hover{transform:translateY(-2px)}
      @media(max-width:700px){#homeSlidePanel{width:88vw}.menu-btn{display:inline-flex!important}.home-gallery-preview{grid-template-columns:repeat(2,minmax(0,1fr))}.home-gallery-item,.home-gallery-item img,.home-gallery-item video{height:125px}.home-gallery-head{align-items:flex-start}.home-gallery-head>a{font-size:13px}}
    `;document.head.appendChild(style);
    const open=()=>{panel.classList.add('open');overlay.classList.add('open');panel.setAttribute('aria-hidden','false');document.body.classList.add('home-slide-open')};const close=()=>{panel.classList.remove('open');overlay.classList.remove('open');panel.setAttribute('aria-hidden','true');document.body.classList.remove('home-slide-open')};
    menu.onclick=open;document.getElementById('closeHomeSlide').onclick=close;overlay.onclick=close;document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  });
})();
