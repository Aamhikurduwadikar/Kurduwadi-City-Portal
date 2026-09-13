/* Small global enhancements kept separate from page-specific scripts. */
document.addEventListener('DOMContentLoaded',()=>{
  const addTravel=()=>{
    const drawer=document.getElementById('kpPremiumDrawer');
    const links=drawer?.querySelector('.kp-drawer-links');
    if(!links||links.querySelector('a[href="travel.html"]'))return;
    const a=document.createElement('a');
    a.href='travel.html';
    a.innerHTML='<span class="kp-icon">🚆</span><span class="kp-link-text"><b>रेल्वे / एसटी वेळापत्रक</b><small>प्रवासाची माहिती आणि Travel Hub</small></span><em>19</em><strong>›</strong>';
    links.appendChild(a);
  };

  const addAdminLogin=()=>{
    const footer=document.querySelector('footer');
    if(!footer||footer.querySelector('a[href="admin/"]'))return;
    const wrap=document.createElement('div');
    wrap.className='kp-admin-login-wrap';
    wrap.innerHTML='<a class="kp-admin-login" href="admin/" aria-label="Admin Login">🔐 Admin Login</a>';
    footer.appendChild(wrap);
  };

  addTravel();
  addAdminLogin();
  const obs=new MutationObserver(()=>{addTravel();addAdminLogin();});
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>obs.disconnect(),5000);
});
