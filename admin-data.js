// Sample data for the admin prototype. Nothing is saved or sent.
const COL=['#C8F169','#FF8A3D','#8FB3FF','#F7B2D9','#FFD66B','#C4B5FD','#7DD3FC','#B8E1C5','#FDA4AF'];

// ---------- Permissions and roles ----------
const PERMS=[
 ['Members','MEMBERS_VIEW','Search and view member accounts (no ID images)'],
 ['Members','MEMBERS_MANAGE','Restrict, suspend, ban, reinstate members'],
 ['Members','SENSITIVE_DATA_VIEW','Reveal call-up numbers and contact details (always audited)'],
 ['Verification','VERIFICATION_VIEW','See the verification queue'],
 ['Verification','VERIFICATION_REVIEW','Approve, reject, request resubmission. Opens ID images'],
 ['Verification','MODERATOR_APPLICATIONS_REVIEW','Review moderator applications'],
 ['Verification','ALUMNI_REVIEW','Confirm alumni status'],
 ['Communities','COMMUNITIES_VIEW','View official and member communities'],
 ['Communities','COMMUNITIES_MANAGE','Create official communities, edit, archive, remove, resolve duplicates'],
 ['Communities','MODERATORS_MANAGE','Appoint, change and remove moderators'],
 ['Communities','COMMUNITY_CONTENT_MODERATE','Moderate posts and comments in any community, pin notices'],
 ['Communities','COMMUNITY_MEMBERS_MANAGE','Remove or ban members from any community'],
 ['Moderation','REPORTS_VIEW','See the reports queue'],
 ['Moderation','REPORTS_MANAGE','Action and dismiss reports'],
 ['Moderation','APPEALS_MANAGE','Decide appeals (not on your own actions)'],
 ['Listings and events','LISTINGS_VIEW','See jobs, items and accommodation, including hidden'],
 ['Listings and events','LISTINGS_MODERATE','Hide, remove, restore listings, confirm scams'],
 ['Listings and events','EVENTS_MODERATE','Cancel or remove events'],
 ['Content','ANNOUNCEMENTS_MANAGE','Create platform and community announcements'],
 ['Content','ANNOUNCEMENTS_OFFICIAL','Publish with the official-authority label'],
 ['Content','NOTIFICATIONS_SEND','Send platform notifications'],
 ['Content','CAMP_SCHEDULE_MANAGE','Manage camp schedules'],
 ['Content','PAGES_MANAGE','Edit static pages and FAQ'],
 ['Content','SUPPORT_MANAGE','View and reply to support tickets'],
 ['Platform','RISK_RULES_MANAGE','Edit scam keywords and reserved names'],
 ['Platform','CONFIG_VIEW','View configuration'],
 ['Platform','CONFIG_MANAGE','Change limits, thresholds, flags and feed mix'],
 ['Platform','REFERENCE_DATA_MANAGE','Edit states, LGAs, camps, batches'],
 ['Platform','ANALYTICS_VIEW','View dashboards'],
 ['Platform','ANALYTICS_EXPORT','Export analytics'],
 ['Platform','AUDIT_VIEW','Read the audit log'],
 ['Platform','AUDIT_EXPORT','Export the audit log'],
 ['Admin','ADMIN_ACCOUNTS_MANAGE','Invite admins, create roles, assign permissions']
].map(([group,key,desc])=>({group,key,desc}));
const ALL=PERMS.map(p=>p.key);

