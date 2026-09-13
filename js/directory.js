const {SUPABASE_URL,SUPABASE_ANON_KEY}=window.KURDUWADI_CONFIG;
let supabaseClient = null;
if (window.supabase && !SUPABASE_URL.startsWith("YOUR_")) supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function toggleNav(){document.getElementById("nav").classList.toggle("open")}
async function loadCitizens(){
  const grid=document.getElementById("citizenGrid"); if(!grid)return;
  if(!supabaseClient){grid.innerHTML='<div class="empty">Database configuration पूर्ण केल्यानंतर नागरिक येथे दिसतील.</div>';return}
  const q=(document.getElementById("searchInput")?.value||"").trim();
  const city=document.getElementById("cityFilter")?.value||"";
  let query=supabaseClient.from("profiles").select("name,education,job,city,state,country,skills").eq("status","approved").eq("is_public",true).order("created_at",{ascending:false}).limit(30);
  if(city) query=query.eq("city",city);
  if(q) query=query.or(`name.ilike.%${q}%,education.ilike.%${q}%,job.ilike.%${q}%,skills.ilike.%${q}%,city.ilike.%${q}%`);
  const {data,error}=await query;
  if(error){grid.innerHTML='<div class="empty">माहिती load झाली नाही. Database settings तपासा.</div>';return}
  if(!data.length){grid.innerHTML='<div class="empty">या शोधासाठी नागरिक सापडले नाहीत.</div>';return}
  grid.innerHTML=data.map(p=>`<div class="citizen-card"><h3>${escapeHtml(p.name)}</h3><div class="meta">${escapeHtml([p.city,p.state,p.country].filter(Boolean).join(", "))}</div>${p.education?`<span class="badge">🎓 ${escapeHtml(p.education)}</span>`:""}${p.job?`<span class="badge">💼 ${escapeHtml(p.job)}</span>`:""}${p.skills?`<p>${escapeHtml(p.skills)}</p>`:""}</div>`).join("");
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
document.addEventListener("DOMContentLoaded",loadCitizens);
