// Theme: 'system' (default), 'light' or 'dark'. Saved in localStorage, applied before first paint.
(function(){
  var KEY='cc-theme',mq=window.matchMedia?matchMedia('(prefers-color-scheme: light)'):null;
  function pref(){try{return localStorage.getItem(KEY)||'system';}catch(e){return 'system';}}
  function resolve(p){return p==='system'?(mq&&mq.matches?'light':'dark'):p;}
  function apply(){
    var t=resolve(pref()),r=document.documentElement;
    r.setAttribute('data-theme',t);r.style.colorScheme=t;
    var m=document.querySelector('meta[name="theme-color"]');
    if(!m&&document.head){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m);}
    if(m)m.content=t==='light'?'#F6F7F2':'#0F1211';
  }
  var api={
    get:pref,resolved:function(){return resolve(pref());},
    set:function(p){try{localStorage.setItem(KEY,p);}catch(e){}apply();window.dispatchEvent(new Event('cc-theme'));},
    next:function(){var o=['system','light','dark'];api.set(o[(o.indexOf(pref())+1)%3]);},
    label:function(){var p=pref();return p==='system'?'System':p==='light'?'Light':'Dark';}
  };
  window.CCTheme=api;apply();
  if(mq){var h=function(){if(pref()==='system'){apply();window.dispatchEvent(new Event('cc-theme'));}};mq.addEventListener?mq.addEventListener('change',h):mq.addListener(h);}
  window.addEventListener('storage',function(e){if(e.key===KEY){apply();window.dispatchEvent(new Event('cc-theme'));}});
})();
