// Admin prototype views, drawers and actions.
const V={},D={};
const pageHd=(title,sub,right='')=>`<div class="page-hd"><div class="grow"><h1 class="hd">${title}</h1>${sub?`<p>${sub}</p>`:''}</div>${right}</div>`;
const gq=(k)=>(S.q[k]||'').toLowerCase();
const D7=n=>{const d=new Date('2026-11-21');d.setDate(d.getDate()+n);return d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});};

// ================= Overview =================
V.overview=()=>{
  const pend=SUBS.filter(s=>s.status==='PENDING'),oldest=Math.max(0,...pend.map(s=>s.wait));
  const openR=REPORTS.filter(r=>r.status==='OPEN'),high=openR.filter(r=>r.pri==='HIGH').length;
  const hidden=LISTINGS.filter(l=>l.hidden).length,tix=TICKETS.filter(t=>t.status==='OPEN').length;
  const cards=[];
  if(can('MEMBERS_VIEW'))cards.push(`<div class="card kpi"><div class="n">48,210</div><div class="l">Members</div><div class="d" style="color:var(--accent-text)">+1,620 this week</div></div>`);
  if(can('VERIFICATION_VIEW'))cards.push(`<button class="card kpi ${oldest>=40?'warn':''}" style="text-align:left" data-a="go" data-v="verification"><div class="n">${pend.length}</div><div class="l">Verifications waiting</div><div class="d">Oldest ${oldest}h of 48h target</div></button>`);
  if(can('REPORTS_VIEW'))cards.push(`<button class="card kpi ${high?'warn':''}" style="text-align:left" data-a="go" data-v="moderation"><div class="n">${openR.length}</div><div class="l">Open reports</div><div class="d">${high} high priority</div></button>`);
  if(can('LISTINGS_VIEW'))cards.push(`<button class="card kpi" style="text-align:left" data-a="go" data-v="listings"><div class="n">${hidden}</div><div class="l">Hidden listings to review</div><div class="d">Auto-hide or keyword flag</div></button>`);
  if(can('SUPPORT_MANAGE'))cards.push(`<button class="card kpi" style="text-align:left" data-a="go" data-v="support"><div class="n">${tix}</div><div class="l">Open support tickets</div></button>`);
  if(can('ANALYTICS_VIEW'))cards.push(`<div class="card kpi"><div class="n">14.1k</div><div class="l">Daily active members</div><div class="d" style="color:var(--accent-text)">+5% vs last week</div></div>`);
  const q=[];
  if(can('VERIFICATION_VIEW'))q.push(...pend.sort((a,b)=>b.wait-a.wait).slice(0,4).map(s=>{const m=member(s.mid);return `<button class="list-i" style="width:100%;text-align:left" data-a="openSub" data-id="${s.id}">${mav(m)}<span class="grow"><b>${esc(m.name)}</b><br><span class="muted">${KIND[s.kind]}</span></span><span>${sla(s.wait)}</span></button>`;}));
  if(can('REPORTS_VIEW'))q.push(...openR.filter(r=>r.pri==='HIGH').slice(0,3).map(r=>`<button class="list-i" style="width:100%;text-align:left" data-a="openReport" data-id="${r.id}"><span class="tag red">${r.reason.replace(/_/g,' ').toLowerCase()}</span><span class="grow">${esc(r.title.slice(0,60))}</span><span class="muted">${r.age}h</span></button>`));
  return pageHd('Overview',`Welcome back, ${esc(persona().name.split(' ')[0])}. Here is what needs attention.`)+
   `<div class="cards">${cards.join('')||'<div class="card">Nothing is assigned to your role on this page yet.</div>'}</div>
   <div class="three" style="margin-top:16px"><div class="card"><h3 class="hd">Needs attention</h3>${q.length?q.join(''):'<div class="empty">Queues for your role are clear.</div>'}</div>
   <div class="card"><h3 class="hd">Recent activity</h3>${can('AUDIT_VIEW')?AUDIT.slice(0,6).map(a=>`<div class="list-i"><span class="grow"><b>${esc(a.action.replace(/_/g,' ').toLowerCase())}</b><br><span class="muted">${esc(a.actor)} · ${esc(a.target)}</span></span><span class="muted">${esc(a.when)}</span></div>`).join(''):`<div class="empty">${I('lock',20)}<br>The audit log needs <code>AUDIT_VIEW</code>.</div>`}</div></div>
   ${can('ANALYTICS_VIEW')?`<div class="card" style="margin-top:16px"><h3 class="hd">Sign-ups, last 14 days</h3>${bars(SIGNUPS)}</div>`:''}`;
};
function bars(vals,labels){const mx=Math.max(...vals);return `<div class="bars" style="margin-top:12px">${vals.map((v,i)=>`<i class="${i===vals.length-1?'hi':''}" style="height:${Math.round(v/mx*100)}%" data-v="${v.toLocaleString()}"></i>`).join('')}</div><div class="axis">${vals.map((_,i)=>`<span>${labels?labels[i]:i+1}</span>`).join('')}</div>`;}

// ================= Verification =================
const reviewPerm=k=>({MEMBER_VERIFICATION:'VERIFICATION_REVIEW',REDEPLOYMENT:'VERIFICATION_REVIEW',MODERATOR_APPLICATION:'MODERATOR_APPLICATIONS_REVIEW',ALUMNI_REQUEST:'ALUMNI_REVIEW'}[k]);
const viewPerm=k=>({MEMBER_VERIFICATION:'VERIFICATION_VIEW',REDEPLOYMENT:'VERIFICATION_VIEW',MODERATOR_APPLICATION:'MODERATOR_APPLICATIONS_REVIEW',ALUMNI_REQUEST:'ALUMNI_REVIEW'}[k]);
const kindOk=k=>can(viewPerm(k))||can(reviewPerm(k));
V.verification=()=>{
  const subs=SUBS.filter(s=>kindOk(s.kind));
  const tab=cur('ver','PENDING'),kind=cur('verKind','ALL');
  const grp={PENDING:['PENDING'],ESCALATED:['ESCALATED'],RESUBMIT:['RESUBMIT_REQUESTED'],DECIDED:['APPROVED','REJECTED']};
  const list=subs.filter(s=>grp[tab].includes(s.status)&&(kind==='ALL'||s.kind===kind)).sort((a,b)=>b.wait-a.wait);
  const kinds=[['ALL','All kinds'],...Object.entries(KIND).filter(([k])=>kindOk(k))];
  return pageHd('Verification','Review ID photos by hand. Target: decide within 48 hours. Images are deleted 7 days after a decision.')+
   chipRow('ver',[['PENDING','Pending',subs.filter(s=>s.status==='PENDING').length],['ESCALATED','Escalated',subs.filter(s=>s.status==='ESCALATED').length],['RESUBMIT','Resubmit requested',subs.filter(s=>s.status==='RESUBMIT_REQUESTED').length],['DECIDED','Decided']],'PENDING')+
   `<div class="chips">${kinds.map(([k,l])=>`<button class="chip ${kind===k?'on':''}" data-a="tab" data-k="verKind" data-v="${k}">${l}</button>`).join('')}</div>`+
   table(['Member','Request','Waiting','Flags','Status'],list.map(s=>{const m=member(s.mid);return `<tr class="click" data-a="openSub" data-id="${s.id}"><td><div class="row">${mav(m)}<span><b>${esc(m.name)}</b><br><span class="muted">${m.state} · ${m.batch}</span></span></div></td><td>${KIND[s.kind]}${s.cid?`<br><span class="muted">${esc(community(s.cid).name)}</span>`:''}</td><td>${s.status==='APPROVED'||s.status==='REJECTED'?`<span class="muted">${s.decided}</span>`:sla(s.wait)}</td><td>${s.flags.map(f=>`<span class="tag red">${f.replace(/_/g,' ').toLowerCase()}</span>`).join(' ')||'<span class="muted">—</span>'}</td><td>${tag(s.status)}</td></tr>`;}),'No requests here. Nice work.');
};
A.openSub=d=>openDrawer('sub',d.id);
D.sub=id=>{
  const s=SUBS.find(x=>x.id===id),m=member(s.mid),rp=reviewPerm(s.kind),open=['PENDING','ESCALATED','RESUBMIT_REQUESTED'].includes(s.status);
  const callup=S.reveal['c'+m.id]?m.callup:m.callup.replace(/\d{3}$/,'•••');
  const imgBox=!s.img?`<div class="id-view"><div class="id-locked">Image deleted after the decision.<br><span class="hint">${esc(s.note)}</span></div></div>`
   :can(rp)?(S.img[s.id]?`<div class="id-view"><img src="${s.img}" alt="Submitted document for ${esc(m.name)}"><div class="hint" style="margin-top:8px">${I('eye',13)} This view was recorded in the audit log.</div></div>`:`<div class="id-view"><div class="id-locked">${I('lock',26)}<p>The image is private. Opening it is recorded in the audit log.</p><button class="btn lime" data-a="viewImg" data-id="${s.id}">Open image</button></div></div>`)
   :`<div class="id-view"><div class="id-locked">${I('lock',26)}<p>You can’t open this image.<br><span class="hint">Needs <code>${rp}</code></span></p></div></div>`;
  return {title:KIND[s.kind],body:`
   <div class="row" style="margin-bottom:14px">${mav(m,52)}<div class="grow"><b style="font-size:17px">${esc(m.name)}</b><br><span class="muted">@${m.username} · ${m.state} · ${m.batch} · ${m.service}</span></div>${tag(s.status)}</div>
   ${s.flags.length?`<div class="warn-box" style="margin-bottom:12px"><b>Flags:</b> ${s.flags.map(f=>f.replace(/_/g,' ').toLowerCase()).join(', ')}.${s.note?`<br>${esc(s.note)}`:''}</div>`:s.note?`<div class="ok-box" style="margin-bottom:12px">${esc(s.note)}</div>`:''}
   <div class="two" style="margin-bottom:12px"><div class="card"><div class="lbl">Call-up number</div><div class="mono" style="margin-top:4px">${callup}</div>${can('SENSITIVE_DATA_VIEW')?`<button class="btn sm dark" style="margin-top:8px" data-a="reveal" data-k="c${m.id}">${I('eye',13)}${S.reveal['c'+m.id]?'Hide':'Reveal'}</button>`:`<div class="hint" style="margin-top:6px">${I('lock',12)} Needs SENSITIVE_DATA_VIEW</div>`}</div>
   <div class="card"><div class="lbl">Waiting</div><div style="margin-top:4px">${open?sla(s.wait):'—'}</div><div class="hint" style="margin-top:6px">Account joined ${m.joined}</div></div></div>
   ${s.motivation?`<div class="card" style="margin-bottom:12px"><div class="lbl">Why they want to moderate ${esc(community(s.cid).name)}</div><p class="soft" style="margin:6px 0">${esc(s.motivation)}</p><div class="lbl">Experience</div><p class="soft" style="margin:6px 0 0">${esc(s.experience)}</p></div>`:''}
   <div class="lbl" style="margin-bottom:6px">${s.kind==='ALUMNI_REQUEST'?'Passing-out certificate':s.kind==='REDEPLOYMENT'?'Redeployment letter':'NYSC ID card'}</div>${imgBox}
   <div class="sec">Checklist</div><div class="soft" style="line-height:1.8">☐ Name matches the profile<br>☐ Photo is clear and readable<br>☐ Looks like a genuine camp-issued card<br>☐ Not edited, not a copy of someone else’s<br>☐ Call-up number is not on another account</div>
   ${open?`<div class="sec">Decision</div><div class="row wrap">${abtn(rp,'Approve','lime','decide',`data-id="${s.id}" data-v="APPROVED"`)}${abtn(rp,'Ask for a clearer photo','dark','decide',`data-id="${s.id}" data-v="RESUBMIT_REQUESTED"`)}${abtn(rp,'Reject','danger','decide',`data-id="${s.id}" data-v="REJECTED"`)}${s.status!=='ESCALATED'?abtn(rp,'Escalate','dark','decide',`data-id="${s.id}" data-v="ESCALATED"`):''}</div>`:`<div class="hint" style="margin-top:12px">Decided. ${s.img?'Image will be deleted on '+D7(7)+'.':''}</div>`}`};
};
A.viewImg=d=>{const s=SUBS.find(x=>x.id===d.id);if(!can(reviewPerm(s.kind)))return deny(reviewPerm(s.kind));S.img[d.id]=true;audit('ID_IMAGE_VIEWED','Submission '+d.id,'Review');render();};
A.reveal=d=>{if(!can('SENSITIVE_DATA_VIEW'))return deny('SENSITIVE_DATA_VIEW');S.reveal[d.k]=!S.reveal[d.k];if(S.reveal[d.k])audit('SENSITIVE_DATA_VIEWED','Member '+d.k.slice(1),'Reveal');render();};
const REASONS={APPROVED:['Card matches the profile','Documents verified'],REJECTED:['Card photo unreadable','Details do not match the profile','Looks edited or not a genuine card','Duplicate of another account'],RESUBMIT_REQUESTED:['Photo was cropped','Photo too dark or blurry','Name or number not readable'],ESCALATED:['Unsure if the card is genuine','Name differs from profile','Possible duplicate account']};
A.decide=d=>{const s=SUBS.find(x=>x.id===d.id),v=d.v;if(!can(reviewPerm(s.kind)))return deny(reviewPerm(s.kind));
  const label={APPROVED:'Approve',REJECTED:'Reject',RESUBMIT_REQUESTED:'Ask for a clearer photo',ESCALATED:'Escalate'}[v];
  openModal({title:`${label}: ${member(s.mid).name}`,sub:v==='APPROVED'?'The member gets verified access and is told by email and notification.':v==='REJECTED'?'The member is told why and can resubmit or appeal.':v==='ESCALATED'?'A senior reviewer will look at this.':'The member gets a notification and can upload a new photo.',
   body:field('Reason','m-reason',{opts:REASONS[v]})+field('Note for the record','m-note',{area:true,ph:'Optional. Visible to admins only.'}),ok:'confirmDecision',data:`data-id="${s.id}" data-v="${v}"`,okLabel:label,cls:v==='REJECTED'?'danger':'lime'});};
