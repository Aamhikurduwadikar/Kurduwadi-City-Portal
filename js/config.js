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
  if(!document.getElementById('kpResponsiveFinal')){var l=document.createElement('link');l.id='kpResponsiveFinal';l.rel='stylesheet';l.href='css/responsive-final.css';document.head.appendChild(l)}
  if(!document.getElementById('kpWorldPeopleLight')){var wl=document.createElement('link');wl.id='kpWorldPeopleLight';wl.rel='stylesheet';wl.href='css/world-people-light.css';document.head.appendChild(wl)}
  if(!document.getElementById('kpHeroRestore')){var h=document.createElement('link');h.id='kpHeroRestore';h.rel='stylesheet';h.href='css/hero-restore.css';document.head.appendChild(h)}
  if(!document.getElementById('kpPrideCompact')){var pc=document.createElement('link');pc.id='kpPrideCompact';pc.rel='stylesheet';pc.href='css/personalities-compact.css';document.head.appendChild(pc)}
  if(!document.getElementById('kpProfileMobile')){var pm=document.createElement('link');pm.id='kpProfileMobile';pm.rel='stylesheet';pm.href='css/profile-mobile.css';document.head.appendChild(pm)}
  if(!document.getElementById('kpMobileBottomNavCss')&&!location.pathname.includes('/admin/')){var bn=document.createElement('link');bn.id='kpMobileBottomNavCss';bn.rel='stylesheet';bn.href='css/mobile-bottom-nav.css';document.head.appendChild(bn)}
  var s=document.createElement('script');s.src='js/site-enhancements.js';s.defer=true;document.head.appendChild(s);
  var w=document.createElement('script');w.src='js/world-people.js';w.defer=true;document.head.appendChild(w);
  var c=document.createElement('script');c.src='js/sidebar-cleanup.js';c.defer=true;document.head.appendChild(c);
  var h2=document.createElement('script');h2.src='js/header-enhancement.js';h2.defer=true;document.head.appendChild(h2);
  var r=document.createElement('script');r.src='js/representatives-instagram.js';r.defer=true;document.head.appendChild(r);
  var f=document.createElement('script');f.src='js/final-home-trust-fix.js';f.defer=true;document.head.appendChild(f);
  var a=document.createElement('script');a.src='js/work-fields-admin.js';a.defer=true;document.head.appendChild(a);
  var p=document.createElement('script');p.src='js/home-pride-compact.js';p.defer=true;document.head.appendChild(p);
  var u=document.createElement('script');u.src='js/portal-ui-fixes.js';u.defer=true;document.head.appendChild(u);
  if(!location.pathname.includes('/admin/')){var b=document.createElement('script');b.src='js/mobile-bottom-nav.js';b.defer=true;document.head.appendChild(b)}
})();