const ROLES=[
 {id:'SUPER_ADMIN',name:'Super admin',desc:'Everything, including roles and permissions. Locked system role.',locked:true,perms:new Set(ALL)},
 {id:'VERIFICATION_REVIEWER',name:'Verification reviewer',desc:'Reviews ID photos, alumni and redeployment requests.',perms:new Set(['MEMBERS_VIEW','VERIFICATION_VIEW','VERIFICATION_REVIEW','ALUMNI_REVIEW'])},
 {id:'TRUST_AND_SAFETY',name:'Trust and safety',desc:'Reports, sanctions, appeals, scam handling.',perms:new Set(['MEMBERS_VIEW','MEMBERS_MANAGE','REPORTS_VIEW','REPORTS_MANAGE','LISTINGS_VIEW','LISTINGS_MODERATE','EVENTS_MODERATE','APPEALS_MANAGE','RISK_RULES_MANAGE','COMMUNITIES_VIEW','COMMUNITY_CONTENT_MODERATE','COMMUNITY_MEMBERS_MANAGE'])},
 {id:'COMMUNITY_MANAGER',name:'Community manager',desc:'Official communities, moderators and announcements.',perms:new Set(['COMMUNITIES_VIEW','COMMUNITIES_MANAGE','MODERATOR_APPLICATIONS_REVIEW','MODERATORS_MANAGE','COMMUNITY_CONTENT_MODERATE','COMMUNITY_MEMBERS_MANAGE','ANNOUNCEMENTS_MANAGE'])},
 {id:'STAFF_MODERATOR',name:'Staff moderator',desc:'Day-to-day content moderation across the platform.',perms:new Set(['MEMBERS_VIEW','COMMUNITIES_VIEW','COMMUNITY_CONTENT_MODERATE','COMMUNITY_MEMBERS_MANAGE','REPORTS_VIEW','REPORTS_MANAGE','LISTINGS_VIEW','LISTINGS_MODERATE','EVENTS_MODERATE'])},
 {id:'CONTENT_EDITOR',name:'Content editor',desc:'Announcements, camp schedules and pages.',perms:new Set(['ANNOUNCEMENTS_MANAGE','NOTIFICATIONS_SEND','CAMP_SCHEDULE_MANAGE','PAGES_MANAGE'])},
 {id:'SUPPORT_AGENT',name:'Support agent',desc:'Replies to support tickets.',perms:new Set(['SUPPORT_MANAGE','MEMBERS_VIEW'])},
 {id:'ANALYST',name:'Analyst',desc:'Dashboards and exports.',perms:new Set(['ANALYTICS_VIEW','ANALYTICS_EXPORT','MEMBERS_VIEW'])},
 {id:'AUDITOR',name:'Auditor',desc:'Reads and exports the audit log.',perms:new Set(['AUDIT_VIEW','AUDIT_EXPORT','MEMBERS_VIEW'])}
];

const ADMINS=[
 {id:'a1',name:'Ada Eze',email:'ada@corpersconnect.example',roles:['SUPER_ADMIN'],status:'ACTIVE',mfa:true,last:'Today, 09:12',color:COL[0]},
 {id:'a2',name:'Tunde Bello',email:'tunde.b@corpersconnect.example',roles:['STAFF_MODERATOR'],status:'ACTIVE',mfa:true,last:'Today, 08:40',color:COL[1]},
 {id:'a3',name:'Ngozi Obi',email:'ngozi.o@corpersconnect.example',roles:['VERIFICATION_REVIEWER'],status:'ACTIVE',mfa:true,last:'Yesterday',color:COL[2]},
 {id:'a4',name:'Chidi Musa',email:'chidi.m@corpersconnect.example',roles:['TRUST_AND_SAFETY','COMMUNITY_MANAGER'],status:'ACTIVE',mfa:true,last:'Today, 07:58',color:COL[3]},
 {id:'a5',name:'Halima Sani',email:'halima.s@corpersconnect.example',roles:['SUPPORT_AGENT'],status:'ACTIVE',mfa:true,last:'Yesterday',color:COL[4]},
 {id:'a6',name:'Emeka Ola',email:'emeka.o@corpersconnect.example',roles:['ANALYST','AUDITOR'],status:'ACTIVE',mfa:true,last:'2 days ago',color:COL[5]},
 {id:'a7',name:'Zainab Yusuf',email:'zainab.y@corpersconnect.example',roles:['CONTENT_EDITOR'],status:'INVITED',mfa:false,last:'Never',color:COL[6]}
];