A.confirmDecision=d=>{const s=SUBS.find(x=>x.id===d.id),m=member(s.mid),v=d.v,reason=val('m-reason');
  s.status=v;s.decided='Just now';s.note=`${v[0]+v.slice(1).toLowerCase().replace(/_/g,' ')} by ${persona().name}. ${reason}.`;
  if(v==='APPROVED'||v==='REJECTED'){s.wait=0;
    if(s.kind==='MEMBER_VERIFICATION')m.ver=v==='APPROVED'?'VERIFIED':'REJECTED';
    if(s.kind==='MODERATOR_APPLICATION'&&v==='APPROVED'){const c=community(s.cid);if(!c.mods.includes(m.id))c.mods.push(m.id);audit('MODERATOR_APPOINTED',m.name+' → '+c.name,reason);}
    if(s.kind==='ALUMNI_REQUEST'&&v==='APPROVED'){m.service='Completed';}
    if(s.kind==='REDEPLOYMENT'&&v==='APPROVED'){m.state='Ogun';}
    audit('VERIFICATION_'+v,KIND[s.kind]+': '+m.name,reason);
  }else{audit('VERIFICATION_'+v,KIND[s.kind]+': '+m.name,reason);}
  closeModal();toast(v==='APPROVED'?m.name+' approved. Image deletes in 7 days.':'Saved: '+v.replace(/_/g,' ').toLowerCase());};

// ================= Members =================
V.members=()=>{
  const q=gq('members'),tab=cur('mem','ALL'),acct=cur('memAcct','ALL');
  const list=MEMBERS.filter(m=>(!q||m.name.toLowerCase().includes(q)||m.username.includes(q)||m.state.toLowerCase().includes(q))&&(tab==='ALL'||m.ver===tab)&&(acct==='ALL'||m.acct===acct));
  return pageHd('Members','Search accounts, review history and take account actions.')+searchBox('members','Search name, username or state')+
   chipRow('mem',[['ALL','All'],['VERIFIED','Verified'],['PENDING','Pending'],['UNVERIFIED','Unverified'],['REJECTED','Rejected']],'ALL')+
   chipRow('memAcct',[['ALL','Any status'],['ACTIVE','Active'],['SUSPENDED','Suspended'],['RESTRICTED','Restricted']],'ALL')+
   table(['Member','Location','Service','Verification','Account','Posts','Reports'],list.map(m=>`<tr class="click" data-a="openMember" data-id="${m.id}"><td><div class="row">${mav(m)}<span><b>${esc(m.name)}</b><br><span class="muted">@${m.username}</span></span></div></td><td>${m.state}<br><span class="muted">${m.batch}</span></td><td>${m.service}</td><td>${tag(m.ver)}</td><td>${tag(m.acct)}</td><td>${m.posts}</td><td>${m.reports?`<b style="color:var(--orange-text)">${m.reports}</b>`:'0'}</td></tr>`),'No members match.');
};
A.openMember=d=>openDrawer('member',d.id);
D.member=id=>{const m=member(id);const rev=S.reveal['c'+m.id];
  return {title:m.name,body:`<div class="row" style="margin-bottom:14px">${mav(m,56)}<div class="grow"><b style="font-size:17px">${esc(m.name)}</b><br><span class="muted">@${m.username}</span></div>${tag(m.ver)} ${tag(m.acct)}</div>
  <div class="two"><div class="card"><div class="lbl">Journey</div><div class="soft" style="margin-top:4px">${m.service}<br>${m.state} · ${m.batch}</div></div><div class="card"><div class="lbl">Activity</div><div class="soft" style="margin-top:4px">${m.posts} posts<br>${m.reports} reports against them</div></div></div>
  <div class="card" style="margin-top:14px"><div class="lbl">Contact and ID details (sensitive)</div>${can('SENSITIVE_DATA_VIEW')?`<div class="mono" style="margin-top:6px">${rev?m.email:m.email.replace(/^(.).+(@.+)$/,'$1•••$2')}<br>${rev?m.callup:m.callup.replace(/\d{3}$/,'•••')}</div><button class="btn sm dark" style="margin-top:8px" data-a="reveal" data-k="c${m.id}">${I('eye',13)}${rev?'Hide':'Reveal (audited)'}</button>`:`<div class="hint" style="margin-top:6px">${I('lock',12)} Needs SENSITIVE_DATA_VIEW</div>`}</div>
  <div class="sec">Sanctions</div>${m.sanctions.length?m.sanctions.map(s=>`<div class="list-i"><span class="tag red">${s.type.toLowerCase()}</span><span class="grow">${esc(s.reason)}<br><span class="muted">by ${esc(s.by)} · ${s.when}</span></span></div>`).join(''):'<div class="muted">None.</div>'}
  <div class="sec">Account actions</div><div class="row wrap">${m.acct==='ACTIVE'?`${abtn('MEMBERS_MANAGE','Restrict 3 days','dark','memAct',`data-id="${m.id}" data-v="RESTRICTED"`)}${abtn('MEMBERS_MANAGE','Suspend 14 days','warn','memAct',`data-id="${m.id}" data-v="SUSPENDED"`)}${abtn('MEMBERS_MANAGE','Ban','danger','memAct',`data-id="${m.id}" data-v="BANNED"`)}`:abtn('MEMBERS_MANAGE','Reinstate','lime','memAct',`data-id="${m.id}" data-v="ACTIVE"`)}</div>
  <div class="sec">Case notes</div>${m.notes.map(n=>`<div class="list-i"><span class="grow">${esc(n.t)}<br><span class="muted">${esc(n.by)} · ${n.when}</span></span></div>`).join('')||'<div class="muted">No notes.</div>'}
  <div style="margin-top:10px">${field('Add a note','n-note',{area:true,ph:'Internal only'})}${abtn('MEMBERS_MANAGE','Save note','dark','addNote',`data-id="${m.id}"`)}</div>`};};
A.memAct=d=>{if(!can('MEMBERS_MANAGE'))return deny('MEMBERS_MANAGE');const m=member(d.id),v=d.v;
  openModal({title:(v==='ACTIVE'?'Reinstate ':v==='BANNED'?'Ban ':v==='SUSPENDED'?'Suspend ':'Restrict ')+m.name,sub:v==='BANNED'?'Permanent. The member can appeal unless it is an impersonation or threat finding.':'The member is told what happened and how to appeal.',body:field('Reason','m-reason',{opts:v==='ACTIVE'?['Appeal upheld','Mistake','Sanction period complete']:['Harassment','Repeated spam','Confirmed scam','Impersonation','Threats']})+field('Note','m-note',{area:true,ph:'Optional'}),ok:'confirmMemAct',data:`data-id="${m.id}" data-v="${v}"`,okLabel:'Confirm',cls:v==='ACTIVE'?'lime':'danger'});};
