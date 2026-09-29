const courses = [
  {id:"web",title:"Modern Web Development",description:"Build responsive websites using HTML, CSS and JavaScript from the ground up.",duration:"6 weeks",level:"Beginner",lessons:["HTML & Semantic Structure","CSS Flexbox & Grid","Responsive Design","JavaScript Fundamentals","DOM & Events","Mini Project"]},
  {id:"python",title:"Python for Beginners",description:"Learn Python syntax, problem solving, collections and practical programming skills.",duration:"5 weeks",level:"Beginner",lessons:["Python Setup & Syntax","Variables & Data Types","Conditions & Loops","Lists & Dictionaries","Functions","Mini Project"]},
  {id:"java",title:"Java & Spring MVC",description:"Understand Java web development and create MVC-style applications with Spring.",duration:"8 weeks",level:"Intermediate",lessons:["Java Essentials","OOP Concepts","JDBC Basics","Spring MVC Concepts","Controllers & Views","Database Integration"]},
  {id:"sql",title:"SQL & Database Basics",description:"Learn relational databases, queries, joins, grouping and data management.",duration:"4 weeks",level:"Beginner",lessons:["Database Concepts","SELECT Queries","Filtering & Sorting","Joins","GROUP BY & Aggregates","Mini Database Project"]},
  {id:"ui",title:"UI/UX Design Fundamentals",description:"Learn visual hierarchy, wireframes, user flows and practical interface design.",duration:"4 weeks",level:"Beginner",lessons:["Design Principles","Color & Typography","User Flows","Wireframing","Prototyping","Case Study"]},
  {id:"react",title:"React Essentials",description:"Build interactive front-end interfaces using components, state and modern React.",duration:"6 weeks",level:"Intermediate",lessons:["React Setup","JSX & Components","Props","State & Events","Routing","Final Project"]}
];

const state = {
  enrolled: JSON.parse(localStorage.getItem("ls_enrolled") || "[]"),
  progress: JSON.parse(localStorage.getItem("ls_progress") || "{}"),
  user: JSON.parse(localStorage.getItem("ls_user") || "null")
};

function save(){localStorage.setItem("ls_enrolled",JSON.stringify(state.enrolled));localStorage.setItem("ls_progress",JSON.stringify(state.progress));localStorage.setItem("ls_user",JSON.stringify(state.user));}
function getCourse(id){return courses.find(c=>c.id===id)}
function pct(id){const c=getCourse(id);const done=(state.progress[id]||[]).length;return Math.round(done/c.lessons.length*100)}
function toast(msg){const el=document.createElement("div");el.className="toast";el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2200)}
function courseCard(c){
  const enrolled=state.enrolled.includes(c.id);
  return `<article class="course-card">
    <div class="course-cover ${c.id}">${c.title}</div>
    <div class="course-body"><span class="pill">${c.level}</span><h3>${c.title}</h3><p>${c.description}</p>
    <div class="meta"><span>⏱ ${c.duration}</span><span>📚 ${c.lessons.length} lessons</span></div>
    <div class="card-actions">
      <button class="btn btn-outline" onclick="showDetail('${c.id}')">View Details</button>
      ${enrolled?`<button class="btn btn-success" onclick="goDashboard()">Enrolled</button>`:`<button class="btn btn-primary" onclick="enroll('${c.id}')">Enroll</button>`}
    </div></div></article>`;
}

function home(){
 return `<section class="hero"><div class="container hero-grid">
   <div><div class="eyebrow">Learn without limits</div><h1>Build skills.<br><span>Shape your future.</span></h1>
   <p>A clean, interactive mini learning platform where you can discover courses, enroll, complete lessons and track your progress.</p>
   <div class="hero-actions"><button class="btn btn-primary" onclick="showPage('courses')">Explore Courses</button><button class="btn btn-outline" onclick="goDashboard()">My Learning</button></div></div>
   <div class="hero-card"><div class="mini"><div class="icon">🎓</div><div><strong>Practical Courses</strong><p class="muted">Short lessons with clear goals</p></div></div>
   <div class="mini"><div class="icon">📈</div><div><strong>Track Progress</strong><p class="muted">See your completion percentage</p></div></div>
   <div class="mini"><div class="icon">🏆</div><div><strong>Complete & Celebrate</strong><p class="muted">Unlock a completion certificate</p></div></div></div>
 </div></section>
 <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Start learning</div><h2>Featured Courses</h2></div><button class="btn btn-outline" onclick="showPage('courses')">View all</button></div>
 <div class="grid">${courses.slice(0,3).map(courseCard).join("")}</div></div></section>`;
}

function coursesPage(){
 return `<section class="container page-head"><div class="eyebrow">Course library</div><h1>Explore Courses</h1><p class="muted">Choose a course and start building your next skill.</p></section>
 <section class="container" style="padding-bottom:70px"><div class="grid">${courses.map(courseCard).join("")}</div></section>`;
}

function detail(id){
 const c=getCourse(id), enrolled=state.enrolled.includes(id);
 return `<section class="container course-detail"><div class="detail-grid">
   <div class="detail-main"><span class="pill">${c.level}</span><h1>${c.title}</h1><p class="muted">${c.description}</p>
   <div class="meta" style="max-width:400px"><span>⏱ ${c.duration}</span><span>📚 ${c.lessons.length} lessons</span></div>
   <h2 style="margin:28px 0 12px">What you'll learn</h2><ul class="feature-list">${c.lessons.map(x=>`<li>${x}</li>`).join("")}</ul>
   </div>
   <aside class="side-card"><div class="eyebrow">Your learning plan</div><div class="price">Free</div><p class="muted">Self-paced learning with saved progress.</p>
   ${enrolled?`<button class="btn btn-success" style="width:100%;margin-top:15px" onclick="goDashboard()">Continue Course</button>`:`<button class="btn btn-primary" style="width:100%;margin-top:15px" onclick="enroll('${id}')">Enroll Now</button>`}
   </aside></div></section>`;
}