// ---------- Members ----------
const M=(id,name,username,av,state,batch,service,ver,acct,ago,posts,reports,email)=>({id,name,username,photo:av?`media/av/${av}.jpg`:null,state,batch,service,ver,acct,joined:ago,posts,reports,email,callup:'NYSC/'+batch.replace(/\D/g,'').slice(-4)+'/'+state.slice(0,2).toUpperCase()+'/0'+(300+Math.floor(Math.random()*600)),notes:[],sanctions:[]});
const MEMBERS=[
 M('m1','Amaka Okafor','amaka.ok','w1','Kano','Batch B 2026','In camp','VERIFIED','ACTIVE','3 weeks ago',24,0,'amaka@example.com'),
 M('m2','Ibrahim Bello','ibro.bello','m1','Kano','Batch B 2026','In camp','VERIFIED','ACTIVE','3 weeks ago',41,1,'ibrahim@example.com'),
 M('m3','Fatima Nuhu','fatima.nuhu','w2','Kano','Batch B 2026','In camp','VERIFIED','ACTIVE','3 weeks ago',12,0,'fatima@example.com'),
 M('m4','Musa Sani','musa.sani','m2','Kano','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',88,2,'musa@example.com'),
 M('m5','Tunde Adeyemi','tunde.dev','m3','Lagos','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',120,0,'tunde@example.com'),
 M('m6','Zainab Lawal','zee.lawal','w3','FCT','Batch C 2025','Completed','VERIFIED','ACTIVE','1 year ago',210,0,'zainab@example.com'),
 M('m7','Emeka Nwosu','emeka.shoots','m4','Kano','Batch B 2026','In camp','VERIFIED','ACTIVE','3 weeks ago',60,0,'emeka@example.com'),
 M('m8','Kemi Balogun','kemi.b','w4','Oyo','Batch A 2026','Serving','UNVERIFIED','ACTIVE','4 months ago',35,0,'kemi@example.com'),
 M('m9','Funke Adebayo','funke.ade','w9','Oyo','Batch B 2026','Awaiting deployment','PENDING','ACTIVE','2 days ago',3,0,'funke@example.com'),
 M('m10','Halima Garba','halima.garba','w7','Bauchi','Batch B 2026','In camp','PENDING','ACTIVE','2 weeks ago',9,0,'halima@example.com'),
 M('m11','Yusuf Abdullahi','yusuf.abd','m6','Kaduna','Batch B 2026','In camp','PENDING','ACTIVE','2 weeks ago',14,0,'yusuf@example.com'),
 M('m12','Samuel Danjuma','sam.dan','m10','Plateau','Batch B 2026','In camp','PENDING','ACTIVE','2 weeks ago',11,0,'samuel@example.com'),
 M('m13','Bolanle Adewale','bola.ade','w13','Ogun','Batch B 2026','In camp','PENDING','ACTIVE','2 weeks ago',17,0,'bola@example.com'),
 M('m14','Segun Ogunleye','segun.og','m7','Ogun','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',44,0,'segun@example.com'),
 M('m15','Grace Ihejirika','grace.ihe','w10','Imo','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',52,0,'grace@example.com'),
 M('m16','Ahmed Suleiman','ahmed.sul','m11','Kano','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',38,3,'ahmed@example.com'),
 M('m17','Ifeoma Chukwu','ifeoma.c','w14','Enugu','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',70,0,'ifeoma@example.com'),
 M('m18','Victor Obi','victor.obi','m12','Delta','Batch C 2025','Completed','VERIFIED','ACTIVE','1 year ago',150,0,'victor@example.com'),
 M('m19','Aisha Mohammed','aisha.mo','w8','FCT','Batch B 2025','Completed','VERIFIED','ACTIVE','1 year ago',95,0,'aisha@example.com'),
 M('m20','Chidera Nnamdi','chidera.n','m8','Rivers','Batch C 2025','Completed','VERIFIED','ACTIVE','1 year ago',130,0,'chidera@example.com'),
 M('m21','Daniel Pam','dan.pam','m9','Plateau','Batch B 2026','In camp','REJECTED','ACTIVE','3 weeks ago',2,0,'daniel@example.com'),
 M('m22','Blessing Udoh','blessing.udoh','w6','Akwa Ibom','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',40,0,'blessing@example.com'),
 M('m23','Kelechi Onyeka','kelechi.o','m13','Abia','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',33,0,'kelechi@example.com'),
 M('m24','Tolu Akinwale','tolu.ak','w11','Lagos','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',78,0,'tolu@example.com'),
 M('m25','Quick Cash Hub','quickcash.ng',null,'Lagos','Batch B 2026','Serving','VERIFIED','SUSPENDED','6 weeks ago',9,6,'qch@example.com'),
 M('m26','Maryam Yakubu','maryam.y','w12','Kaduna','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',57,0,'maryam@example.com'),
 M('m27','David Okon','david.okon','m9','Cross River','Batch A 2026','Serving','VERIFIED','ACTIVE','5 months ago',46,0,'david@example.com'),
 M('m28','Femi Coker','femi.coker','m14','Lagos','Batch B 2025','Completed','VERIFIED','ACTIVE','1 year ago',160,0,'femi@example.com')
];
MEMBERS.find(m=>m.id==='m25').sanctions.push({type:'SUSPEND',reason:'Confirmed pay-to-apply scam',by:'Chidi Musa',when:'6 weeks ago'});
const member=id=>MEMBERS.find(m=>m.id===id);

