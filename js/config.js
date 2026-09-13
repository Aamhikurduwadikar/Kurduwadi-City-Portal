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
  if(!document.getElementById('kpResponsiveFinal')){
    var l=document.createElement('link');l.id='kpResponsiveFinal';l.rel='stylesheet';l.href='css/responsive-final.css';document.head.appendChild(l);
  }
  if(!document.getElementById('kpHeroRestore')){
    var h=document.createElement('link');h.id='kpHeroRestore';h.rel='stylesheet';h.href='css/hero-restore.css';document.head.appendChild(h);
  }
  var s=document.createElement('script');s.src='js/site-enhancements.js';s.defer=true;document.head.appendChild(s);
  var w=document.createElement('script');w.src='js/world-people.js';w.defer=true;document.head.appendChild(w);
  var c=document.createElement('script');c.src='js/sidebar-cleanup.js';c.defer=true;document.head.appendChild(c);
  var h2=document.createElement('script');h2.src='js/header-enhancement.js';h2.defer=true;document.head.appendChild(h2);
})();
