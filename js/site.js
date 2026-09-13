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
    if(document.body.classList.contains('premium-home')){
      const main=document.querySelector('.main-column');
      const serviceSection=main?.querySelector(':scope > .section:first-child');
      if(serviceSection) serviceSection.remove();
      const sidebar=document.querySelector('.sidebar');
      if(sidebar && !sidebar.querySelector('.side-service-menu')){
        const box=document.createElement('div');
        box.className='side-box side-service-menu';
        box.innerHTML=`<div class="side-title"><span>🧭</span><div><b>उपयुक्त माहिती</b><small>विभाग निवडा</small></div></div>
          <a class="number-row" href="education.html"><span>🎓</span><div><b>शिक्षण</b><small>शाळा व कॉलेज</small></div><strong>→</strong></a>
          <a class="number-row" href="health.html"><span>🏥</span><div><b>आरोग्य</b><small>हॉस्पिटल व दवाखाने</small></div><strong>→</strong></a>
          <a class="number-row" href="agriculture.html"><span>🌾</span><div><b>शेती</b><small>कृषी माहिती व योजना</small></div><strong>→</strong></a>
          <a class="number-row" href="jobs-business.html"><span>💼</span><div><b>नोकरी व व्यवसाय</b><small>स्थानिक संधी</small></div><strong>→</strong></a>
          <a class="number-row" href="government.html"><span>🏛️</span><div><b>शासकीय सेवा</b><small>योजना व कार्यालये</small></div><strong>→</strong></a>
          <a class="number-row" href="religious.html"><span>🛕</span><div><b>धार्मिक स्थळे</b><small>मंदिरे व माहिती</small></div><strong>→</strong></a>`;
        sidebar.insertBefore(box,sidebar.firstElementChild?.nextElementSibling || sidebar.firstElementChild);
      }
    }
  });
})();
