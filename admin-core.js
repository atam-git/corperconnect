// Admin prototype core: state, permissions, shell, auth, drawer, modal, events.
const S={authed:sessionStorage.getItem('ccadm')==='1',step:'login',persona:'a1',route:'overview',sideOpen:false,drawer:null,modal:null,toast:null,
  tab:{},q:{},sel:{},reveal:{},img:{},focus:null,roleSel:'STAFF_MODERATOR',menuOpen:false,auth:{email:'ada@corpersconnect.example',err:'',code:''}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=id=>document.getElementById(id);
const val=id=>{const e=$(id);return e?e.value.trim():'';};

const IC={
 overview:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
 verify:'<path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
 members:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 4.5 5"/>',
 communities:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
 moderation:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 listings:'<path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
 events:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 announce:'<path d="M3 11v3a1 1 0 0 0 1 1h3l8 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
 camp:'<path d="M3 20 12 4l9 16z"/><path d="M12 20v-6"/>',
 support:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
 analytics:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
 config:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
 audit:'<path d="M7 3h10l3 3v15H4V3z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
 admins:'<circle cx="8" cy="15" r="4"/><path d="M11 12 20 3M16 7l3 3"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',logout:'<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',pin:'<path d="M12 17v5M8 3h8l-1 7 3 4H6l3-4z"/>'
};
const I=(n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;

// ---------- Permissions ----------
const persona=()=>ADMINS.find(a=>a.id===S.persona);
const roleOf=id=>ROLES.find(r=>r.id===id);
const perms=()=>new Set(persona().roles.flatMap(r=>[...(roleOf(r)?roleOf(r).perms:[])]));
const can=k=>perms().has(k);
const canAny=(...k)=>k.some(can);
function lockBtn(perm,label,cls='dark',extra=''){return `<button class="btn ${cls} ${extra}" disabled title="Needs ${perm}">${I('lock',14)}${label}</button>`;}
function abtn(perm,label,cls,a,data='',extra=''){return !perm||can(perm)?`<button class="btn ${cls} ${extra}" data-a="${a}" ${data}>${label}</button>`:lockBtn(perm,label,'dark',extra);}

function audit(action,target,reason){AUDIT.unshift({when:'Just now',actor:persona().name,type:'ADMIN',action,target,reason:reason||'—'});}
function toast(m,bad){S.toast={m,bad};render();clearTimeout(toast.t);toast.t=setTimeout(()=>{S.toast=null;render();},2600);}
function deny(perm){toast(`ADMIN_PERMISSION_DENIED · needs ${perm}`,true);}

// ---------- Small UI helpers ----------
const av=(name,color,size=34,photo)=>photo?`<span class="av" style="width:${size}px;height:${size}px"><img src="${photo}" alt=""></span>`:`<span class="av" style="width:${size}px;height:${size}px;background:${color||COL[0]};font-size:${Math.round(size*.38)}px">${esc(name.split(' ').map(w=>w[0]).slice(0,2).join(''))}</span>`;
const mav=(m,s=34)=>av(m.name,COL[m.id.length%9],s,m.photo);
const tagFor={VERIFIED:'lime',PENDING:'or',UNVERIFIED:'',REJECTED:'red',ACTIVE:'lime',SUSPENDED:'red',RESTRICTED:'or',BANNED:'red',HIGH:'red',NORMAL:'',OPEN:'or',IN_PROGRESS:'blue',RESOLVED:'lime',APPROVED:'lime',ESCALATED:'blue',RESUBMIT_REQUESTED:'or',UPCOMING:'lime',COMPLETED:'blue',CANCELLED:'red',AVAILABLE:'lime',SOLD:'',FILLED:'',OFFICIAL:'lime',PLATFORM:'blue',MODERATOR:'',MEMBER:'',INVITED:'or',LOCKED:'red',DEACTIVATED:'red',FLAG:'or',BLOCK:'red'};
const tag=(t,label)=>`<span class="tag ${tagFor[t]??''}">${esc(label||String(t).replace(/_/g,' ').toLowerCase())}</span>`;
function table(heads,rows,empty){return `<div class="tbl-wrap"><table><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${heads.length}" class="empty">${empty||'Nothing here'}</td></tr>`}</tbody></table></div>`;}
function chipRow(key,opts,def){const cur=S.tab[key]||def||opts[0][0];return `<div class="chips" role="tablist">${opts.map(([id,label,c])=>`<button class="chip ${cur===id?'on':''}" role="tab" aria-selected="${cur===id}" data-a="tab" data-k="${key}" data-v="${id}">${label}${c!==undefined?` <span class="c">${c}</span>`:''}</button>`).join('')}</div>`;}
const cur=(key,def)=>S.tab[key]||def;
function searchBox(key,ph){return `<div class="search" style="margin-bottom:14px"><span>${I('search',16)}</span><label class="sr" for="q-${key}">${ph}</label><input id="q-${key}" data-live="${key}" value="${esc(S.q[key]||'')}" placeholder="${ph}"></div>`;}
const hrs=h=>h<1?'just now':h<24?h+'h ago':Math.floor(h/24)+'d ago';
function sla(h,target=48){const c=h>=target*.83?'#FF8A3D':h>=target*.5?'#FFD66B':'#C8F169';return `<span style="color:${c};font-weight:700">${h}h</span><span class="muted"> of ${target}h</span>`;}
function field(label,id,{type='text',ph='',v='',opts,area,hint}={}){const c=opts?`<select class="inp" id="${id}">${opts.map(o=>{const [a,b]=Array.isArray(o)?o:[o,o];return `<option value="${esc(a)}" ${String(v)===String(a)?'selected':''}>${esc(b)}</option>`;}).join('')}</select>`:area?`<textarea class="inp" id="${id}" placeholder="${esc(ph)}">${esc(v)}</textarea>`:`<input class="inp" id="${id}" type="${type}" value="${esc(v)}" placeholder="${esc(ph)}">`;return `<div class="field"><label for="${id}">${label}</label>${c}${hint?`<span class="hint">${hint}</span>`:''}<span class="err" id="err-${id}"></span></div>`;}
const sw=(on,a,data='',dis=false)=>`<button class="sw ${on?'on':''}" role="switch" aria-checked="${!!on}" data-a="${a}" ${data} ${dis?'disabled':''}></button>`;

function openModal(m){S.modal=m;render();}
function closeModal(){S.modal=null;render();}
function openDrawer(type,id){S.drawer={type,id};render();}
function closeDrawer(){S.drawer=null;render();}
function ferr(id,msg){const e=$('err-'+id);if(e)e.textContent=msg||'';const i=$(id);if(i)i.classList.toggle('bad',!!msg);return !msg;}

// ---------- Auth views ----------
function authView(){
  const a=S.auth;
  const brand=`<div class="brand"><b>C</b><span>Corpers Connect<small style="display:block;font-family:Inter;font-size:10px;letter-spacing:1px;color:#FF8A3D;text-transform:uppercase">Admin console</small></span></div>`;
  if(S.step==='login') return `<div class="auth"><div class="box">${brand}<h1 class="hd" style="font-size:26px;margin:0 0 6px">Sign in</h1><p class="muted" style="margin:0 0 18px">Staff only. Admins are invited. MFA is required.</p>
   ${field('Work email','a-email',{type:'email',v:a.email})}${field('Password','a-pass',{type:'password',v:'demo-password'})}<div class="err" style="margin-bottom:8px">${esc(a.err)}</div>
   <button class="btn lime block" data-a="login">Continue</button>
   <button class="btn block" style="color:#C8F169;margin-top:8px" data-a="goStep" data-v="invite">I have an invite link</button>
   <p class="hint" style="margin-top:14px">Prototype: any password works. Your account locks after 5 failed attempts for 15 minutes.</p></div></div>`;
  if(S.step==='mfa') return `<div class="auth"><div class="box">${brand}<h1 class="hd" style="font-size:26px;margin:0 0 6px">Enter your MFA code</h1><p class="muted" style="margin:0 0 18px">Open your authenticator app and enter the 6-digit code for Corpers Connect.</p>
   <div class="otp" role="group" aria-label="6 digit code">${[0,1,2,3,4,5].map(i=>`<input inputmode="numeric" maxlength="1" id="otp${i}" data-otp="${i}" aria-label="Digit ${i+1}">`).join('')}</div><div class="err" style="margin:8px 0">${esc(a.err)}</div>
   <button class="btn lime block" data-a="verifyMfa">Verify and sign in</button>
   <button class="btn block" style="color:#A3ABA5;margin-top:6px" data-a="goStep" data-v="login">Back</button>
   <p class="hint" style="margin-top:12px">Prototype: any 6 digits work.</p></div></div>`;
  return `<div class="auth"><div class="box">${brand}<h1 class="hd" style="font-size:26px;margin:0 0 6px">Accept your invite</h1><p class="muted" style="margin:0 0 14px">Set a password and enrol an authenticator app. Invites expire after 72 hours.</p>
   ${field('Password','i-pass',{type:'password',ph:'At least 12 characters'})}${field('Confirm password','i-pass2',{type:'password'})}
   <div class="lbl">Scan with your authenticator app</div><div class="qr" role="img" aria-label="Sample QR code"></div>
   ${field('Code from the app','i-code',{ph:'6 digits'})}
   <button class="btn lime block" data-a="acceptInvite">Finish setup</button>
   <button class="btn block" style="color:#A3ABA5;margin-top:6px" data-a="goStep" data-v="login">Back to sign in</button></div></div>`;
}

// ---------- Shell ----------
const NAV=[
 ['Operations',[['overview','Overview','overview',()=>true],['verification','Verification','verify',()=>canAny('VERIFICATION_VIEW','MODERATOR_APPLICATIONS_REVIEW','ALUMNI_REVIEW'),()=>SUBS.filter(s=>s.status==='PENDING').length],['moderation','Moderation','moderation',()=>canAny('REPORTS_VIEW','APPEALS_MANAGE'),()=>REPORTS.filter(r=>r.status==='OPEN').length],['listings','Listings','listings',()=>can('LISTINGS_VIEW'),()=>LISTINGS.filter(l=>l.hidden).length],['events','Events','events',()=>can('EVENTS_MODERATE')]]],
 ['People and spaces',[['members','Members','members',()=>can('MEMBERS_VIEW')],['communities','Communities','communities',()=>can('COMMUNITIES_VIEW')]]],
 ['Content',[['announcements','Announcements','announce',()=>canAny('ANNOUNCEMENTS_MANAGE','NOTIFICATIONS_SEND')],['camps','Camp schedules','camp',()=>can('CAMP_SCHEDULE_MANAGE')],['support','Support inbox','support',()=>can('SUPPORT_MANAGE'),()=>TICKETS.filter(t=>t.status==='OPEN').length]]],
 ['Platform',[['analytics','Analytics','analytics',()=>can('ANALYTICS_VIEW')],['config','Settings','config',()=>canAny('CONFIG_VIEW','RISK_RULES_MANAGE','PAGES_MANAGE','REFERENCE_DATA_MANAGE')],['audit','Audit log','audit',()=>can('AUDIT_VIEW')],['admins','Admins and roles','admins',()=>can('ADMIN_ACCOUNTS_MANAGE')]]]
];
const NEED={overview:null,verification:['VERIFICATION_VIEW','MODERATOR_APPLICATIONS_REVIEW','ALUMNI_REVIEW'],moderation:['REPORTS_VIEW','APPEALS_MANAGE'],listings:['LISTINGS_VIEW'],events:['EVENTS_MODERATE'],members:['MEMBERS_VIEW'],communities:['COMMUNITIES_VIEW'],announcements:['ANNOUNCEMENTS_MANAGE','NOTIFICATIONS_SEND'],camps:['CAMP_SCHEDULE_MANAGE'],support:['SUPPORT_MANAGE'],analytics:['ANALYTICS_VIEW'],config:['CONFIG_VIEW','RISK_RULES_MANAGE','PAGES_MANAGE','REFERENCE_DATA_MANAGE'],audit:['AUDIT_VIEW'],admins:['ADMIN_ACCOUNTS_MANAGE']};
function allowed(route){const n=NEED[route];return !n||canAny(...n);}

function shell(){
  const p=persona();
  const side=`<aside class="side ${S.sideOpen?'open':''}" aria-label="Main navigation"><div class="brand"><b>C</b><span>Corpers Connect<small>Admin</small></span></div>
  <nav>${NAV.map(([g,items])=>{const vis=items.filter(i=>i[3]());return vis.length?`<div class="grp">${g}</div>${vis.map(([id,label,ic,,cnt])=>{const c=cnt?cnt():0;return `<button class="nav-i ${S.route===id?'on':''}" data-a="go" data-v="${id}" ${S.route===id?'aria-current="page"':''}>${I(ic,18)}<span>${label}</span>${c?`<span class="cnt">${c}</span>`:''}</button>`;}).join('')}`:'';}).join('')}</nav>
  <div class="foot">Signed in as<br><b class="soft">${esc(p.name)}</b><br>${p.roles.map(r=>roleOf(r)?.name).join(', ')}</div></aside>`;
  const top=`<header class="top"><button class="menu-btn" data-a="toggleSide" aria-label="Menu">${I('menu',20)}</button>
  <div class="search"><span>${I('search',16)}</span><label class="sr" for="gs">Search members</label><input id="gs" data-live="global" value="${esc(S.q.global||'')}" placeholder="Search members, listings, reports…"></div>
  <div class="persona"><label for="pers">Demo: view as</label><select id="pers" data-change="persona">${ADMINS.filter(a=>a.status==='ACTIVE').map(a=>`<option value="${a.id}" ${a.id===S.persona?'selected':''}>${esc(a.name)} · ${a.roles.map(r=>roleOf(r)?.name).join(' + ')}</option>`).join('')}</select></div>
  <button class="avatar-btn" data-a="logout" aria-label="Sign out">${av(p.name,p.color,32)}<span class="soft" style="font-weight:600">Sign out</span></button></header>`;
  let page;
  if(!allowed(S.route)) page=`<div class="denied"><div class="big">${I('lock',30)}</div><h1 class="hd" style="font-size:26px;margin:0 0 6px">You don’t have access to this page</h1><p class="muted">The server answered <code>ADMIN_PERMISSION_DENIED</code>. This page needs one of: ${NEED[S.route].map(k=>`<code>${k}</code>`).join(' ')}.</p><button class="btn lime" data-a="go" data-v="overview">Back to overview</button></div>`;
  else page=(V[S.route]||V.overview)();
  return `<div class="shell">${side}<div class="main">${top}<main class="page" id="page">${page}</main></div></div>${S.sideOpen?'<div class="scrim" data-a="toggleSide" style="z-index:35"></div>':''}`;
}

function overlays(){
  let h='';
  if(S.drawer){const d=D[S.drawer.type]?D[S.drawer.type](S.drawer.id):null;if(d)h+=`<div class="scrim" data-a="closeDrawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="${esc(d.title)}"><div class="dh"><h2 class="hd">${esc(d.title)}</h2><button class="x" data-a="closeDrawer" aria-label="Close">${I('x',18)}</button></div><div class="db">${d.body}</div></aside>`;}
  if(S.modal){const m=S.modal;h+=`<div class="modal-wrap" data-a="closeModalBg"><div class="modal" role="dialog" aria-modal="true" aria-label="${esc(m.title)}" data-a="noop"><h2 class="hd">${esc(m.title)}</h2>${m.sub?`<p class="muted" style="margin:0 0 14px">${m.sub}</p>`:'<div style="height:12px"></div>'}${m.body}<div class="acts"><button class="btn dark" data-a="closeModal">Cancel</button>${m.ok?`<button class="btn ${m.cls||'lime'}" data-a="${m.ok}" ${m.data||''}>${m.okLabel||'Confirm'}</button>`:''}</div></div></div>`;}
  if(S.toast)h+=`<div class="toast ${S.toast.bad?'bad':''}" role="status">${esc(S.toast.m)}</div>`;
  return h;
}

function render(){
  const root=$('root');const act=document.activeElement;const keep=act&&act.id&&root.contains(act)&&(act.tagName==='INPUT'||act.tagName==='TEXTAREA')?{id:act.id,s:act.selectionStart}:null;
  const sc=document.querySelector('.drawer .db'),st=sc?sc.scrollTop:0,ps=window.scrollY;
  root.innerHTML=(S.authed?shell():authView())+(S.authed?overlays():'');
  const d2=document.querySelector('.drawer .db');if(d2)d2.scrollTop=st;
  window.scrollTo(0,ps);
  if(S.focus){const e=$(S.focus);if(e){e.focus();try{e.setSelectionRange(e.value.length,e.value.length);}catch(_){}}S.focus=null;}
  else if(keep){const e=$(keep.id);if(e){e.focus();try{e.setSelectionRange(keep.s,keep.s);}catch(_){}}}
}

// ---------- Router and events ----------
function route(){const h=location.hash.replace(/^#\/?/,'')||'overview';S.route=V[h]?h:'overview';S.sideOpen=false;render();window.scrollTo(0,0);}
window.addEventListener('hashchange',route);

const A={};
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');if(!el)return;
  const a=el.dataset.a;if(a==='noop')return;if(el.disabled)return;
  if(a==='closeModalBg'){if(e.target===el)closeModal();return;}
  const f=A[a];if(!f)return;e.preventDefault();f(el.dataset,el);
});
document.addEventListener('input',e=>{
  const t=e.target;
  if(t.dataset.live==='global'){S.q.members=t.value;S.q.global=t.value;S.focus=t.id;if(S.route!=='members'&&can('MEMBERS_VIEW'))location.hash='#/members';else render();}
  else if(t.dataset.live){S.q[t.dataset.live]=t.value;S.focus=t.id;render();}
  if(t.dataset.otp!==undefined){const i=+t.dataset.otp;t.value=t.value.replace(/\D/g,'').slice(0,1);if(t.value&&i<5)$('otp'+(i+1)).focus();}
});
document.addEventListener('change',e=>{const t=e.target;
  if(t.dataset.change==='persona'){S.persona=t.value;S.drawer=null;S.modal=null;toast('Now viewing as '+persona().name+'. Pages and buttons follow this role.');}
  if(t.dataset.cfg){A.cfgSet({k:t.dataset.cfg,v:t.value});}
  if(t.dataset.risk){A.riskAction({i:t.dataset.risk,v:t.value});}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(S.modal)closeModal();else if(S.drawer)closeDrawer();}});