function dashboard(){
 if(!state.enrolled.length) return `<section class="container dashboard"><div class="page-head"><div class="eyebrow">Your learning</div><h1>My Courses</h1></div><div class="empty"><h3>No courses yet</h3><p class="muted">Enroll in a course to see it here and start tracking your progress.</p><button class="btn btn-primary" style="margin-top:16px" onclick="showPage('courses')">Browse Courses</button></div></section>`;
 return `<section class="container dashboard"><div class="page-head"><div class="eyebrow">Your learning</div><h1>My Courses</h1><p class="muted">Complete lessons and watch your progress grow.</p></div>
 ${state.enrolled.map(id=>{const c=getCourse(id), p=pct(id), done=state.progress[id]||[];return `<div class="dash-card">
 <div class="dash-top"><div><h3>${c.title}</h3><p class="muted">${c.duration} · ${c.lessons.length} lessons</p></div><div class="percent">${p}% complete</div></div>
 <div class="progress-wrap" style="margin-top:16px"><div class="progress-bar" style="width:${p}%"></div></div>
 <div class="lesson-list">${c.lessons.map((l,i)=>`<label class="lesson"><input type="checkbox" ${done.includes(i)?"checked":""} onchange="toggleLesson('${id}',${i},this.checked)"> <span>${l}</span></label>`).join("")}</div>
 ${p===100?`<div class="certificate">🏆 Course completed! <button class="btn btn-success" style="float:right;padding:7px 12px" onclick="certificate('${id}')">Get Certificate</button></div>`:""}
 </div>`}).join("")}</section>`;
}

function showPage(page){
 document.getElementById("app").innerHTML=page==="home"?home():page==="courses"?coursesPage():dashboard();
 window.scrollTo({top:0,behavior:"smooth"});
}
function showDetail(id){document.getElementById("app").innerHTML=detail(id);window.scrollTo({top:0,behavior:"smooth"})}
function enroll(id){
 if(!state.user){openAuth("login");return}
 if(!state.enrolled.includes(id)){state.enrolled.push(id);state.progress[id]=[];save();toast("Course added to My Courses");showDetail(id)}
}
function toggleLesson(id,i,checked){
 const list=state.progress[id]||[];
 if(checked&&!list.includes(i))list.push(i);
 if(!checked){const x=list.indexOf(i);if(x>-1)list.splice(x,1)}
 state.progress[id]=list.sort((a,b)=>a-b);save();showPage("dashboard");
}
function goDashboard(){showPage("dashboard")}
function certificate(id){
 const c=getCourse(id), name=state.user?.name||"Learner";
 const win=window.open("","_blank");
 win.document.write(`<html><head><title>Certificate - ${c.title}</title><style>body{font-family:Georgia,serif;display:grid;place-items:center;min-height:100vh;background:#f4f1ff}.cert{background:white;border:12px solid #5b5bd6;padding:70px;text-align:center;width:850px;box-shadow:0 20px 50px #0002}.small{color:#5b5bd6;letter-spacing:3px}.name{font-size:42px;margin:25px}.course{font-size:27px;font-weight:bold}</style></head><body><div class="cert"><div class="small">LEARNSPHERE</div><h1>Certificate of Completion</h1><p>This certificate is proudly presented to</p><div class="name">${name}</div><p>for successfully completing</p><div class="course">${c.title}</div><p style="margin-top:35px">Issued: ${new Date().toLocaleDateString()}</p><button onclick="print()" style="margin-top:25px;padding:10px 20px">Print Certificate</button></div></body></html>`);
 win.document.close();
}
function openAuth(mode="login"){
 document.getElementById("modalContent").innerHTML=`<h2>${mode==="login"?"Welcome back":"Create your account"}</h2><p class="muted">${mode==="login"?"Login to enroll and save progress.":"Create a mock learner account for this demo."}</p>
 <div class="form-group"><label>Name</label><input id="authName" placeholder="Your name"></div>
 <div class="form-group"><label>Email</label><input id="authEmail" type="email" placeholder="you@example.com"></div>
 <div class="form-group"><label>Password</label><input id="authPass" type="password" placeholder="••••••••"></div>
 <button class="btn btn-primary" style="width:100%" onclick="submitAuth()">${mode==="login"?"Login":"Sign Up"}</button>
 <p style="text-align:center;margin-top:16px"><button class="btn btn-outline" onclick="openAuth('${mode==="login"?"signup":"login"}')">${mode==="login"?"Create account":"Back to login"}</button></p>`;
 document.getElementById("modal").classList.remove("hidden");
 window.authMode=mode;
}
function submitAuth(){
 const name=document.getElementById("authName").value.trim(), email=document.getElementById("authEmail").value.trim();
 if(!name||!email||!document.getElementById("authPass").value){toast("Please fill all fields");return}
 state.user={name,email};save();closeModal();updateHeader();toast("Welcome, "+name+"!");showPage("home");
}
function logout(){state.user=null;save();updateHeader();showPage("home");toast("Logged out")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function updateHeader(){
 const badge=document.getElementById("userBadge"), btn=document.getElementById("authBtn");
 badge.textContent=state.user?`Hi, ${state.user.name}`:"Guest";
 btn.textContent=state.user?"Logout":"Login";
 btn.onclick=state.user?logout:()=>openAuth("login");
}
document.addEventListener("click",e=>{const p=e.target.dataset.page;if(p){e.preventDefault();showPage(p)}});
document.getElementById("modalClose").onclick=closeModal;
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
updateHeader();showPage("home");
