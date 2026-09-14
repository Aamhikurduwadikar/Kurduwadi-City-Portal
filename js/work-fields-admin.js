/* Admin profile work-field display enhancement. */
(function(){
  const FIELD_LABELS={
    administration:'🏛️ प्रशासकीय सेवा',law:'⚖️ न्याय व विधी',business:'🏭 उद्योग व उद्योजकता',engineering:'⚙️ अभियांत्रिकी व तंत्रज्ञान',health:'👨‍⚕️ वैद्यकीय व आरोग्य',education:'👨‍🏫 शिक्षण',it:'💻 IT / संगणक',agriculture:'🌾 शेती',media:'📰 पत्रकारिता / मीडिया',arts:'🎨 कला व संस्कृती',sports:'🏅 क्रीडा',social:'🤝 सामाजिक कार्य',corporate:'💼 नोकरी / कॉर्पोरेट',trades:'👷 बांधकाम / तांत्रिक व्यवसाय',other:'➕ इतर'
  };
  const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function labels(v){
    const a=Array.isArray(v)?v:(typeof v==='string'&&v.trim()?v.split(',').map(x=>x.trim()):[]);
    return a.map(x=>FIELD_LABELS[x]||x).filter(Boolean);
  }
  function enhance(){
    const root=document.getElementById('profiles'); if(!root)return;
    root.querySelectorAll('.admin-item').forEach(card=>{
      if(card.dataset.workFieldsDone)return;
      const raw=card.getAttribute('data-work-fields');
      if(!raw)return;
      let arr=[];try{arr=JSON.parse(raw)}catch(e){arr=raw.split('|').filter(Boolean)}
      const ls=labels(arr); if(!ls.length)return;
      const p=document.createElement('div');p.className='admin-work-fields';p.innerHTML='<b>🎯 कार्यक्षेत्र:</b> '+ls.map(esc).join(' • ');
      card.appendChild(p);card.dataset.workFieldsDone='1';
    });
  }
  const style=document.createElement('style');style.textContent='.admin-work-fields{margin-top:8px;padding:8px 10px;border-radius:9px;background:#eef7ff;border:1px solid #d5e8f7;color:#174b70;font-size:12px;line-height:1.5}.admin-work-fields b{color:#0b6ea8}';document.head.appendChild(style);
  const observer=new MutationObserver(enhance);observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',enhance);
})();
