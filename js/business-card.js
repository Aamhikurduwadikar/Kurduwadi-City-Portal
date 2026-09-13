(function(){
  'use strict';
  const form=document.getElementById('cardForm');
  const msg=document.getElementById('cardMsg');
  if(!form||!msg)return;

  function show(text,type='info'){
    msg.textContent=text;
    msg.style.color=type==='error'?'#b42318':type==='success'?'#067647':'';
  }

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    const btn=form.querySelector('button[type="submit"],button');
    if(btn)btn.disabled=true;
    show('⏳ कार्ड तयार करत आहे...');
    try{
      const cfg=window.KURDUWADI_CONFIG;
      if(!cfg?.SUPABASE_URL||!cfg?.SUPABASE_ANON_KEY)throw new Error('Supabase configuration सापडली नाही.');
      if(!window.supabase?.createClient)throw new Error('Supabase library load झाली नाही.');
      const db=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
      const f=new FormData(form);
      const name=String(f.get('name')||'').trim();
      if(!name)throw new Error('कृपया नाव भरा.');
      const slug=(name+'-'+Date.now()).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||('card-'+Date.now());
      const {data:authData,error:authError}=await db.auth.getUser();
      if(authError)console.warn('Auth check:',authError.message);
      const user=authData?.user||null;
      const row={
        user_id:user?.id||null,
        name,
        designation:String(f.get('designation')||'').trim()||null,
        business_name:String(f.get('business_name')||'').trim()||null,
        phone:String(f.get('phone')||'').trim()||null,
        whatsapp:String(f.get('whatsapp')||'').trim()||null,
        email:String(f.get('email')||'').trim()||null,
        address:String(f.get('address')||'').trim()||null,
        website:String(f.get('website')||'').trim()||null,
        instagram:String(f.get('instagram')||'').trim()||null,
        facebook:String(f.get('facebook')||'').trim()||null,
        bio:String(f.get('bio')||'').trim()||null,
        slug,
        status:'pending'
      };
      const {data,error}=await db.from('business_cards').insert(row).select('id,slug').single();
      if(error)throw error;
      form.reset();
      show('✅ डिजिटल बिझनेस कार्ड submit झाले. Admin मंजुरीनंतर public card तयार होईल.','success');
      const link=document.createElement('a');
      link.href='business-card-view.html?slug='+encodeURIComponent(data.slug);
      link.textContent=' Public card link';
      link.style.display='inline-block';
      link.style.marginLeft='8px';
      link.style.textDecoration='underline';
      link.onclick=function(ev){ev.preventDefault();show('ℹ️ हे कार्ड अजून pending आहे. Admin मंजुरीनंतर ही लिंक उघडेल.');};
      msg.appendChild(link);
    }catch(err){
      console.error('Digital business card error:',err);
      show('❌ कार्ड submit झाले नाही: '+(err?.message||'अज्ञात त्रुटी'),'error');
    }finally{if(btn)btn.disabled=false;}
  });
})();
