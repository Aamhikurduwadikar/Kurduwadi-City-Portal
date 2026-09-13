const {SUPABASE_URL,SUPABASE_ANON_KEY}=window.KURDUWADI_CONFIG;
const db=window.supabase?.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const grid=document.getElementById('personalityGrid');
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

(async()=>{
  if(!db){grid.innerHTML='<div class="empty">Supabase connection उपलब्ध नाही.</div>';return;}
  const {data,error}=await db.from('personalities').select('*').eq('status','approved').order('created_at',{ascending:false});
  if(error){console.error(error);grid.innerHTML='<div class="empty">माहिती लोड करताना अडचण आली.</div>';return;}
  if(!data?.length){grid.innerHTML='<div class="empty">अजून व्यक्तिमत्त्वे प्रकाशित झालेली नाहीत.</div>';return;}
  const base=location.origin+location.pathname.replace(/[^/]+$/,'');
  grid.innerHTML=data.map(p=>{
    const profileUrl=base+'personality-view.html?id='+encodeURIComponent(p.id);
    const qr='https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data='+encodeURIComponent(profileUrl);
    return `<article class="service-card" style="position:relative">
      <div style="height:190px;border-radius:12px;background:#eef5fa;overflow:hidden;margin:-3px -3px 14px">
        ${p.photo_url?`<img src="${esc(p.photo_url)}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover">`:'<div style="height:100%;display:grid;place-items:center;font-size:55px">🏅</div>'}
      </div>
      <b>${esc(p.name)}</b>
      <small>${esc(p.field||'कुर्डूवाडीशी संबंधित व्यक्तिमत्त्व')}${p.position?' • '+esc(p.position):''}</small>
      <p style="font-size:12px;color:#667e92;line-height:1.6">${esc((p.major_work||p.achievements||p.social_contribution||'प्रेरणादायी कामगिरी आणि योगदान.').slice(0,180))}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <a class="primary-btn" href="personality-view.html?id=${encodeURIComponent(p.id)}">Profile पहा →</a>
        <a class="outline-btn" href="${qr}" target="_blank" rel="noopener">📱 QR</a>
      </div>
      ${p.reference_url?`<a class="text-btn" href="${esc(p.reference_url)}" target="_blank" rel="noopener">अधिक माहिती →</a>`:''}
    </article>`;
  }).join('');
})();