A.confirmMemAct=d=>{const m=member(d.id),v=d.v,r=val('m-reason');m.acct=v;if(v!=='ACTIVE')m.sanctions.unshift({type:v,reason:r,by:persona().name,when:'Just now'});audit('ACCOUNT_'+v,m.name,r);closeModal();toast(m.name+': '+v.toLowerCase());};
A.addNote=d=>{const t=val('n-note');if(!t)return toast('Write a note first',true);member(d.id).notes.unshift({t,by:persona().name,when:'Just now'});audit('CASE_NOTE_ADDED',member(d.id).name,'');render();toast('Note saved');};

// ================= Communities =================
V.communities=()=>{
  const tab=cur('com','ALL'),q=gq('com');
  const list=COMMUNITIES.filter(c=>(!q||c.name.toLowerCase().includes(q))&&(tab==='ALL'||(tab==='OFFICIAL'&&c.type==='OFFICIAL')||(tab==='MEMBER'&&c.type==='MEMBER')||(tab==='FLAG'&&c.flag)));
  return pageHd('Communities','Official and member-run spaces. Appoint moderators, moderate content and resolve impersonation.',abtn('COMMUNITIES_MANAGE',I('plus',14)+'New official community','lime','newOfficial'))+searchBox('com','Search communities')+
   chipRow('com',[['ALL','All',COMMUNITIES.length],['OFFICIAL','Official'],['MEMBER','Member-run'],['FLAG','Needs attention',COMMUNITIES.filter(c=>c.flag).length]],'ALL')+
   table(['Community','Type','Category','Members','Moderators','Status'],list.map(c=>`<tr class="click" data-a="openCom" data-id="${c.id}"><td><b>${esc(c.name)}</b>${c.flag?`<br><span class="tag red">${c.flag.toLowerCase()}</span>`:''}</td><td>${tag(c.type==='OFFICIAL'?'OFFICIAL':'MEMBER',c.type==='OFFICIAL'?'official':'member-run')}</td><td>${c.cat}</td><td>${c.members.toLocaleString()}</td><td>${c.mods.length}</td><td>${tag(c.status)}</td></tr>`),'No communities match.');
};
A.openCom=d=>openDrawer('com',d.id);
D.com=id=>{const c=community(id);
  return {title:c.name,body:`<div class="row wrap" style="margin-bottom:12px">${tag(c.type==='OFFICIAL'?'OFFICIAL':'MEMBER',c.type==='OFFICIAL'?'official':'member-run')}<span class="tag line">${c.cat}</span>${tag(c.status)}<span class="muted">${c.members.toLocaleString()} members</span></div>
  ${c.flag?`<div class="warn-box" style="margin-bottom:12px"><b>${c.flag==='DUPLICATE'?'Possible duplicate of an official space':'Possible impersonation'}.</b> Official-sounding names are blocked for member communities.<div class="row wrap" style="margin-top:8px">${abtn('COMMUNITIES_MANAGE','Reject and archive','danger','comResolve',`data-id="${c.id}" data-v="archive"`)}${abtn('COMMUNITIES_MANAGE','Rename to a safe name','dark','comResolve',`data-id="${c.id}" data-v="rename"`)}${abtn('COMMUNITIES_MANAGE','Keep, not a problem','dark','comResolve',`data-id="${c.id}" data-v="keep"`)}</div></div>`:''}
  <div class="sec">Moderators</div>${c.mods.map(mid=>{const m=member(mid);return `<div class="list-i">${mav(m,36)}<span class="grow"><b>${esc(m.name)}</b><br><span class="muted">@${m.username}</span></span>${abtn('MODERATORS_MANAGE','Remove','danger','removeMod',`data-c="${c.id}" data-m="${mid}"`,'sm')}</div>`;}).join('')||'<div class="muted">No moderators yet.</div>'}
  <div class="row" style="margin-top:10px"><select class="inp" id="mod-pick" style="flex:1">${MEMBERS.filter(m=>m.ver==='VERIFIED'&&!c.mods.includes(m.id)).map(m=>`<option value="${m.id}">${esc(m.name)} (@${m.username})</option>`).join('')}</select>${abtn('MODERATORS_MANAGE','Appoint','lime','appointMod',`data-c="${c.id}"`)}</div>
  <div class="sec">Recent posts</div>${c.posts.map(p=>{const m=member(p.by);return `<div class="card" style="margin-bottom:8px;${p.removed?'opacity:.5':''}"><div class="row">${mav(m,28)}<b>${esc(m.name)}</b><span class="muted">${p.ago}</span>${p.pinned?'<span class="tag or">pinned</span>':''}${p.hidden?'<span class="tag">hidden</span>':''}${p.removed?'<span class="tag red">removed</span>':''}</div><p class="soft" style="margin:6px 0">${esc(p.text)}</p>${p.removed?'':`<div class="row wrap">${abtn('COMMUNITY_CONTENT_MODERATE','Remove','danger','postAct',`data-c="${c.id}" data-p="${p.id}" data-v="remove"`,'sm')}${abtn('COMMUNITY_CONTENT_MODERATE',p.hidden?'Unhide':'Hide','dark','postAct',`data-c="${c.id}" data-p="${p.id}" data-v="hide"`,'sm')}${abtn('COMMUNITY_CONTENT_MODERATE',p.pinned?'Unpin':'Pin','dark','postAct',`data-c="${c.id}" data-p="${p.id}" data-v="pin"`,'sm')}</div>`}</div>`;}).join('')}
  <div class="sec">Members</div><div class="row"><select class="inp" id="mem-pick" style="flex:1">${MEMBERS.slice(0,12).map(m=>`<option value="${m.id}">${esc(m.name)}</option>`).join('')}</select>${abtn('COMMUNITY_MEMBERS_MANAGE','Remove from community','danger','kickMember',`data-c="${c.id}"`)}</div>
  <div class="sec">Community admin</div><div class="row wrap">${abtn('COMMUNITIES_MANAGE','Edit info','dark','editCom',`data-id="${c.id}"`)}${abtn('COMMUNITIES_MANAGE',c.status==='ACTIVE'?'Archive':'Restore','dark','comStatus',`data-id="${c.id}"`)}${c.type==='MEMBER'?abtn('COMMUNITIES_MANAGE','Remove community','danger','comRemove',`data-id="${c.id}"`):''}</div>`};};
A.appointMod=d=>{if(!can('MODERATORS_MANAGE'))return deny('MODERATORS_MANAGE');const c=community(d.c),mid=val('mod-pick');if(!mid)return toast('No eligible members',true);if(c.mods.length>=5)return toast('COMMUNITY_MODERATOR_LIMIT · max 5 per community',true);c.mods.push(mid);audit('MODERATOR_APPOINTED',member(mid).name+' → '+c.name,'Direct appointment');render();toast(member(mid).name+' is now a moderator');};
A.removeMod=d=>{if(!can('MODERATORS_MANAGE'))return deny('MODERATORS_MANAGE');const c=community(d.c);c.mods=c.mods.filter(x=>x!==d.m);audit('MODERATOR_REMOVED',member(d.m).name+' ← '+c.name,'Admin decision');render();toast('Moderator removed. They lose their tools immediately.');};
A.postAct=d=>{if(!can('COMMUNITY_CONTENT_MODERATE'))return deny('COMMUNITY_CONTENT_MODERATE');const c=community(d.c),p=c.posts.find(x=>x.id===d.p);
  if(d.v==='remove'){p.removed=true;audit('POST_REMOVED','Post '+p.id+' in '+c.name,'Admin moderation');toast('Post removed. The author is told why and can appeal.');}
  if(d.v==='hide'){p.hidden=!p.hidden;audit(p.hidden?'POST_HIDDEN':'POST_RESTORED','Post '+p.id+' in '+c.name,'');toast(p.hidden?'Post hidden':'Post visible again');}
  if(d.v==='pin'){p.pinned=!p.pinned;audit(p.pinned?'POST_PINNED':'POST_UNPINNED','Post '+p.id+' in '+c.name,'');toast(p.pinned?'Pinned':'Unpinned');}render();};
A.kickMember=d=>{if(!can('COMMUNITY_MEMBERS_MANAGE'))return deny('COMMUNITY_MEMBERS_MANAGE');const m=member(val('mem-pick')),c=community(d.c);audit('MEMBER_REMOVED_FROM_COMMUNITY',m.name+' from '+c.name,'Admin decision');toast(m.name+' removed from '+c.name);};
A.comStatus=d=>{const c=community(d.id);c.status=c.status==='ACTIVE'?'ARCHIVED':'ACTIVE';audit('COMMUNITY_'+c.status,c.name,'');render();toast(c.name+': '+c.status.toLowerCase());};
A.comRemove=d=>openModal({title:'Remove this community?',sub:'Posts become unavailable. Members are notified. This cannot be undone.',body:field('Reason','m-reason',{opts:['Impersonation','Scam activity','Repeated rule breaking','Duplicate']}),ok:'comRemoveYes',data:`data-id="${d.id}"`,okLabel:'Remove',cls:'danger'});
A.comRemoveYes=d=>{const c=community(d.id);audit('COMMUNITY_REMOVED',c.name,val('m-reason'));COMMUNITIES.splice(COMMUNITIES.indexOf(c),1);S.drawer=null;closeModal();toast('Community removed');};
A.comResolve=d=>{const c=community(d.id);if(d.v==='archive'){c.status='ARCHIVED';c.flag=null;}if(d.v==='rename'){c.name='Batch B Banter';c.flag=null;}if(d.v==='keep')c.flag=null;audit('COMMUNITY_FLAG_RESOLVED',c.name,d.v);render();toast('Resolved');};
A.editCom=d=>{const c=community(d.id);openModal({title:'Edit '+c.name,body:field('Name','e-name',{v:c.name})+field('Category','e-cat',{v:c.cat,opts:['Batch & camp','Location','Tech','Business','Creative','Interest','Sports','Accommodation','Faith','CDS']}),ok:'saveCom',data:`data-id="${c.id}"`,okLabel:'Save'});};
A.saveCom=d=>{const c=community(d.id),n=val('e-name');if(n.length<3)return ferr('e-name','At least 3 characters.');c.name=n;c.cat=val('e-cat');audit('COMMUNITY_EDITED',c.name,'');closeModal();toast('Saved');};
A.newOfficial=()=>openModal({title:'New official community',sub:'Official communities are protected and cannot be imitated by members.',body:field('Name','e-name',{ph:'e.g. Kano Corps Members'})+field('Category','e-cat',{opts:['Batch & camp','Location']})+field('Description','e-desc',{area:true}),ok:'createOfficial',okLabel:'Create'});
A.createOfficial=()=>{const n=val('e-name');if(n.length<3)return ferr('e-name','At least 3 characters.');COMMUNITIES.unshift({id:'c'+(COMMUNITIES.length+20),name:n,type:'OFFICIAL',cat:val('e-cat'),members:0,mods:[],status:'ACTIVE',posts:[],flag:null});audit('OFFICIAL_COMMUNITY_CREATED',n,'');closeModal();toast('Created '+n);};

