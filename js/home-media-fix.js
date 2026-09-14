/* Fast homepage media loader: small query, lazy media, and a hard timeout. */
(function(){
  const cfg=window.KURDUWADI_CONFIG||{};
  if(!cfg.SUPABASE_URL||!cfg.SUPABASE_ANON_KEY)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const mediaUrl=v=>{let u=String(v||'').trim();if(u&&!/^https?:\/\//i.test(u))u=cfg.SUPABASE_URL.replace(/\/$/,'')+'/storage/v1/object/public/'+(cfg.STORAGE_BUCKET||'community-images')+'/'+u.replace(/^\/+/, '');return u};
  function fallback(host,msg){host.innerHTML='<div style="padding:22px;text-align:center;border:1px dashed #d7dee8;border-radius:18px;background:#f8fafc;color:#64748b;line-height:1.7">📸<br><b style="color:#29445a">'+msg+'</b><br><a href="gallery.html" style="display:inline-block;margin-top:8px;font-weight:800;color:#1769aa;text-decoration:none">गॅलरी उघडा →</a></div>';}
  async function run(){
    if(!document.body.classList.contains('premium-home'))return;
    const host=document.getElementById('homeGallery');if(!host)return;
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),3500);
    try{
      const q=new URLSearchParams({select:'media_url,title,media_type,created_at',status:'eq.approved',order:'created_at.desc',limit:'3'});
      const r=await fetch(cfg.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/gallery_items?'+q,{headers:{apikey:cfg.SUPABASE_ANON_KEY,Authorization:'Bearer '+cfg.SUPABASE_ANON_KEY},signal:controller.signal});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const rows=await r.json();
      if(!rows.length){fallback(host,'अजून मंजूर फोटो / व्हिडिओ उपलब्ध नाहीत.');return;}
      host.innerHTML='<div class="kp-home-gallery">'+rows.map(x=>{const u=esc(mediaUrl(x.media_url)),t=esc(x.title||'कुर्डुवाडी');return x.media_type==='video'?'<a class="kp-home-media" href="gallery.html"><video src="'+u+'" muted playsinline preload="none"></video><span class="kp-play">▶</span><b>'+t+'</b></a>':'<a class="kp-home-media" href="gallery.html"><img src="'+u+'" alt="'+t+'" loading="lazy" decoding="async"><b>'+t+'</b></a>';}).join('')+'</div>';
    }catch(e){console.warn('Home media:',e);fallback(host,e.name==='AbortError'?'फोटो / व्हिडिओ लोड होण्यास वेळ लागतोय. गॅलरी उघडा.':'फोटो / व्हिडिओ सध्या लोड झाले नाहीत.');}
    finally{clearTimeout(timer);}
  }
  document.addEventListener('DOMContentLoaded',()=>run());
})();