// ---------- Auth actions ----------
A.goStep=d=>{S.step=d.v;S.auth.err='';render();};
A.login=()=>{const em=val('a-email');if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){S.auth.err='Enter a valid work email.';return render();}S.auth.email=em;S.auth.err='';S.step='mfa';render();setTimeout(()=>{const f=$('otp0');if(f)f.focus();},30);};
A.verifyMfa=()=>{const code=[0,1,2,3,4,5].map(i=>$('otp'+i).value).join('');if(!/^\d{6}$/.test(code)){S.auth.err='Enter all 6 digits.';return render();}S.authed=true;sessionStorage.setItem('ccadm','1');S.step='login';S.auth.err='';audit('LOGIN_SUCCESS','Admin session','MFA verified');route();};
A.acceptInvite=()=>{const p=val('i-pass'),p2=val('i-pass2'),c=val('i-code');let ok=true;ok=ferr('i-pass',p.length>=12?'':'Use at least 12 characters.')&&ok;ok=ferr('i-pass2',p===p2&&p2?'':'Passwords do not match.')&&ok;ok=ferr('i-code',/^\d{6}$/.test(c)?'':'Enter the 6-digit code.')&&ok;if(!ok)return;S.step='login';S.auth.err='';render();toast('Account ready. Sign in to continue.');};
A.logout=()=>{S.authed=false;sessionStorage.removeItem('ccadm');S.step='login';S.drawer=null;S.modal=null;render();};
A.go=d=>{location.hash='#/'+d.v;};
A.tab=d=>{S.tab[d.k]=d.v;render();};
A.toggleSide=()=>{S.sideOpen=!S.sideOpen;render();};
A.closeDrawer=closeDrawer;A.closeModal=closeModal;