// ================= Moderation =================
V.moderation=()=>{
  const tab=cur('mod',can('REPORTS_VIEW')?'REPORTS':'APPEALS'),pr=cur('modPr','ALL');
  const open=REPORTS.filter(r=>r.status==='OPEN');
  const tabs=[...(can('REPORTS_VIEW')?[['REPORTS','Reports',open.length]]:[]),...(can('APPEALS_MANAGE')?[['APPEALS','Appeals',APPEALS.filter(a=>a.status==='OPEN').length]]:[]),['HISTORY','Action history']];
  let body='';
  if(tab==='REPORTS'){
    const list=REPORTS.filter(r=>r.status==='OPEN'&&(pr==='ALL'||r.pri===pr)).sort((a,b)=>(a.pri==='HIGH'?0:1)-(b.pri==='HIGH'?0:1)||b.count-a.count);
    body=`<div class="chips">${[['ALL','All priorities'],['HIGH','High priority first']].map(([k,l])=>`<button class="chip ${pr===k?'on':''}" data-a="tab" data-k="modPr" data-v="${k}">${l}</button>`).join('')}</div>`+
     table(['Priority','Target','Reason','Reporters','Age','Community'],list.map(r=>`<tr class="click" data-a="openReport" data-id="${r.id}"><td>${tag(r.pri)}</td><td><b>${r.tt.toLowerCase()}</b><br><span class="muted">${esc(r.title.slice(0,62))}${r.title.length>62?'…':''}</span></td><td>${r.reason.replace(/_/g,' ').toLowerCase()}</td><td>${r.count}</td><td>${sla(r.age,r.pri==='HIGH'?24:72).replace(/ of \d+h/,'')}</td><td>${r.cid?esc(community(r.cid)?.name||'—'):'—'}</td></tr>`),'No open reports. All caught up.');
  }else if(tab==='APPEALS'){
    body=table(['Member','Original decision','Decided by','Age','Status'],APPEALS.map(a=>`<tr class="click" data-a="openAppeal" data-id="${a.id}"><td><div class="row">${mav(member(a.mid),30)}<b>${esc(member(a.mid).name)}</b></div></td><td>${esc(a.action)}</td><td>${esc(a.by)}</td><td>${a.age}d of 5d</td><td>${tag(a.status)}</td></tr>`),'No appeals.');
  }else{
    body=table(['When','Who','Action','Target','Reason'],AUDIT.filter(a=>/REMOVED|HIDDEN|SUSPEND|RESTRICT|BANNED|WARN|SCAM|MODERATOR|APPEAL|DISMISS|ESCALAT/.test(a.action)).map(a=>`<tr><td class="muted">${esc(a.when)}</td><td>${esc(a.actor)} ${a.type==='MEMBER'?'<span class="tag">moderator</span>':''}</td><td>${esc(a.action.replace(/_/g,' ').toLowerCase())}</td><td>${esc(a.target)}</td><td>${esc(a.reason)}</td></tr>`),'Nothing yet.');
  }
  return pageHd('Moderation','Scam and threat reports come first. Targets: high priority within 24 hours, normal within 72 hours, appeals within 5 days.')+chipRow('mod',tabs,tabs[0][0])+body;
};
A.openReport=d=>openDrawer('report',d.id);
D.report=id=>{const r=REPORTS.find(x=>x.id===id),o=member(r.owner);
  const scam=['SCAM','PAY_TO_APPLY'].includes(r.reason);
  return {title:'Report '+r.id.toUpperCase(),body:`<div class="row wrap" style="margin-bottom:12px">${tag(r.pri)}<span class="tag line">${r.tt.toLowerCase()}</span><span class="tag or">${r.reason.replace(/_/g,' ').toLowerCase()}</span><span class="muted">${r.count} reporters · ${hrs(r.age)}</span></div>
  <div class="card"><div class="lbl">Reported content</div><p class="soft" style="margin:6px 0 10px">${esc(r.title)}</p><div class="row">${mav(o,34)}<span class="grow"><b>${esc(o.name)}</b><br><span class="muted">${o.reports} reports against them · ${o.acct.toLowerCase()}</span></span>${can('MEMBERS_VIEW')?`<button class="btn sm dark" data-a="openMember" data-id="${o.id}">View member</button>`:''}</div>${r.cid?`<div class="hint" style="margin-top:8px">Community: ${esc(community(r.cid)?.name||'—')}</div>`:''}</div>
  ${r.status!=='OPEN'?`<div class="ok-box" style="margin-top:12px">Closed: ${r.status.toLowerCase()}.</div>`:`
  <div class="sec">Actions</div><div class="row wrap">${abtn('REPORTS_MANAGE','Remove content','danger','repAct',`data-id="${r.id}" data-v="REMOVE"`)}${abtn('REPORTS_MANAGE','Warn the author','dark','repAct',`data-id="${r.id}" data-v="WARN"`)}${scam?abtn('LISTINGS_MODERATE','Confirm scam and suspend owner','warn','repAct',`data-id="${r.id}" data-v="SCAM"`):''}${abtn('REPORTS_MANAGE','Dismiss','dark','repAct',`data-id="${r.id}" data-v="DISMISS"`)}${abtn('REPORTS_MANAGE','Escalate','dark','repAct',`data-id="${r.id}" data-v="ESCALATE"`)}</div>
  <p class="hint" style="margin-top:10px">Every action is recorded. The author is told which rule applied and can appeal. Reporters are thanked and never see details.</p>`}`};};
A.repAct=d=>{const r=REPORTS.find(x=>x.id===d.id),v=d.v,need=v==='SCAM'?'LISTINGS_MODERATE':'REPORTS_MANAGE';if(!can(need))return deny(need);
  if(v==='SCAM'){const o=member(r.owner);o.acct='SUSPENDED';o.sanctions.unshift({type:'SUSPEND',reason:'Confirmed scam',by:persona().name,when:'Just now'});LISTINGS.filter(l=>l.owner===r.owner).forEach(l=>{l.status='CLOSED';l.hidden='ADMIN';});REPORTS.filter(x=>x.owner===r.owner).forEach(x=>x.status='ACTIONED');audit('SCAM_CONFIRMED',o.name,'Listing removed, account suspended, other listings reviewed');toast('Scam confirmed. Listing removed, owner suspended, their other listings hidden.');}
  else{r.status=v==='DISMISS'?'DISMISSED':v==='ESCALATE'?'ESCALATED':'ACTIONED';audit('REPORT_'+(v==='REMOVE'?'CONTENT_REMOVED':v),r.tt+': '+r.title.slice(0,40),r.reason);toast(v==='DISMISS'?'Report dismissed':v==='ESCALATE'?'Escalated':'Done. The author is notified.');}
  S.drawer=null;render();};
A.openAppeal=d=>openDrawer('appeal',d.id);
D.appeal=id=>{const a=APPEALS.find(x=>x.id===id),m=member(a.mid),mine=a.by===persona().name;
  return {title:'Appeal '+a.id.toUpperCase(),body:`<div class="row" style="margin-bottom:12px">${mav(m,44)}<div class="grow"><b>${esc(m.name)}</b><br><span class="muted">@${m.username}</span></div>${tag(a.status)}</div>
  <div class="card"><div class="lbl">Original decision</div><p class="soft" style="margin:6px 0">${esc(a.action)}</p><div class="hint">Decided by ${esc(a.by)}</div></div>
  <div class="card" style="margin-top:10px"><div class="lbl">Their appeal</div><p class="soft" style="margin:6px 0 0">${esc(a.text)}</p></div>
  ${mine?`<div class="warn-box" style="margin-top:12px">You made the original decision. Another admin must review this appeal (<code>ADMIN_SELF_ACTION_FORBIDDEN</code>).</div>`:''}
  ${a.status==='OPEN'?`<div class="sec">Decide</div><div class="row wrap">${abtn('APPEALS_MANAGE','Overturn: restore','lime','decideAppeal',`data-id="${a.id}" data-v="OVERTURNED"`)}${abtn('APPEALS_MANAGE','Uphold: decision stands','dark','decideAppeal',`data-id="${a.id}" data-v="UPHELD"`)}</div>`:`<div class="ok-box" style="margin-top:12px">Decided: ${a.status.toLowerCase()}.</div>`}`};};
A.decideAppeal=d=>{if(!can('APPEALS_MANAGE'))return deny('APPEALS_MANAGE');const a=APPEALS.find(x=>x.id===d.id);if(a.by===persona().name)return toast('ADMIN_SELF_ACTION_FORBIDDEN · another admin must decide',true);a.status=d.v;if(d.v==='OVERTURNED'){const m=member(a.mid);m.acct='ACTIVE';}audit('APPEAL_'+d.v,member(a.mid).name,a.action);render();toast(d.v==='OVERTURNED'?'Overturned. Content and account restored, member notified.':'Upheld. Member notified with a short reason.');};

