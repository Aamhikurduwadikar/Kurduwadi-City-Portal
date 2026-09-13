// Shared Phase 3 utilities: safe sharing, copy link, print and QR.
(function(){
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  window.KP={
    share: async function(title){
      const data={title:title||document.title,text:'कुर्डूवाडी सिटी पोर्टल',url:location.href};
      try{if(navigator.share){await navigator.share(data);return true;}await navigator.clipboard.writeText(location.href);alert('लिंक कॉपी झाला.');return true;}catch(e){return false;}},
    copy: async function(){try{await navigator.clipboard.writeText(location.href);alert('लिंक कॉपी झाला.');}catch(e){prompt('लिंक कॉपी करा:',location.href);}},
    print: function(){window.print()},
    addTools: function(target,title){
      const el=typeof target==='string'?document.querySelector(target):target;if(!el||el.dataset.kpTools)return;
      el.dataset.kpTools='1';const box=document.createElement('div');box.className='share-tools';
      box.innerHTML='<button type="button" class="tab" data-share>↗️ शेअर</button><button type="button" class="tab" data-copy>🔗 लिंक कॉपी</button><button type="button" class="tab" data-print>🖨️ प्रिंट</button>';
      box.querySelector('[data-share]').onclick=()=>KP.share(title);box.querySelector('[data-copy]').onclick=KP.copy;box.querySelector('[data-print]').onclick=KP.print;el.appendChild(box);
    }
  };
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-share-tools]').forEach(el=>KP.addTools(el,el.dataset.title||document.title));

    // Homepage: service categories stay in the page. The ☰ button opens them in a slide-out sidebar.
    if(document.body.classList.contains('premium-home')){
      const items=[
        ['🎓','शिक्षण','शाळा व कॉलेज','education.html'],
        ['🏥','आरोग्य','हॉस्पिटल व दवाखाने','health.html'],
        ['🌾','शेती','कृषी माहिती व योजना','agriculture.html'],
        ['💼','नोकरी व व्यवसाय','स्थानिक संधी','jobs-business.html'],
        ['🏛️','शासकीय सेवा','योजना व कार्यालये','government.html'],
        ['🛕','धार्मिक स्थळे','मंदिरे व माहिती','religious.html']
      ];
      if(!document.getElementById('homeSlidePanel')){
        const panel=document.createElement('aside');
        panel.id='homeSlidePanel'; panel.className='home-slide-panel'; panel.setAttribute('aria-hidden','true');
        panel.innerHTML='<div class="home-slide-head"><div><b>उपयुक्त विभाग</b><small>कुर्डुवाडीची माहिती</small></div><button type="button" id="closeHomeSlide" aria-label="बंद करा">×</button></div><div class="home-slide-links">'+items.map(x=>`<a href="${x[3]}"><span>${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div><strong>→</strong></a>`).join('')+'</div>';
        document.body.appendChild(panel);
        const overlay=document.createElement('div'); overlay.id='homeSlideOverlay'; overlay.className='home-slide-overlay';
        document.body.appendChild(overlay);
        const style=document.createElement('style');
        style.textContent=`
          .home-slide-panel{position:fixed;top:0;right:0;width:min(390px,92vw);height:100vh;background:#fff;z-index:9999;box-shadow:-18px 0 50px rgba(0,0,0,.18);transform:translateX(105%);transition:transform .3s ease;overflow:auto;padding:22px}.home-slide-panel.open{transform:translateX(0)}
          .home-slide-overlay{position:fixed;inset:0;background:rgba(10,20,35,.45);z-index:9998;opacity:0;visibility:hidden;transition:.25s}.home-slide-overlay.open{opacity:1;visibility:visible}
          .home-slide-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:18px;border-bottom:1px solid #e8edf3}.home-slide-head b{display:block;font-size:20px}.home-slide-head small{display:block;color:#718096;margin-top:4px}.home-slide-head button{width:40px;height:40px;border:0;border-radius:12px;background:#f1f5f9;font-size:28px;line-height:1;cursor:pointer}
          .home-slide-links{display:grid;gap:10px;margin-top:18px}.home-slide-links a{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #e6ebf2;border-radius:16px;text-decoration:none;color:inherit;background:#fff;transition:.2s}.home-slide-links a:hover{transform:translateX(-3px);box-shadow:0 8px 24px rgba(15,23,42,.09)}.home-slide-links a>span{width:44px;height:44px;display:grid;place-items:center;border-radius:13px;background:#f3f7fb;font-size:23px;flex:none}.home-slide-links a div{flex:1}.home-slide-links a b{display:block;font-size:16px}.home-slide-links a small{display:block;color:#718096;margin-top:3px}.home-slide-links a strong{font-size:20px}
          body.home-slide-open{overflow:hidden}
        `;
        document.head.appendChild(style);
        const open=()=>{panel.classList.add('open');overlay.classList.add('open');panel.setAttribute('aria-hidden','false');document.body.classList.add('home-slide-open');};
        const close=()=>{panel.classList.remove('open');overlay.classList.remove('open');panel.setAttribute('aria-hidden','true');document.body.classList.remove('home-slide-open');};
        document.getElementById('closeHomeSlide').onclick=close; overlay.onclick=close;
        document.getElementById('menuBtn')?.addEventListener('click',open);
        document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
      }
    }
  });
})();
