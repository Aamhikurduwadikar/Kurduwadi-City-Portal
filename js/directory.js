const {SUPABASE_URL,SUPABASE_ANON_KEY}=window.KURDUWADI_CONFIG;
let supabaseClient=null;
if(window.supabase && SUPABASE_URL?.startsWith('http') && SUPABASE_ANON_KEY) supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

async function loadCitizens(){
  const grid=document.getElementById('citizenGrid'); if(!grid)return;
  if(!supabaseClient){grid.innerHTML='<div class="empty">Database configuration तपासा.</div>';return;}
  const q=(document.getElementById('searchInput')?.value||'').trim();
  const city=(document.getElementById('cityFilter')?.value||'').trim();
  let query=supabaseClient.from('kurduwadi_directory').select('business_name,category,contact_number,address,timings,google_maps_link,status,is_approved').eq('status','approved').eq('is_approved',true).order('business_name',{ascending:true}).limit(100);
  if(city) query=query.ilike('address',`%${city}%`);
  if(q) query=query.or(`business_name.ilike.%${q}%,category.ilike.%${q}%,contact_number.ilike.%${q}%,address.ilike.%${q}%`);
  const {data,error}=await query;
  if(error){console.error(error);grid.innerHTML='<div class="empty">Directory माहिती load झाली नाही. कृपया पुन्हा प्रयत्न करा.</div>';return;}
  if(!data?.length){grid.innerHTML='<div class="empty">सध्या मंजूर Directory माहिती उपलब्ध नाही.</div>';return;}
  grid.innerHTML=data.map(p=>`<article class="citizen-card"><h3>${escapeHtml(p.business_name)}</h3>${p.category?`<div class="meta">${escapeHtml(p.category)}</div>`:''}${p.address?`<p>📍 ${escapeHtml(p.address)}</p>`:''}${p.contact_number?`<p>📞 <a href="tel:${escapeAttr(p.contact_number)}">${escapeHtml(p.contact_number)}</a></p>`:''}${p.timings?`<p>🕒 ${escapeHtml(p.timings)}</p>`:''}${p.google_maps_link?`<a class="text-btn" href="${safeUrl(p.google_maps_link)}" target="_blank" rel="noopener">📍 नकाशावर पहा →</a>`:''}</article>`).join('');
}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function escapeAttr(s){return String(s??'').replace(/[^0-9+()\- ]/g,'');}
function safeUrl(s){const u=String(s??'').trim();return /^https?:\/\//i.test(u)?escapeHtml(u):'#';}
window.loadCitizens=loadCitizens;
document.addEventListener('DOMContentLoaded',loadCitizens);
