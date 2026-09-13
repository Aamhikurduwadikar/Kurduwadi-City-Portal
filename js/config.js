// Supabase public frontend configuration.
// Only publishable/anon keys belong in browser code. NEVER put a service_role/secret key here.
window.KURDUWADI_CONFIG = {
  SUPABASE_URL: 'https://rjfgfdgrqficffbyqvlf.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_G3lGu7INXtIGmjum8nj7_A_opGtO3B2',
  STORAGE_BUCKET: 'community-images',
  GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',
  SITE_NAME: 'Kurduwadi City Portal',
  SITE_URL: 'https://kurduwadi-city-portal.vercel.app/'
};
(function(){
  if(document.getElementById('kpResponsiveFinal'))return;
  var l=document.createElement('link');l.id='kpResponsiveFinal';l.rel='stylesheet';l.href='css/responsive-final.css';
  document.head.appendChild(l);
})();