// ================= Listings =================
V.listings=()=>{
  const tab=cur('lst','ALL'),kind=cur('lstKind','ALL'),q=gq('lst');
  const f=l=>(kind==='ALL'||l.kind===kind)&&(!q||l.title.toLowerCase().includes(q))&&(tab==='ALL'||(tab==='HIDDEN'&&l.hidden==='REPORTS')||(tab==='KEYWORD'&&(l.hidden==='KEYWORD'||l.flags.some(x=>x.startsWith('KEYWORD'))))||(tab==='REPORTED'&&l.reports>0));
  const list=LISTINGS.filter(f);
  return pageHd('Listings','Jobs, items and accommodation. Auto-hidden and keyword-flagged listings wait for a person.')+searchBox('lst','Search listings')+
   chipRow('lst',[['ALL','All'],['HIDDEN','Auto-hidden',LISTINGS.filter(l=>l.hidden==='REPORTS').length],['KEYWORD','Keyword flagged',LISTINGS.filter(l=>l.hidden==='KEYWORD'||l.flags.some(x=>x.startsWith('KEYWORD'))).length],['REPORTED','Reported',LISTINGS.filter(l=>l.reports>0).length]],'ALL')+
   `<div class="chips">${[['ALL','All kinds'],['JOB','Jobs'],['ITEM','Items'],['ACCOMMODATION','Accommodation']].map(([k,l])=>`<button class="chip ${kind===k?'on':''}" data-a="tab" data-k="lstKind" data-v="${k}">${l}</button>`).join('')}</div>`+
   table(['Listing','Kind','Owner','Price','Reports','State','Flags'],list.map(l=>{const o=member(l.owner);return `<tr class="click" data-a="openListing" data-id="${l.id}"><td><b>${esc(l.title)}</b><br><span class="muted">${l.state} · ${l.ago} ago</span></td><td>${l.kind.toLowerCase()}</td><td>${esc(o.name)}</td><td>${l.price}</td><td>${l.reports?`<b style="color:var(--orange-text)">${l.reports}</b>`:'0'}</td><td>${l.hidden?tag('REJECTED','hidden: '+l.hidden.toLowerCase()):tag(l.status)}</td><td>${l.flags.map(x=>`<span class="tag or">${esc(x.toLowerCase())}</span>`).join(' ')||'—'}</td></tr>`;}),'No listings match.');
};
A.openListing=d=>openDrawer('listing',d.id);
D.listing=id=>{const l=listing(id),o=member(l.owner);
  return {title:l.kind[0]+l.kind.slice(1).toLowerCase()+' listing',body:`<div class="card"><b style="font-size:17px">${esc(l.title)}</b><div class="row wrap" style="margin-top:8px"><span class="tag line">${l.kind.toLowerCase()}</span>${l.hidden?tag('REJECTED','hidden: '+l.hidden.toLowerCase()):tag(l.status)}<span class="muted">${l.price} · ${l.state} · listed ${l.ago} ago</span></div></div>
  ${l.flags.length?`<div class="warn-box" style="margin-top:12px"><b>Risk flags:</b> ${l.flags.map(esc).join(', ')}</div>`:''}
  <div class="two" style="margin-top:12px"><div class="card"><div class="lbl">Owner</div><div class="row" style="margin-top:6px">${mav(o,34)}<span><b>${esc(o.name)}</b><br><span class="muted">${o.ver.toLowerCase()} · ${o.acct.toLowerCase()}</span></span></div></div><div class="card"><div class="lbl">Reports</div><div style="font-size:26px;font-weight:700;margin-top:4px" class="hd">${l.reports}</div><div class="hint">Auto-hide at 3 distinct reports</div></div></div>
  <div class="sec">Actions</div><div class="row wrap">${l.hidden?abtn('LISTINGS_MODERATE','Restore','lime','lstAct',`data-id="${l.id}" data-v="RESTORE"`):abtn('LISTINGS_MODERATE','Hide','dark','lstAct',`data-id="${l.id}" data-v="HIDE"`)}${abtn('LISTINGS_MODERATE','Remove','danger','lstAct',`data-id="${l.id}" data-v="REMOVE"`)}${abtn('LISTINGS_MODERATE','Confirm scam and suspend owner','warn','lstAct',`data-id="${l.id}" data-v="SCAM"`)}</div>
  <p class="hint" style="margin-top:10px">Confirming a scam removes this listing, suspends the owner and hides their other listings. One strike.</p>`};};
A.lstAct=d=>{if(!can('LISTINGS_MODERATE'))return deny('LISTINGS_MODERATE');const l=listing(d.id),v=d.v,o=member(l.owner);
  if(v==='HIDE'){l.hidden='ADMIN';audit('LISTING_HIDDEN',l.title,'Admin');toast('Hidden');}
  if(v==='RESTORE'){l.hidden=null;l.flags=[];audit('LISTING_RESTORED',l.title,'Reviewed, not a scam');toast('Restored');}
  if(v==='REMOVE'){l.status='CLOSED';l.hidden='ADMIN';audit('LISTING_REMOVED',l.title,'Admin');toast('Removed. Owner notified.');}
  if(v==='SCAM'){o.acct='SUSPENDED';o.sanctions.unshift({type:'SUSPEND',reason:'Confirmed scam listing',by:persona().name,when:'Just now'});LISTINGS.filter(x=>x.owner===l.owner).forEach(x=>{x.hidden='ADMIN';});audit('SCAM_CONFIRMED',o.name,l.title);toast('Scam confirmed. '+o.name+' suspended.');}
  render();};

// ================= Events =================
V.events=()=>pageHd('Events','Cancel or remove events that break the rules.')+table(['Event','Organiser','Where and when','Going','Reports','Status',''],EVENTS.map(e=>{const o=member(e.org);return `<tr><td><b>${esc(e.title)}</b></td><td>${esc(o.name)}</td><td>${e.state}<br><span class="muted">${e.date}</span></td><td>${e.going}<br><span class="muted">${e.interested} interested</span></td><td>${e.reports?`<b style="color:var(--orange-text)">${e.reports}</b>`:'0'}</td><td>${tag(e.status)}</td><td>${e.status==='UPCOMING'?abtn('EVENTS_MODERATE','Cancel','danger','evCancel',`data-id="${e.id}"`,'sm'):''}</td></tr>`;}));
A.evCancel=d=>openModal({title:'Cancel this event?',sub:'Interested and going members are notified.',body:field('Reason','m-reason',{opts:['Scam or fraud','Misleading event','Breaks community guidelines','Organiser request']}),ok:'evCancelYes',data:`data-id="${d.id}"`,okLabel:'Cancel event',cls:'danger'});
A.evCancelYes=d=>{if(!can('EVENTS_MODERATE'))return deny('EVENTS_MODERATE');const e=EVENTS.find(x=>x.id===d.id);e.status='CANCELLED';audit('EVENT_CANCELLED',e.title,val('m-reason'));closeModal();toast('Event cancelled. Attendees notified.');};

// ================= Announcements =================
V.announcements=()=>{
  const tab=cur('ann',can('ANNOUNCEMENTS_MANAGE')?'LIST':'SEND');
  const tabs=[...(can('ANNOUNCEMENTS_MANAGE')?[['LIST','Announcements']]:[]),...(can('NOTIFICATIONS_SEND')?[['SEND','Send a notification']]:[])];
  let body='';
  if(tab==='LIST')body=table(['Label','Audience','Message','By','When'],ANNOUNCEMENTS.map(a=>`<tr><td>${tag(a.label,a.label.toLowerCase())}</td><td>${esc(a.scope)}</td><td style="max-width:420px">${esc(a.body)}</td><td>${esc(a.by)}</td><td class="muted">${a.ago}</td></tr>`));
  else body=`<div class="card" style="max-width:640px"><h3 class="hd">Platform notification</h3><p class="muted" style="margin:0 0 12px">Sent to the notification centre and as push where members allow it.</p>${field('Audience','b-aud',{opts:['All members','Verified members','Batch B 2026','Kano camp','Lagos state']})}${field('Title','b-title',{ph:'Short headline'})}${field('Message','b-msg',{area:true})}${abtn('NOTIFICATIONS_SEND','Send','lime','sendBroadcast')}</div>`;
  return pageHd('Announcements','Platform notices, official announcements and notifications.',tab==='LIST'?abtn('ANNOUNCEMENTS_MANAGE',I('plus',14)+'New announcement','lime','newAnn'):'')+chipRow('ann',tabs,tabs[0][0])+body;
};
A.newAnn=()=>openModal({title:'New announcement',sub:'The “official” label is for authorised announcements only.',body:field('Label','a-label',{opts:[['PLATFORM','Platform notice'],['OFFICIAL','Official (authorised accounts only)']]})+field('Audience','a-scope',{opts:['Platform','State: Lagos','State: Kano','Camp: Kano','Batch: B 2026']})+field('Message','a-body',{area:true,ph:'What do members need to know?'}),ok:'postAnn',okLabel:'Publish'});
A.postAnn=()=>{const label=val('a-label'),b=val('a-body');if(label==='OFFICIAL'&&!can('ANNOUNCEMENTS_OFFICIAL'))return deny('ANNOUNCEMENTS_OFFICIAL');if(b.length<10)return ferr('a-body','Add a bit more detail.');ANNOUNCEMENTS.unshift({id:'n'+Date.now(),label,scope:val('a-scope'),body:b,by:persona().name,ago:'now'});audit('ANNOUNCEMENT_PUBLISHED',label+': '+b.slice(0,40),'');closeModal();toast('Published');};
A.sendBroadcast=()=>{const t=val('b-title'),m=val('b-msg');if(!t||m.length<10)return toast('Add a title and a message',true);const n={'All members':48210,'Verified members':31044,'Batch B 2026':12500,'Kano camp':2140,'Lagos state':11800}[val('b-aud')];audit('NOTIFICATION_BROADCAST',t+' → '+val('b-aud'),'');toast(`Queued for ${n.toLocaleString()} members`);};