// ---------- Verification submissions ----------
const SUBS=[
 {id:'v1',mid:'m9',kind:'MEMBER_VERIFICATION',status:'PENDING',wait:41,img:'media/id/id1.svg',flags:[],note:''},
 {id:'v2',mid:'m10',kind:'MEMBER_VERIFICATION',status:'PENDING',wait:30,img:'media/id/id2.svg',flags:[],note:''},
 {id:'v3',mid:'m11',kind:'MEMBER_VERIFICATION',status:'PENDING',wait:22,img:'media/id/id3.svg',flags:['DUPLICATE_ID'],note:'Same call-up number as another account (m19).'},
 {id:'v4',mid:'m12',kind:'MEMBER_VERIFICATION',status:'PENDING',wait:9,img:'media/id/id4.svg',flags:[],note:''},
 {id:'v5',mid:'m13',kind:'MEMBER_VERIFICATION',status:'PENDING',wait:4,img:'media/id/id5.svg',flags:[],note:''},
 {id:'v6',mid:'m21',kind:'MEMBER_VERIFICATION',status:'RESUBMIT_REQUESTED',wait:55,img:'media/id/id6.svg',flags:[],note:'Photo was cropped. Asked for a clearer one.'},
 {id:'v7',mid:'m8',kind:'MEMBER_VERIFICATION',status:'ESCALATED',wait:60,img:'media/id/id6.svg',flags:['NAME_MISMATCH'],note:'Card name differs from profile name. Escalated by Ngozi Obi.'},
 {id:'v8',mid:'m14',kind:'MODERATOR_APPLICATION',status:'PENDING',wait:20,img:'media/id/id7.svg',flags:[],cid:'c4',motivation:'I run the physics club at my school and have moderated a 2,000-member alumni group for 3 years. I know how to keep threads friendly.',experience:'Alumni group admin, school prefect.'},
 {id:'v9',mid:'m15',kind:'MODERATOR_APPLICATION',status:'PENDING',wait:12,img:'media/id/id8.svg',flags:[],cid:'c8',motivation:'Foodies group is growing fast and needs help to keep photos and promotions apart. I volunteer daily and can cover evenings.',experience:'Community volunteer.'},
 {id:'v10',mid:'m16',kind:'MODERATOR_APPLICATION',status:'PENDING',wait:7,img:'media/id/id9.svg',flags:['REPORTED_3X'],cid:'c9',motivation:'I want to moderate the marketplace hub.',experience:'Sell phone repairs.',note:'Applicant has 3 member reports. Review before approving.'},
 {id:'v11',mid:'m6',kind:'ALUMNI_REQUEST',status:'PENDING',wait:16,img:'media/id/cert1.svg',flags:[],note:''},
 {id:'v12',mid:'m14',kind:'REDEPLOYMENT',status:'PENDING',wait:28,img:'media/id/letter1.svg',flags:[],note:'Lagos to Ogun, health grounds.'},
 {id:'v13',mid:'m1',kind:'MEMBER_VERIFICATION',status:'APPROVED',wait:0,img:null,flags:[],note:'Approved by Ngozi Obi, 3 days ago. Image deleted.',decided:'3 days ago'},
 {id:'v14',mid:'m21',kind:'MEMBER_VERIFICATION',status:'REJECTED',wait:0,img:null,flags:[],note:'Rejected: card photo unreadable.',decided:'3 weeks ago'}
];
const KIND={MEMBER_VERIFICATION:'Member verification',MODERATOR_APPLICATION:'Moderator application',ALUMNI_REQUEST:'Alumni request',REDEPLOYMENT:'Redeployment'};

// ---------- Communities ----------
const C=(id,name,type,cat,members,mods,status,extra={})=>Object.assign({id,name,type,cat,members,mods,status,posts:[],flag:null},extra);
const COMMUNITIES=[
 C('c1','Kano Orientation Camp','OFFICIAL','Batch & camp',2140,['m2','m1'],'ACTIVE'),
 C('c2','Batch B 2026','OFFICIAL','Batch & camp',48210,['m6'],'ACTIVE'),
 C('c3','Kano Corps Members','OFFICIAL','Location',6320,['m4'],'ACTIVE'),
 C('c4','Batch A 2026','OFFICIAL','Batch & camp',51400,[],'ACTIVE'),
 C('c5','Lagos Orientation Camp','OFFICIAL','Batch & camp',2890,['m5'],'ACTIVE'),
 C('c6','Tech Corpers','MEMBER','Tech',12400,['m5'],'ACTIVE'),
 C('c7','Job Leads Nationwide','MEMBER','Business',21800,['m18','m19'],'ACTIVE'),
 C('c8','Corper Foodies','MEMBER','Interest',9100,['m15'],'ACTIVE'),
 C('c9','Corpers Marketplace Hub','MEMBER','Business',15600,['m16'],'ACTIVE'),
 C('c10','Photographers in NYSC','MEMBER','Creative',3100,['m7'],'ACTIVE'),
 C('c11','Batch B 2026 Official','MEMBER','Batch & camp',210,[],'ACTIVE',{flag:'DUPLICATE'}),
 C('c12','NYSC Official Jobs','MEMBER','Business',64,[],'ACTIVE',{flag:'IMPERSONATION'}),
 C('c13','Naija Corpers FC','MEMBER','Sports',6200,['m2'],'ACTIVE'),
 C('c14','Abuja Roommates','MEMBER','Accommodation',4900,['m19'],'ACTIVE'),
 C('c15','Anime Corpers','MEMBER','Interest',1780,['m7'],'ACTIVE')
];
const community=id=>COMMUNITIES.find(c=>c.id===id);
const SAMPLE_POSTS=[
 {id:'p1',by:'m2',text:'Friday match highlights. Platoon 7 won 3–1. Rematch Tuesday, bring your boots.',ago:'3h',pinned:false},
 {id:'p2',by:'m1',text:'Day 4 and I finally survived morning drills without stopping. Who else cannot feel their legs?',ago:'1h',pinned:false},
 {id:'p3',by:'m25',text:'EASY MONEY. Send ₦5,000 and earn ₦50,000 in 24h. DM now!!!',ago:'20m',pinned:false},
 {id:'p4',by:'m3',text:'Does anyone know if we can still change platoons after Wednesday?',ago:'2h',pinned:true}
];
COMMUNITIES.forEach(c=>{c.posts=SAMPLE_POSTS.map(p=>({...p,removed:false,hidden:false}));});

