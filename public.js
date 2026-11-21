// Shared behaviour for public pages: mobile menu, header and footer, small helpers.
(function(){
  const ICON={
    check:'<path d="M20 6 9 17l-5-5"/>',shield:'<path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 4.5 5"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    home:'<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',bag:'<path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="14" r="3.5"/>',
    chat:'<path d="M4 5h16v11H9l-5 4z"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',phone:'<rect x="7" y="2" width="10" height="20" rx="3"/><path d="M11 18h2"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };
  window.icon=(n,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]||''}</svg>`;
  document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon,+el.dataset.size||20);});

  const links=[['landing.html#how','How it works'],['landing.html#trust','Safety'],['landing.html#faq','FAQ'],['info.html#about','About'],['info.html#help','Help']];
  const hdr=document.getElementById('site-header');
  if(hdr){
    hdr.className='site-hd';
    hdr.innerHTML=`<div class="wrap"><a class="logo" href="landing.html" aria-label="Corpers Connect home"><b>C</b>Corpers Connect</a>
    <nav class="nav-links" aria-label="Main">${links.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</nav>
    <a class="btn lime sm hd-cta" href="index.html">Open the app</a>
    <button class="menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">${icon('menu',22)}</button></div>
    <div class="mobile-menu" id="mobile-menu">${links.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</div>`;
    const b=document.getElementById('menu-btn'),m=document.getElementById('mobile-menu');
    b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.innerHTML=icon(o?'x':'menu',22);});
    m.addEventListener('click',e=>{if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false');b.innerHTML=icon('menu',22);}});
  }
  const ft=document.getElementById('site-footer');
  if(ft){
    ft.className='site-ft';
    ft.innerHTML=`<div class="wrap"><div class="ft-grid">
      <div><a class="logo" href="landing.html" style="padding:0"><b>C</b>Corpers Connect</a><p class="muted" style="margin:12px 0 0;font-size:14px;max-width:300px">A social network and opportunity marketplace for NYSC corps members.</p></div>
      <div><h4>Product</h4><a href="index.html">Open the app</a><a href="landing.html#how">How it works</a><a href="landing.html#trust">Safety</a><a href="landing.html#install">Install on your phone</a></div>
      <div><h4>Help</h4><a href="info.html#help">Help centre</a><a href="info.html#contact">Contact support</a><a href="info.html#safety">Safety tips</a><a href="info.html#guidelines">Community guidelines</a></div>
      <div><h4>Company</h4><a href="info.html#about">About</a><a href="info.html#terms">Terms of Service</a><a href="info.html#privacy">Privacy Notice</a></div></div>
      <div class="legal-line">Corpers Connect is independent. It is not affiliated with, endorsed by or run by the National Youth Service Corps (NYSC). Verified members are not NYSC officials. This site is a prototype and uses sample content.</div></div>`;
  }
})();
