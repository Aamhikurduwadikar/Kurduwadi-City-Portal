const {SUPABASE_URL,SUPABASE_ANON_KEY}=window.KURDUWADI_CONFIG;
const db = window.supabase && !SUPABASE_URL.startsWith("YOUR_") ? window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY) : null;
const form=document.getElementById("profileForm");
form.addEventListener("submit",async(e)=>{
 e.preventDefault();
 const msg=document.getElementById("formMessage");
 if(!db){msg.textContent="पहिले Supabase URL आणि Anon Key js/profile.js मध्ये जोडा.";return}
 const f=new FormData(form);
 const work_fields=[...form.querySelectorAll('input[name="work_field"]:checked')].map(x=>x.value);
 if(!work_fields.length){msg.textContent="कृपया किमान एक कार्यक्षेत्र निवडा.";return}
 const row={name:f.get("name"),education:f.get("education"),job:f.get("job"),city:f.get("city"),state:f.get("state"),country:f.get("country"),blood_group:f.get("blood_group"),skills:f.get("skills"),phone:f.get("phone"),work_fields,is_public:f.get("is_public")==="on",blood_public:f.get("blood_public")==="on",status:"pending"};
 const {error}=await db.from("profiles").insert(row);
 msg.textContent=error ? "Submit करताना अडचण आली. कृपया पुन्हा प्रयत्न करा." : "✅ माहिती submit झाली. Admin approval नंतर profile Directory मध्ये दिसेल.";
 if(!error) form.reset();
});