// ---------- Reports ----------
const R=(id,tt,title,reason,pri,count,cid,age,owner)=>({id,tt,title,reason,pri,count,cid,age,owner,status:'OPEN'});
const REPORTS=[
 R('r1','LISTING','Online customer care job. Pay ₦3,500 registration fee to start','PAY_TO_APPLY','HIGH',5,null,2,'m25'),
 R('r2','LISTING','Self-contain, Lekki, ₦120,000/yr. Send deposit first to hold it','SCAM','HIGH',4,null,5,'m25'),
 R('r3','POST','EASY MONEY. Send ₦5,000 and earn ₦50,000 in 24h. DM now!!!','SCAM','HIGH',3,'c6',1,'m25'),
 R('r4','USER','@nysc.officials posing as NYSC staff','IMPERSONATION','HIGH',6,null,8,'m21'),
 R('r5','POST','Insults aimed at a platoon officer in the camp thread','HARASSMENT','NORMAL',2,'c1',14,'m2'),
 R('r6','COMMENT','“Go and sit down, you know nothing about this”','HARASSMENT','NORMAL',1,'c6',20,'m16'),
 R('r7','LISTING','iPhone XR 128GB, still available? (sold last week)','ALREADY_CLOSED','NORMAL',2,null,30,'m16'),
 R('r8','POST','Parade cancelled tomorrow! (posted as fact, no source)','MISINFORMATION','NORMAL',3,'c1',3,'m10'),
 R('r9','POST','Repeated promo for phone repairs in every thread','SPAM','NORMAL',4,'c9',26,'m16'),
 R('r10','MODERATOR','Moderator removing posts that disagree with them','MODERATOR_ABUSE','NORMAL',2,'c13',40,'m2'),
 R('r11','COMMUNITY','Batch B 2026 Official (duplicate, imitates the official space)','IMPERSONATION','HIGH',7,'c11',6,'m21'),
 R('r12','LISTING','Wrong price, fees not shown in the listing','WRONG_PRICE_OR_FEES','NORMAL',1,null,52,'m4')
];

// ---------- Appeals ----------
const APPEALS=[
 {id:'ap1',mid:'m16',action:'Removed post in Corpers Marketplace Hub (spam)',by:'Chidi Musa',text:'It was one promo post and I removed the repeats myself. Please restore it.',status:'OPEN',age:2},
 {id:'ap2',mid:'m4',action:'Restricted account for 3 days (harassment)',by:'Ada Eze',text:'The comment was a joke between friends and was taken out of context.',status:'OPEN',age:3},
 {id:'ap3',mid:'m25',action:'Suspended account (confirmed pay-to-apply scam)',by:'Chidi Musa',text:'I did not know it was not allowed. Please unsuspend me.',status:'OPEN',age:4}
];