// ================= Camp schedules =================
V.camps=()=>{
  const camp=cur('camp',CAMPS[0]),items=SCHEDULE[camp];
  return pageHd('Camp schedules','Daily schedule items shown on members’ Home in camp. Camp moderators can submit items. Staff publish.',abtn('CAMP_SCHEDULE_MANAGE',I('plus',14)+'Add item','lime','addSched'))+
   `<div class="chips">${CAMPS.map(c=>`<button class="chip ${camp===c?'on':''}" data-a="tab" data-k="camp" data-v="${c}">${c.replace(' Orientation Camp','')}</button>`).join('')}</div>`+
   table(['Time','Item','Where','Published',''],items.map((it,i)=>`<tr><td class="mono">${it[0]}</td><td><b>${esc(it[1])}</b></td><td>${esc(it[2])}</td><td>${sw(it[3],'schedPub',`data-c="${camp}" data-i="${i}"`,!can('CAMP_SCHEDULE_MANAGE'))}</td><td>${abtn('CAMP_SCHEDULE_MANAGE','Delete','danger','schedDel',`data-c="${camp}" data-i="${i}"`,'sm')}</td></tr>`),'No items for today. Add the first one.');
};
A.schedPub=d=>{if(!can('CAMP_SCHEDULE_MANAGE'))return deny('CAMP_SCHEDULE_MANAGE');const it=SCHEDULE[d.c][d.i];it[3]=!it[3];audit(it[3]?'SCHEDULE_PUBLISHED':'SCHEDULE_UNPUBLISHED',d.c+': '+it[1],'');render();};
A.schedDel=d=>{SCHEDULE[d.c].splice(d.i,1);audit('SCHEDULE_ITEM_DELETED',d.c,'');render();toast('Deleted');};
A.addSched=()=>openModal({title:'Add schedule item',body:field('Time','s-time',{type:'time',v:'10:00'})+field('Title','s-title',{ph:'e.g. Parade rehearsal'})+field('Where','s-where',{ph:'e.g. Parade ground'}),ok:'saveSched',okLabel:'Add and publish'});
A.saveSched=()=>{const t=val('s-title');if(t.length<3)return ferr('s-title','Add a title.');const c=cur('camp',CAMPS[0]);SCHEDULE[c].push([val('s-time'),t,val('s-where')||'Camp',true]);SCHEDULE[c].sort((a,b)=>a[0].localeCompare(b[0]));audit('SCHEDULE_ITEM_ADDED',c+': '+t,'');closeModal();toast('Added. Members in camp see it now.');};

// ================= Support =================
V.support=()=>{
  const tab=cur('sup','OPEN');const list=TICKETS.filter(t=>t.status===tab).sort((a,b)=>b.age-a.age);
  return pageHd('Support inbox','Replies go out by email. Target: acknowledge within 1 working day.')+chipRow('sup',[['OPEN','Open',TICKETS.filter(t=>t.status==='OPEN').length],['IN_PROGRESS','In progress'],['RESOLVED','Resolved']],'OPEN')+
   table(['From','Topic','Message','Waiting'],list.map(t=>`<tr class="click" data-a="openTicket" data-id="${t.id}"><td><b>${esc(t.who)}</b><br><span class="muted">${esc(t.email)}</span></td><td>${tag(t.topic==='SCAM_REPORT'?'HIGH':'NORMAL',t.topic.replace(/_/g,' ').toLowerCase())}</td><td style="max-width:420px">${esc(t.msg.slice(0,90))}${t.msg.length>90?'…':''}</td><td>${sla(t.age,24).replace(/ of \d+h/,'')}</td></tr>`),'Inbox zero.');
};
A.openTicket=d=>openDrawer('ticket',d.id);
D.ticket=id=>{const t=TICKETS.find(x=>x.id===id);
  return {title:'Ticket '+t.id.toUpperCase(),body:`<div class="row wrap" style="margin-bottom:10px">${tag(t.status)}<span class="tag line">${t.topic.replace(/_/g,' ').toLowerCase()}</span><span class="muted">${esc(t.who)} · ${esc(t.email)}</span></div>
  <div class="card"><p class="soft" style="margin:0">${esc(t.msg)}</p></div>${t.topic==='SCAM_REPORT'?`<div class="warn-box" style="margin-top:10px">Scam reports are high priority. Also file it in Moderation so the listing is reviewed.</div>`:''}
  ${t.replies.map(r=>`<div class="card" style="margin-top:10px;border-left:3px solid var(--accent-border)"><div class="lbl">Our reply</div><p class="soft" style="margin:4px 0 0">${esc(r)}</p></div>`).join('')}
  ${t.status!=='RESOLVED'?`<div class="sec">Reply</div>${field('Quick reply','r-macro',{opts:[['','Write my own'],['Thanks for getting in touch. We have found the issue and will update you within 24 hours.','Acknowledge'],['Please upload a clear photo of your NYSC ID card in good light with all four corners visible, then resubmit.','Clearer ID photo'],['Never pay a fee to get a job. We have removed the listing and suspended the account. Please report any payment to your bank.','Scam victim']]})}${field('Message','r-body',{area:true})}<div class="row wrap">${abtn('SUPPORT_MANAGE','Send reply','lime','reply',`data-id="${t.id}"`)}${abtn('SUPPORT_MANAGE','Mark resolved','dark','resolveTicket',`data-id="${t.id}"`)}</div>`:''}`};};
document.addEventListener('change',e=>{if(e.target.id==='r-macro'&&$('r-body'))$('r-body').value=e.target.value;});
A.reply=d=>{if(!can('SUPPORT_MANAGE'))return deny('SUPPORT_MANAGE');const b=val('r-body');if(b.length<5)return ferr('r-body','Write a reply.');const t=TICKETS.find(x=>x.id===d.id);t.replies.push(b);if(t.status==='OPEN')t.status='IN_PROGRESS';audit('SUPPORT_REPLY','Ticket '+t.id,'');render();toast('Reply sent by email');};
A.resolveTicket=d=>{const t=TICKETS.find(x=>x.id===d.id);t.status='RESOLVED';audit('SUPPORT_RESOLVED','Ticket '+t.id,'');S.drawer=null;render();toast('Resolved');};

// ================= Analytics =================
function previewSeq(c){const base='SSLJSLLSJESLSJLSSELJSLSSLJSESLS'.split('');if(!c.cap_enabled)return base.slice(0,20);const out=[],held=[];const share=(arr,ts)=>arr.filter(t=>ts.includes(t)).length/Math.max(arr.length,1)*100;
  const ok=t=>{if(t==='S')return true;if(c.no_back_to_back&&out.length&&out[out.length-1]!=='S')return false;const test=[...out,t];if(out.length>=5&&share(test,['L','E','J'])>c.max_listings_events)return false;if(t==='J'&&out.length>=5&&share(test,['J'])>c.max_jobs)return false;return true;};
  for(const t of base){if(out.length>=20)break;if(ok(t))out.push(t);else held.push(t);for(let i=0;i<held.length;i++){if(out.length<20&&ok(held[i])){out.push(held.splice(i,1)[0]);i--;}}}return out.slice(0,20);}
const SEQC={S:'#C8F169',L:'#FFD66B',J:'#8FB3FF',E:'#F7B2D9'};
V.analytics=()=>{
  const tab=cur('ana','ENG');
  let body='';
  if(tab==='ENG')body=`<div class="two"><div class="card"><h3 class="hd">Daily active members</h3>${bars(DAU)}</div><div class="card"><h3 class="hd">Sign-ups</h3>${bars(SIGNUPS)}</div></div>`;
  if(tab==='RET')body=table(['Cohort','Day 1','Day 7','Day 30'],RETENTION.map(r=>`<tr><td><b>${r[0]}</b></td>${[1,2,3].map(i=>`<td><div class="row"><div class="meter grow"><i style="width:${r[i]}%"></i></div><b>${r[i]}%</b></div></td>`).join('')}</tr>`));
  if(tab==='LST')body=`<div class="cards">${LIST_BY_KIND.map(([k,n])=>`<div class="card kpi"><div class="n">${n}</div><div class="l">${k} created, last 30 days</div></div>`).join('')}</div>`;
  if(tab==='MOD')body=`<div class="cards">${MOD_STATS.map(([k,n])=>`<div class="card kpi"><div class="n">${n}</div><div class="l">${k}</div></div>`).join('')}</div>`;
  if(tab==='MIX'){
    const F=FEEDMIX,dis=!can('CONFIG_MANAGE');
    const le=MIX.filter(m=>['Items','Accommodation','Events'].includes(m[0])).reduce((a,m)=>a+m[1],0)+MIX[3][1],jobs=MIX[3][1];
    const grad=(()=>{let a=0;return MIX.map(m=>{const s=a;a+=m[1];return `${m[2]} ${s}% ${a}%`;}).join(',');})();
    const seq=previewSeq(F),base=previewSeq({...F,cap_enabled:false});
    const cnt=s=>({L:s.filter(x=>x==='L').length,J:s.filter(x=>x==='J').length,E:s.filter(x=>x==='E').length});
    body=`<div class="two"><div class="card"><h3 class="hd">What members see in Home (last 24 hours)</h3><div class="row" style="gap:22px;margin-top:10px"><div class="donut" style="background:conic-gradient(${grad})"></div><div class="grow">${MIX.map(m=>`<div class="row" style="margin:4px 0"><span class="dot" style="background:${m[2]}"></span><span class="grow">${m[0]}</span><b>${m[1]}%</b></div>`).join('')}</div></div>
     <div class="sec">Alerts</div><div class="${le>F.alert_listings?'warn-box':'ok-box'}">Listings and events: <b>${le}%</b> (alert at ${F.alert_listings}%)</div><div class="${jobs>F.alert_jobs?'warn-box':'ok-box'}" style="margin-top:8px">Jobs: <b>${jobs}%</b> (alert at ${F.alert_jobs}%)</div>
     <div class="sec">Member reaction</div><div class="soft">Listings hidden by members: <b>2.4%</b> · reported: <b>0.8%</b></div><div class="sec">Last 7 days</div>${MIX7.map(m=>`<div class="row" style="margin:5px 0"><span style="width:120px">${m[0]}</span><div class="meter grow"><i style="width:${m[1]}%"></i></div><b>${m[1]}%</b></div>`).join('')}</div>
     <div class="card"><h3 class="hd">Feed mix cap</h3><p class="muted" style="margin:0 0 12px">Off at launch. Switch it on or tune it at any time. Applies to Home “For You” only. Changes take effect on the next feed request.</p>${dis?`<div class="warn-box" style="margin-bottom:12px">${I('lock',13)} Viewing only. Changing settings needs <code>CONFIG_MANAGE</code>.</div>`:''}
     <div class="list-i"><span class="grow"><b>Cap enabled</b><br><span class="hint">Listings and jobs are held back when over the limits</span></span>${sw(F.cap_enabled,'mixToggle','data-k="cap_enabled"',dis)}</div>
     <div class="field" style="margin-top:12px"><label>Max listings and events: <b>${F.max_listings_events}%</b> of Home items</label><input type="range" min="10" max="70" step="5" value="${F.max_listings_events}" data-a-range="max_listings_events" ${dis?'disabled':''}></div>
     <div class="field"><label>Max jobs: <b>${F.max_jobs}%</b> of Home items</label><input type="range" min="0" max="30" step="1" value="${F.max_jobs}" data-a-range="max_jobs" ${dis?'disabled':''}></div>
     <div class="list-i"><span class="grow"><b>No two listings back to back</b></span>${sw(F.no_back_to_back,'mixToggle','data-k="no_back_to_back"',dis)}</div>
     <div class="sec">Preview: one page of 20 items</div><div class="lbl">Without the cap</div><div class="seq" style="margin:6px 0">${base.map(x=>`<i style="background:${SEQC[x]}">${x}</i>`).join('')}</div><div class="lbl">With these settings</div><div class="seq" style="margin:6px 0">${seq.map(x=>`<i style="background:${SEQC[x]}">${x}</i>`).join('')}</div>
     <div class="hint">S social · L listing · J job · E event. Now: ${cnt(seq).L} listings, ${cnt(seq).J} jobs, ${cnt(seq).E} events (was ${cnt(base).L}, ${cnt(base).J}, ${cnt(base).E}).</div>
     <div style="margin-top:12px">${abtn('CONFIG_MANAGE','Save feed mix settings','lime','saveMix')}</div></div></div>`;
  }
  return pageHd('Analytics','Engagement, retention, listings, moderation and the Home feed mix.',abtn('ANALYTICS_EXPORT','Export CSV','dark','exportCsv'))+chipRow('ana',[['ENG','Engagement'],['RET','Retention'],['LST','Listings'],['MOD','Moderation'],['MIX','Feed mix']],'ENG')+body;
};
A.exportCsv=()=>{audit('ANALYTICS_EXPORTED','Dashboard data','');toast('Export started. Download link will be emailed.');};
A.mixToggle=d=>{if(!can('CONFIG_MANAGE'))return deny('CONFIG_MANAGE');FEEDMIX[d.k]=!FEEDMIX[d.k];render();};
document.addEventListener('change',e=>{const k=e.target.dataset.aRange;if(k){FEEDMIX[k]=+e.target.value;render();}});
A.saveMix=()=>{if(!can('CONFIG_MANAGE'))return deny('CONFIG_MANAGE');audit('CONFIG_CHANGED','feed.mix: cap '+(FEEDMIX.cap_enabled?'on':'off')+', listings/events '+FEEDMIX.max_listings_events+'%, jobs '+FEEDMIX.max_jobs+'%','Feed mix tuned');toast('Saved. Applies on the next feed request.');};

