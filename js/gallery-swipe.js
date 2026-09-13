/* Swipeable gallery viewer for multiple approved uploads. */
document.addEventListener('DOMContentLoaded',()=>{
  const grid=document.getElementById('galleryGrid');
  if(!grid)return;
  const cards=()=>Array.from(grid.querySelectorAll('.gallery-card'));
  const waitForViewer=()=>document.querySelector('.gallery-viewer');
  const getItems=()=>cards().map(card=>{
    const media=card.querySelector('.gallery-media img,.gallery-media video');
    if(!media)return null;
    const title=card.querySelector('.gallery-info h2')?.textContent?.trim()||'कुर्डुवाडी';
    return {url:media.currentSrc||media.src,title,type:media.tagName.toLowerCase()==='video'?'video':'image'};
  }).filter(Boolean);
  const install=()=>{
    const viewer=waitForViewer(); if(!viewer||viewer.dataset.swipeReady)return;
    viewer.dataset.swipeReady='1';
    const inner=viewer.querySelector('.gallery-viewer-inner');
    const mediaHost=viewer.querySelector('#viewerMedia');
    const titleHost=viewer.querySelector('#viewerTitle');
    if(!inner||!mediaHost)return;
    const nav=document.createElement('div');nav.className='gallery-swipe-nav';
    nav.innerHTML='<button type="button" class="gallery-prev" aria-label="मागील फोटो">‹</button><span class="gallery-counter">1 / 1</span><button type="button" class="gallery-next" aria-label="पुढील फोटो">›</button>';
    inner.insertBefore(nav,inner.firstChild);
    const items=()=>getItems();
    let index=0;
    const currentUrl=()=>mediaHost.querySelector('img,video')?.currentSrc||mediaHost.querySelector('img,video')?.src||'';
    const syncIndex=()=>{
      const list=items(),u=currentUrl();
      const found=list.findIndex(x=>x.url===u||x.url.split('?')[0]===u.split('?')[0]);
      if(found>=0)index=found;
      return list;
    };
    const render=()=>{
      const list=items(); if(!list.length)return;
      index=(index+list.length)%list.length;const x=list[index];
      mediaHost.innerHTML=x.type==='video'?`<video class="gallery-viewer-media" src="${escSwipe(x.url)}" controls autoplay playsinline></video>`:`<img class="gallery-viewer-media" src="${escSwipe(x.url)}" alt="${escSwipe(x.title)}">`;
      if(titleHost)titleHost.textContent=x.title;
      nav.querySelector('.gallery-counter').textContent=`${index+1} / ${list.length}`;
      nav.querySelector('.gallery-prev').disabled=list.length<2;nav.querySelector('.gallery-next').disabled=list.length<2;
    };
    const escSwipe=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const go=d=>{const list=syncIndex();if(list.length<2)return;index=(index+d+list.length)%list.length;render()};
    nav.querySelector('.gallery-prev').onclick=e=>{e.stopPropagation();go(-1)};
    nav.querySelector('.gallery-next').onclick=e=>{e.stopPropagation();go(1)};
    let sx=0,sy=0,drag=false;
    viewer.addEventListener('touchstart',e=>{if(!viewer.classList.contains('open')||e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;drag=true},{passive:true});
    viewer.addEventListener('touchend',e=>{if(!drag)return;drag=false;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)go(dx<0?1:-1)},{passive:true});
    document.addEventListener('keydown',e=>{if(!viewer.classList.contains('open'))return;if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
    const observer=new MutationObserver(()=>{if(viewer.classList.contains('open')){syncIndex();const list=items();nav.querySelector('.gallery-counter').textContent=`${index+1} / ${list.length}`}});observer.observe(mediaHost,{childList:true});
  };
  const timer=setInterval(()=>{if(waitForViewer()){install();clearInterval(timer)}},100);
});