// ---------- Listings ----------
const L=(id,kind,title,owner,state,price,status,reports,hidden,flags,ago)=>({id,kind,title,owner,state,price,status,reports,hidden,flags,ago});
const LISTINGS=[
 L('l1','JOB','Online customer care job. Pay ₦3,500 registration fee','m25','Lagos','₦80,000/mo','AVAILABLE',5,'REPORTS',['KEYWORD: registration fee'],'2h'),
 L('l2','ACCOMMODATION','Self-contain, Lekki. Send deposit first to hold it','m25','Lagos','₦120,000/yr','AVAILABLE',4,'REPORTS',['KEYWORD: send deposit first'],'5h'),
 L('l3','JOB','Junior frontend developer, Kano Digital Hub','m4','Kano','₦150,000/mo','AVAILABLE',0,null,[],'2d'),
 L('l4','JOB','Weekend photographer for events, Lens & Co','m5','Lagos','₦25,000/event','AVAILABLE',0,null,[],'3d'),
 L('l5','ITEM','iPhone XR 128GB, like new','m16','Kano','₦210,000','AVAILABLE',2,null,[],'3d'),
 L('l6','ITEM','6-inch mattress','m4','Kano','₦15,000','AVAILABLE',0,null,[],'1d'),
 L('l7','ACCOMMODATION','Self-contain near Gwarzo Road','m4','Kano','₦180,000/yr','AVAILABLE',0,null,[],'2d'),
 L('l8','ACCOMMODATION','Room in 3-bedroom flat, Yaba','m24','Lagos','₦420,000/yr','AVAILABLE',1,null,['Fees not itemised'],'1d'),
 L('l9','JOB','Customer support agent (remote), Naija Fintech','m24','Lagos','₦120,000/mo','AVAILABLE',0,null,[],'1d'),
 L('l10','JOB','Delivery rider, Port Express','m20','Rivers','₦80,000/mo','AVAILABLE',0,'KEYWORD',['KEYWORD: training fee'],'4d'),
 L('l11','ITEM','Khaki, boots and vest set','m5','Lagos','₦8,000','SOLD',0,null,[],'1w'),
 L('l12','JOB','Graphic designer (filled)','m24','Lagos','₦100,000/mo','FILLED',0,null,[],'2w'),
 L('l13','ACCOMMODATION','Hostel bed space, Jos','m12','Plateau','₦20,000/mo','AVAILABLE',0,null,[],'2d'),
 L('l14','ITEM','Power bank 20,000mAh','m16','Kano','₦12,000','AVAILABLE',0,null,[],'2d')
];
const listing=id=>LISTINGS.find(l=>l.id===id);

// ---------- Events ----------
const EVENTS=[
 {id:'e1',title:'Batch B Kano meetup after swearing-in',org:'m1',state:'Kano',date:'Sat 21 Nov',going:67,interested:184,status:'UPCOMING',reports:0},
 {id:'e2',title:'Job fair for corps members',org:'m19',state:'FCT',date:'Sat 5 Dec',going:260,interested:910,status:'UPCOMING',reports:0},
 {id:'e3',title:'Naija Corpers football cup semi-finals',org:'m2',state:'Lagos',date:'Sun 29 Nov',going:140,interested:520,status:'UPCOMING',reports:0},
 {id:'e4',title:'Get rich seminar: pay ₦10,000 to attend',org:'m25',state:'Lagos',date:'Sat 28 Nov',going:12,interested:40,status:'UPCOMING',reports:4},
 {id:'e5',title:'Beach cleanup',org:'m24',state:'Lagos',date:'Sat 14 Nov',going:120,interested:330,status:'COMPLETED',reports:0},
 {id:'e6',title:'Corper marketplace fair',org:'m16',state:'Kano',date:'Sun 22 Nov',going:22,interested:90,status:'CANCELLED',reports:0}
];

// ---------- Announcements ----------
const ANNOUNCEMENTS=[
 {id:'n1',label:'OFFICIAL',scope:'Camp: Kano',body:'Platoon 7 takes the drill cup. Final rehearsal moves to 4:00pm at the parade ground.',by:'Chidi Musa',ago:'25m'},
 {id:'n2',label:'PLATFORM',scope:'Platform',body:'Reminder: no job that asks you to pay a fee is genuine. Report it and do not send money.',by:'Ada Eze',ago:'2d'},
 {id:'n3',label:'MODERATOR',scope:'Community: Batch B Football',body:'Match days are Tuesday and Friday after lectures.',by:'Ibrahim Bello (moderator)',ago:'3d'},
 {id:'n4',label:'OFFICIAL',scope:'State: Lagos',body:'Swearing-in ceremonies hold across all camps this Thursday. Check your camp community for times.',by:'Ada Eze',ago:'1d'}
];

// ---------- Camp schedules ----------
const CAMPS=['Kano Orientation Camp','Lagos Orientation Camp','Kaduna Orientation Camp','Oyo Orientation Camp','FCT Orientation Camp'];
const SCHEDULE={
 'Kano Orientation Camp':[['05:00','Morning drill','Parade ground',true],['08:00','Lectures','Hall B',true],['12:00','SAED session','Hall A',true],['16:00','Final rehearsal','Parade ground',true],['19:00','Mammy Market','Market square',false]],
 'Lagos Orientation Camp':[['05:30','Morning drill','Parade ground',true],['09:00','Skills lecture','Main hall',true],['15:00','Swearing-in rehearsal','Parade ground',true]],
 'Kaduna Orientation Camp':[['05:00','Morning drill','Parade ground',true],['16:00','Welfare desk open','Admin block',true]],
 'Oyo Orientation Camp':[],'FCT Orientation Camp':[]
};