// ================= Settings =================
V.config=()=>{
  const tabs=[...(can('CONFIG_VIEW')?[['LIM','Limits and thresholds'],['FLAG','Feature flags']]:[]),...(can('RISK_RULES_MANAGE')?[['RISK','Scam keywords'],['RES','Reserved names']]:[]),...(can('REFERENCE_DATA_MANAGE')?[['REF','Reference data']]:[]),...(can('PAGES_MANAGE')?[['PAGES','Pages and FAQ']]:[])];
  const tab=cur('cfg',tabs[0][0]);let body='';const edit=can('CONFIG_MANAGE');
  if(tab==='LIM'){const groups=[...new Set(CONFIG.map(c=>c.group))];body=(edit?'':`<div class="warn-box" style="margin-bottom:12px">${I('lock',13)} Viewing only. Editing needs <code>CONFIG_MANAGE</code>.</div>`)+groups.map(g=>`<div class="sec">${g}</div>`+table(['Setting','Key','Value'],CONFIG.filter(c=>c.group===g).map(c=>`<tr><td><b>${c.label}</b></td><td class="mono muted">${c.key}</td><td><div class="row"><input class="inp" style="width:100px" type="number" value="${c.value}" data-cfg="${c.key}" ${edit?'':'disabled'} aria-label="${c.label}"><span class="muted">${c.unit}</span></div></td></tr>`))).join('');}
  if(tab==='FLAG')body=`<div class="card" style="max-width:720px">${FLAGS.map(f=>`<div class="list-i"><span class="grow"><b>${f.label}</b><br><span class="hint">${f.desc}</span></span>${sw(f.on,'flagToggle',`data-k="${f.key}"`,!edit)}</div>`).join('')}</div>`;
  if(tab==='RISK')body=`<p class="muted">Matched at publish. <b>Block</b> stops the listing. <b>Flag</b> publishes it and queues it for review.</p>`+table(['Phrase','Action','Active',''],RISK.map((r,i)=>`<tr><td class="mono">${esc(r.phrase)}</td><td><select class="inp" style="width:110px" data-risk="${i}"><option ${r.action==='BLOCK'?'selected':''}>BLOCK</option><option ${r.action==='FLAG'?'selected':''}>FLAG</option></select></td><td>${sw(r.active,'riskToggle',`data-i="${i}"`)}</td><td>${abtn('RISK_RULES_MANAGE','Delete','danger','riskDel',`data-i="${i}"`,'sm')}</td></tr>`))+`<div class="row" style="margin-top:12px"><input class="inp" id="risk-new" placeholder="New phrase, e.g. wire transfer" style="max-width:320px">${abtn('RISK_RULES_MANAGE','Add phrase','lime','riskAdd')}</div>`;
  if(tab==='RES')body=`<p class="muted">Names that match these patterns cannot be used by member communities or accounts. <code>*</code> matches any text.</p><div class="card" style="max-width:560px">${RESERVED.map((r,i)=>`<div class="list-i"><span class="mono grow">${esc(r)}</span>${abtn('RISK_RULES_MANAGE','Remove','danger','resDel',`data-i="${i}"`,'sm')}</div>`).join('')}<div class="row" style="margin-top:12px"><input class="inp" id="res-new" placeholder="e.g. *corpers admin*">${abtn('RISK_RULES_MANAGE','Add','lime','resAdd')}</div></div>`;
  if(tab==='REF')body=`<div class="cards">${Object.entries(REF).map(([k,v])=>`<div class="card kpi"><div class="n">${v}</div><div class="l">${k}</div></div>`).join('')}</div><div class="card" style="margin-top:14px;max-width:560px"><h3 class="hd">Add an orientation camp</h3><div class="row">${field('','ref-camp',{ph:'e.g. Enugu Orientation Camp'}).replace('<div class="field">','<div class="field grow" style="margin:0">')}${abtn('REFERENCE_DATA_MANAGE','Add camp','lime','addCamp')}</div></div>`;
  if(tab==='PAGES')body=table(['Page','Version','Updated',''],PAGES.map(p=>`<tr><td><b>${p[1]}</b></td><td>${p[2]}</td><td class="muted">${p[3]}</td><td>${abtn('PAGES_MANAGE','Edit and publish','dark','editPage',`data-k="${p[0]}"`,'sm')}</td></tr>`))+`<p class="muted" style="margin-top:12px">${FAQ_COUNT} FAQ items. Publishing a new Terms or Privacy version asks members to accept again.</p>`;
  return pageHd('Settings','Limits, flags, scam rules, reference data and pages. Every change is audited.')+chipRow('cfg',tabs,tabs[0][0])+body;
};
A.cfgSet=d=>{if(!can('CONFIG_MANAGE'))return deny('CONFIG_MANAGE');const c=CONFIG.find(x=>x.key===d.k),old=c.value;c.value=+d.v;audit('CONFIG_CHANGED',`${c.key} ${old} → ${c.value}`,'Settings');toast('Saved '+c.label);};
A.flagToggle=d=>{if(!can('CONFIG_MANAGE'))return deny('CONFIG_MANAGE');const f=FLAGS.find(x=>x.key===d.k);f.on=!f.on;audit('FLAG_CHANGED',f.key+' → '+(f.on?'on':'off'),'');render();toast(f.label+': '+(f.on?'on':'off'));};
A.riskToggle=d=>{RISK[d.i].active=!RISK[d.i].active;audit('RISK_PHRASE_CHANGED',RISK[d.i].phrase,RISK[d.i].active?'on':'off');render();};
A.riskAction=d=>{RISK[d.i].action=d.v;audit('RISK_PHRASE_CHANGED',RISK[d.i].phrase,d.v);toast('Saved');};
A.riskDel=d=>{audit('RISK_PHRASE_DELETED',RISK[d.i].phrase,'');RISK.splice(d.i,1);render();};
A.riskAdd=()=>{const p=val('risk-new').toLowerCase();if(p.length<3)return toast('Enter a phrase',true);RISK.push({phrase:p,action:'FLAG',active:true});audit('RISK_PHRASE_ADDED',p,'');render();toast('Added as FLAG');};
A.resDel=d=>{audit('RESERVED_NAME_REMOVED',RESERVED[d.i],'');RESERVED.splice(d.i,1);render();};
A.resAdd=()=>{const p=val('res-new');if(p.length<3)return toast('Enter a pattern',true);RESERVED.push(p);audit('RESERVED_NAME_ADDED',p,'');render();};
A.addCamp=()=>{const n=val('ref-camp');if(n.length<5)return toast('Enter a camp name',true);REF.camps++;CAMPS.push(n);SCHEDULE[n]=[];audit('CAMP_ADDED',n,'');render();toast('Camp added');};
A.editPage=d=>{const p=PAGES.find(x=>x[0]===d.k);openModal({title:'Edit '+p[1],sub:'Publishing bumps the version.',body:field('Content','pg-body',{area:true,v:'Prototype: the page text would be edited here.'}),ok:'savePage',data:`data-k="${p[0]}"`,okLabel:'Publish'});};
A.savePage=d=>{const p=PAGES.find(x=>x[0]===d.k);const v=parseFloat(p[2].slice(1))+0.1;p[2]='v'+v.toFixed(1);p[3]='Just now';audit('PAGE_PUBLISHED',p[1]+' '+p[2],'');closeModal();toast('Published '+p[1]+' '+p[2]);};