// ---------- Support ----------
const TICKETS=[
 {id:'t1',who:'Funke Adebayo',email:'funke@example.com',topic:'VERIFICATION',msg:'I uploaded my ID but it still says pending after 2 days. Is something wrong?',age:44,status:'OPEN',replies:[]},
 {id:'t2',who:'Daniel Pam',email:'daniel@example.com',topic:'VERIFICATION',msg:'My verification was rejected. What was unclear in the photo?',age:30,status:'OPEN',replies:[]},
 {id:'t3',who:'Anonymous',email:'victim@example.com',topic:'SCAM_REPORT',msg:'A listing asked me to pay a registration fee for a customer care job. I paid ₦3,500 before I realised.',age:6,status:'OPEN',replies:[]},
 {id:'t4',who:'Kemi Balogun',email:'kemi@example.com',topic:'ACCOUNT',msg:'I cannot change my phone number. I get no code.',age:20,status:'IN_PROGRESS',replies:['Hi Kemi, we have asked our SMS provider to check this. We will update you today.']},
 {id:'t5',who:'Segun Ogunleye',email:'segun@example.com',topic:'OTHER',msg:'How do I move my account to Ogun after redeployment?',age:52,status:'RESOLVED',replies:['Go to Profile > Service information > Redeployment and upload your letter.']},
 {id:'t6',who:'Ahmed Suleiman',email:'ahmed@example.com',topic:'MODERATOR_APPLICATION',msg:'When will I hear about my moderator application?',age:8,status:'OPEN',replies:[]}
];

// ---------- Config ----------
const CONFIG=[
 ['Accounts and sessions','auth.otp_ttl','OTP lifetime',10,'minutes'],['Accounts and sessions','auth.otp_max_attempts','OTP attempts per code',5,'attempts'],['Accounts and sessions','auth.otp_resend_cooldown','OTP resend cooldown',60,'seconds'],['Accounts and sessions','account.deletion_grace_days','Deletion grace period',30,'days'],
 ['Verification','verification.id_image_retention_after_decision','ID image retention after decision',7,'days'],['Verification','verification.review_target_hours','Verification review target',48,'hours'],['Verification','verification.max_resubmissions','Max resubmissions before escalation',3,'times'],
 ['Content limits','post.body_max','Post length',2000,'characters'],['Content limits','media.video_max_duration','Video max duration',60,'seconds'],['Content limits','media.video_max_size','Video max size',50,'MB'],['Content limits','media.image_max_size','Image max size',10,'MB'],['Content limits','post.max_media','Media per post',8,'items'],
 ['Communities','community.create_limit_per_member','Communities a member can create',3,'communities'],['Communities','community.max_moderators','Moderators per community',5,'people'],['Communities','moderator.max_communities_per_person','Communities per moderator',3,'communities'],
 ['Listings and scams','listing.active_limit_new_account','Active listings, new account',2,'listings'],['Listings and scams','listing.active_limit_established','Active listings, established account',10,'listings'],['Listings and scams','listing.autohide_report_threshold','Auto-hide at this many reports',3,'reports'],['Listings and scams','listing.expiry_days.job','Job listing expiry',30,'days'],['Listings and scams','listing.expiry_days.accommodation','Accommodation listing expiry',45,'days'],['Listings and scams','listing.contact_reveal_per_hour','Contact reveals per member',20,'per hour'],
 ['Moderation','report.review_target_hours.high','High priority report target',24,'hours'],['Moderation','report.review_target_hours.normal','Normal report target',72,'hours'],['Moderation','appeal.target_days','Appeal response target',5,'days'],['Moderation','sanction.restrict_default_days','Default restriction length',3,'days'],['Moderation','sanction.suspend_default_days','Default suspension length',14,'days'],
 ['Rate limits','rate.posts_new_account','Posts per hour, new account',10,'per hour'],['Rate limits','rate.follows_new_account','Follows per day, new account',100,'per day'],['Rate limits','rate.reports','Reports per member',20,'per day'],
 ['Admin security','admin.session_idle_timeout','Admin idle timeout',30,'minutes'],['Admin security','admin.max_failed_logins','Failed logins before lock',5,'attempts'],['Admin security','admin.lockout_duration','Lock duration',15,'minutes']
].map(([group,key,label,value,unit])=>({group,key,label,value,unit}));
const FLAGS=[
 {key:'jobs_enabled',label:'Jobs category',desc:'Emergency switch for job listings if abused',on:true},
 {key:'video_upload_enabled',label:'Video uploads',desc:'Switch off if storage or abuse becomes an issue',on:true},
 {key:'signups_enabled',label:'New sign-ups',desc:'Pause sign-ups during an incident',on:true},
 {key:'push_enabled',label:'Push notifications',desc:'Global push switch',on:true},
 {key:'listing_keyword_block_enabled',label:'Scam keyword blocking',desc:'Block listings with blocked phrases at publish',on:true}
];
const FEEDMIX={cap_enabled:false,max_listings_events:40,max_jobs:10,no_back_to_back:true,alert_listings:45,alert_jobs:12};
const RISK=[
 ['registration fee','BLOCK'],['application fee','BLOCK'],['pay to apply','BLOCK'],['training fee','BLOCK'],['pay for the job','FLAG'],['send deposit first','FLAG'],['advance fee','FLAG'],['western union','FLAG'],['gift card','FLAG'],['send money to secure','FLAG'],['pay before inspection','FLAG']
].map(([phrase,action])=>({phrase,action,active:true}));
const RESERVED=['*nysc official*','*official nysc*','batch * official','official * camp','*platform admin*','corpers connect *'];
const PAGES=[['terms','Terms of Service','v1.2','Today'],['privacy','Privacy Notice','v1.1','5 days ago'],['guidelines','Community guidelines','v1.0','2 weeks ago'],['safety','Safety tips','v1.3','3 days ago'],['about','About','v1.0','1 month ago']];
const FAQ_COUNT=10;
const REF={states:37,lgas:774,camps:CAMPS.length+31,batches:6};

// ---------- Analytics ----------
const SIGNUPS=[820,910,870,1020,1180,1240,1100,980,1320,1410,1380,1260,1500,1620];
const DAU=[9200,9600,9400,10100,11200,11800,11000,10400,12100,12900,12600,12000,13400,14100];
const RETENTION=[['Batch B 2026',72,48,34],['Batch A 2026',68,44,31],['Batch C 2025',60,38,29],['Awaiting deployment',55,30,18]];
const LIST_BY_KIND=[['Jobs',128],['Items',342],['Accommodation',214],['Events',96]];
const MIX=[['Social posts',66,'#C8F169'],['Items',9,'#FFD66B'],['Accommodation',8,'#FF8A3D'],['Jobs',7,'#8FB3FF'],['Events',6,'#F7B2D9'],['Announcements',4,'#B8E1C5']];
const MIX7=[['Social posts',68],['Items',8],['Accommodation',8],['Jobs',6],['Events',6],['Announcements',4]];
const MOD_STATS=[['Reports this week',184],['Median time to first review','9 h'],['High priority within 24 h','96%'],['Auto-hidden listings',23],['Confirmed scams',11],['Appeals overturned','14%']];

// ---------- Audit ----------
const AUDIT=[
 ['Today 09:12','Ada Eze','ADMIN','LOGIN_SUCCESS','Admin session','—'],
 ['Today 08:55','Tunde Bello','ADMIN','POST_REMOVED','Post p3 in Tech Corpers','Scam promo'],
 ['Today 08:40','Ngozi Obi','ADMIN','ID_IMAGE_VIEWED','Submission v13','Review'],
 ['Today 08:41','Ngozi Obi','ADMIN','VERIFICATION_APPROVED','Amaka Okafor','Card matches profile'],
 ['Yesterday','Chidi Musa','ADMIN','LISTING_HIDDEN','Listing l1','Auto-hide confirmed'],
 ['Yesterday','Chidi Musa','ADMIN','ACCOUNT_SUSPENDED','Quick Cash Hub','Confirmed pay-to-apply scam'],
 ['Yesterday','Ibrahim Bello','MEMBER','POST_REMOVED','Post in Kano Orientation Camp','Off-topic selling (moderator)'],
 ['Yesterday','Ada Eze','ADMIN','CONFIG_CHANGED','listing.autohide_report_threshold 4 → 3','Tighten after scam wave'],
 ['2 days ago','Ada Eze','ADMIN','ROLE_CREATED','STAFF_MODERATOR','New day-to-day role'],
 ['2 days ago','Halima Sani','ADMIN','SUPPORT_REPLY','Ticket t4','Replied'],
 ['3 days ago','Ngozi Obi','ADMIN','VERIFICATION_REJECTED','Daniel Pam','Card photo unreadable'],
 ['3 days ago','Chidi Musa','ADMIN','MODERATOR_APPOINTED','Victor Obi → Job Leads Nationwide','Approved application'],
 ['4 days ago','System','SYSTEM','ID_IMAGES_DELETED','12 images','Retention job (7 days)'],
 ['4 days ago','Emeka Ola','ADMIN','AUDIT_EXPORTED','Last 30 days','Quarterly review']
].map(([when,actor,type,action,target,reason])=>({when,actor,type,action,target,reason}));