// ================= Audit =================
V.audit=()=>{
  const tab=cur('aud','ALL'),q=gq('aud');
  const list=AUDIT.filter(a=>(tab==='ALL'||a.type===tab)&&(!q||(a.actor+a.action+a.target+a.reason).toLowerCase().includes(q)));
  return pageHd('Audit log','Every privileged action: who, what, target, reason. Append-only.',abtn('AUDIT_EXPORT','Export','dark','auditExport'))+searchBox('aud','Search actor, action or target')+chipRow('aud',[['ALL','All'],['ADMIN','Admins'],['MEMBER','Moderators'],['SYSTEM','System']],'ALL')+
   table(['When','Actor','Action','Target','Reason'],list.map(a=>`<tr><td class="muted">${esc(a.when)}</td><td><b>${esc(a.actor)}</b> ${a.type!=='ADMIN'?`<span class="tag">${a.type==='MEMBER'?'moderator':'system'}</span>`:''}</td><td class="mono">${esc(a.action)}</td><td>${esc(a.target)}</td><td class="muted">${esc(a.reason)}</td></tr>`),'No entries.');
};
A.auditExport=()=>{audit('AUDIT_EXPORTED','Audit log','');toast('Export started');};

// ================= Admins and roles =================
V.admins=()=>{
  const tab=cur('adm','ADMINS');
  let body='';
  if(tab==='ADMINS')body=table(['Admin','Roles','Status','MFA','Last sign-in',''],ADMINS.map(a=>`<tr><td><div class="row">${av(a.name,a.color,34)}<span><b>${esc(a.name)}</b>${a.id===S.persona?' <span class="tag lime">you</span>':''}<br><span class="muted">${esc(a.email)}</span></span></div></td><td>${a.roles.map(r=>`<span class="tag blue">${esc(roleOf(r)?.name)}</span>`).join(' ')}</td><td>${tag(a.status)}</td><td>${a.mfa?'On':'<span class="muted">Pending</span>'}</td><td class="muted">${a.last}</td><td><div class="row wrap">${abtn('ADMIN_ACCOUNTS_MANAGE','Roles','dark','editAdminRoles',`data-id="${a.id}"`,'sm')}${a.status==='ACTIVE'?abtn('ADMIN_ACCOUNTS_MANAGE','Deactivate','danger','deactAdmin',`data-id="${a.id}"`,'sm'):''}</div></td></tr>`));
  else{
    const r=roleOf(S.roleSel)||ROLES[0];const groups=[...new Set(PERMS.map(p=>p.group))];const dis=r.locked;
    body=`<div class="two" style="grid-template-columns:280px 1fr;align-items:start"><div class="card" style="padding:10px">${ROLES.map(x=>`<button class="nav-i ${x.id===r.id?'on':''}" data-a="selRole" data-id="${x.id}"><span class="grow" style="text-align:left">${esc(x.name)}${x.locked?' '+I('lock',12):''}</span><span class="${x.id===r.id?'':'muted'}">${x.perms.size}</span></button>`).join('')}<div style="padding:8px 4px 4px">${abtn('ADMIN_ACCOUNTS_MANAGE',I('plus',14)+'New role','lime','newRole','','block')}</div></div>
     <div class="card"><div class="row between wrap"><div><h3 class="hd" style="font-size:20px">${esc(r.name)}</h3><div class="muted">${esc(r.desc)}</div></div>${dis?`<span class="tag">${I('lock',11)} locked system role</span>`:abtn('ADMIN_ACCOUNTS_MANAGE','Delete role','danger','delRole',`data-id="${r.id}"`,'sm')}</div>
     <p class="hint" style="margin:10px 0">${dis?'Super admin always has every permission, including new ones added later. It cannot be edited or deleted.':'Changes apply immediately to everyone with this role. You can’t grant a permission you don’t have yourself.'}</p>
     ${groups.map(g=>`<div class="perm-grp"><div class="sec">${g}</div>${PERMS.filter(p=>p.group===g).map(p=>{const has=r.perms.has(p.key),lockMe=dis||!can('ADMIN_ACCOUNTS_MANAGE')||!can(p.key);return `<div class="perm-row">${sw(has,'togPerm',`data-r="${r.id}" data-k="${p.key}"`,lockMe)}<span class="grow"><code>${p.key}</code><br><span class="hint">${p.desc}</span>${!dis&&!can(p.key)?` <span class="hint">· you don’t hold this</span>`:''}</span></div>`;}).join('')}</div>`).join('')}</div></div>`;
  }
  return pageHd('Admins and roles','Admins are invited and sign in with MFA. A super admin creates roles and assigns permissions. The backend enforces every permission.',tab==='ADMINS'?abtn('ADMIN_ACCOUNTS_MANAGE',I('plus',14)+'Invite admin','lime','inviteAdmin'):'')+chipRow('adm',[['ADMINS','Admins',ADMINS.length],['ROLES','Roles and permissions',ROLES.length]],'ADMINS')+body;
};
A.selRole=d=>{S.roleSel=d.id;render();};
A.togPerm=d=>{if(!can('ADMIN_ACCOUNTS_MANAGE'))return deny('ADMIN_ACCOUNTS_MANAGE');const r=roleOf(d.r);if(r.locked)return toast('SUPER_ADMIN is locked',true);if(!can(d.k))return toast('You can’t grant a permission you don’t hold',true);
  if(r.perms.has(d.k))r.perms.delete(d.k);else r.perms.add(d.k);audit('ROLE_PERMISSIONS_CHANGED',r.name+': '+d.k+(r.perms.has(d.k)?' granted':' revoked'),'');render();toast('Applied immediately');};
A.newRole=()=>openModal({title:'New role',sub:'Start blank or copy an existing role, then adjust its permissions.',body:field('Role name','r-name',{ph:'e.g. Regional moderator'})+field('Description','r-desc',{ph:'What is this role for?'})+field('Start from','r-from',{opts:[['','Blank role'],...ROLES.filter(r=>!r.locked).map(r=>[r.id,'Copy: '+r.name])]}),ok:'createRole',okLabel:'Create role'});
A.createRole=()=>{const n=val('r-name');if(n.length<3)return ferr('r-name','At least 3 characters.');const id=n.toUpperCase().replace(/\W+/g,'_');if(roleOf(id))return ferr('r-name','A role with this name exists.');const from=roleOf(val('r-from'));const perms=new Set(from?[...from.perms].filter(k=>can(k)):[]);ROLES.push({id,name:n,desc:val('r-desc')||'Custom role',perms});S.roleSel=id;audit('ROLE_CREATED',n,'');closeModal();render();toast('Role created. Now choose its permissions.');};
A.delRole=d=>{const r=roleOf(d.id);const used=ADMINS.filter(a=>a.roles.includes(r.id));if(used.length)return toast(`Role is assigned to ${used.length} admin${used.length>1?'s':''}. Reassign them first.`,true);ROLES.splice(ROLES.indexOf(r),1);S.roleSel='SUPER_ADMIN';audit('ROLE_DELETED',r.name,'');render();toast('Role deleted');};
A.inviteAdmin=()=>openModal({title:'Invite an admin',sub:'They get an email link valid for 72 hours, set a password and enrol MFA.',body:field('Work email','i-email',{type:'email',ph:'name@corpersconnect.example'})+field('Name','i-name')+`<div class="lbl">Roles</div>${ROLES.filter(r=>!r.locked||can('ADMIN_ACCOUNTS_MANAGE')).map(r=>`<label class="row" style="padding:5px 0"><input type="checkbox" class="rolechk" value="${r.id}"> ${esc(r.name)}</label>`).join('')}`,ok:'sendInvite',okLabel:'Send invite'});
A.sendInvite=()=>{const e=val('i-email'),n=val('i-name');if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e))return ferr('i-email','Enter a valid email.');if(n.length<2)return ferr('i-name','Enter a name.');const roles=[...document.querySelectorAll('.rolechk:checked')].map(x=>x.value);if(!roles.length)return toast('Choose at least one role',true);ADMINS.push({id:'a'+(ADMINS.length+1),name:n,email:e,roles,status:'INVITED',mfa:false,last:'Never',color:COL[ADMINS.length%9]});audit('ADMIN_INVITED',n+' ('+roles.join(', ')+')','');closeModal();toast('Invite sent to '+e);};
A.editAdminRoles=d=>{const a=ADMINS.find(x=>x.id===d.id);if(a.id===S.persona)return toast('ADMIN_SELF_ACTION_FORBIDDEN · you can’t change your own roles',true);openModal({title:'Roles for '+a.name,body:ROLES.map(r=>`<label class="row" style="padding:6px 0"><input type="checkbox" class="rolechk" value="${r.id}" ${a.roles.includes(r.id)?'checked':''}> ${esc(r.name)} <span class="hint">· ${r.perms.size} permissions</span></label>`).join(''),ok:'saveAdminRoles',data:`data-id="${a.id}"`,okLabel:'Save'});};
A.saveAdminRoles=d=>{const a=ADMINS.find(x=>x.id===d.id),roles=[...document.querySelectorAll('.rolechk:checked')].map(x=>x.value);if(!roles.length)return toast('An admin needs at least one role',true);const supers=ADMINS.filter(x=>x.status==='ACTIVE'&&x.roles.includes('SUPER_ADMIN'));if(a.roles.includes('SUPER_ADMIN')&&!roles.includes('SUPER_ADMIN')&&supers.length<=1)return toast('There must always be one active super admin',true);a.roles=roles;audit('ADMIN_ROLES_CHANGED',a.name+': '+roles.join(', '),'');closeModal();toast('Roles updated');};
A.deactAdmin=d=>{const a=ADMINS.find(x=>x.id===d.id);if(a.id===S.persona)return toast('ADMIN_SELF_ACTION_FORBIDDEN · you can’t deactivate yourself',true);const supers=ADMINS.filter(x=>x.status==='ACTIVE'&&x.roles.includes('SUPER_ADMIN'));if(a.roles.includes('SUPER_ADMIN')&&supers.length<=1)return toast('There must always be one active super admin',true);a.status='DEACTIVATED';audit('ADMIN_DEACTIVATED',a.name,'');render();toast(a.name+' deactivated. Sessions revoked.');};

// ---------- Boot ----------
route();
