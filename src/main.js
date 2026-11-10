import { gsap } from "gsap";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const supabase = supabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;
let currentSession = null;
let authBusy = false;
let authReady = !supabase;
let authEventSeen = false;


const categories = [
 {id:"finance",name:"Finance",desc:"Bring clarity to everyday money decisions.",icon:"◒",tools:[["expenses","Expense tracker","Record daily spending and review where your money goes."],["budget","Budget planner","Set monthly limits and monitor planned versus actual spending."],["bills","Bill tracker","Keep due dates and payment status in one place."],["savings","Savings goals","Track progress towards the things you are saving for."],["calculators","Financial calculators","Quick percentage, discount, GST, EMI and interest calculations."]]},
 {id:"mobility",name:"Mobility",desc:"Understand the cost of every journey.",icon:"↗",tools:[["petrol-calculator","Petrol cost calculator","Estimate fuel required and the cost of a journey."],["mileage","Mileage calculator","Calculate real-world vehicle mileage from fuel records."],["logbook","Vehicle logbook","Keep odometer, travel and fuel records."],["expenses","Vehicle expenses","Track fuel, servicing, insurance and repairs."],["maintenance","Maintenance reminders","Keep service and document renewal dates visible."]]},
 {id:"shopping",name:"Shopping",desc:"Make considered purchases and keep the details.",icon:"◇",tools:[["wishlist","Wishlist","Save products, prices and purchase priorities."],["compare","Price comparison","Compare product options and value side by side."],["purchases","Purchase tracker","Keep a record of what you have bought."],["returns","Returns & warranties","Keep return windows and warranty dates in view."],["list","Shopping list","Build practical lists with quantities and estimates."]]},
 {id:"home",name:"Home",desc:"A considered record of the things you look after.",icon:"⌂",tools:[["inventory","Home inventory","Keep household items and purchase details organised."],["maintenance","Maintenance tracker","Record repairs, service history and upcoming work."],["warranties","Warranty manager","Keep product warranty information together."],["expenses","Household expenses","Track recurring household costs."],["checklist","Home checklist","Organise daily, weekly and monthly responsibilities."]]},
 {id:"productivity",name:"Productivity",desc:"Give your intentions a practical place to live.",icon:"▦",tools:[["habits","Habit tracker","Build consistency with simple daily check-ins."],["goals","Goal manager","Set clear outcomes, dates and progress."],["journal","Daily journal","Keep dated notes and reflections."],["tasks","Task manager","Capture priorities, deadlines and next actions."],["planner","Weekly planner","Plan the week and review what got done."]]},
 {id:"digital",name:"Digital utilities",desc:"Small digital jobs, handled without friction.",icon:"▤",tools:[["pdf","PDF utilities","A dedicated place for everyday PDF actions."],["images","Image utilities","Resize, compress and convert image files."],["qr-generator","QR code generator","Create a QR code from text or a web address."],["files","File utilities","Inspect file size and format information."],["text","Text utilities","Count, clean and transform text."]]},
 {id:"travel",name:"Travel",desc:"Keep the moving parts of a trip together.",icon:"⌁",tools:[["planner","Trip planner","Organise destinations, dates and itinerary notes."],["budget","Travel budget","Plan costs across transport, stay, food and activities."],["packing","Packing checklist","Prepare essentials and track what is packed."],["expenses","Travel expenses","Record trip spending as it happens."],["information","Travel information","Keep booking references and important details."]]},
 {id:"work",name:"Work",desc:"A clear workspace for independent work and clients.",icon:"▧",tools:[["clients","Client manager","Keep client details and project context together."],["invoices","Invoice generator","Prepare professional invoices and export them."],["projects","Project tracker","Track deadlines, status and delivery progress."],["expenses","Work expenses","Record subscriptions, hosting and operating costs."],["income","Freelance income","Track received and pending client payments."]]}
];
const $ = s => document.querySelector(s);
const app = $("#app");
const get = (k,d=[]) => {try{return JSON.parse(localStorage.getItem("atelier_"+k)) ?? d}catch{return d}};
const set = (k,v) => localStorage.setItem("atelier_"+k,JSON.stringify(v));
const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(Number(n)||0);
const route = () => (location.hash.startsWith("#/") ? location.hash.slice(1).replace(/\/+$/, "") || "/" : "/");
const go = p => {const target = p.startsWith("#/") ? p : `#${p.startsWith("/") ? p : "/"+p}`; if(location.hash!==target) location.hash=target; else render()};
window.addEventListener("hashchange",render);
function toast(t){let el=document.createElement("div");el.className="toast";el.textContent=t;document.body.append(el);setTimeout(()=>el.remove(),2400)}
function brand(){return `<div class="brand"><span class="brandmark">A</span><span>ATELIER / EVERYDAY</span></div>`}
function landing(){return `<div class="clay-site">
<header class="clay-nav"><a class="clay-brand" href="#top" aria-label="Atelier home"><span class="clay-brandmark">A</span><span>ATELIER / EVERYDAY</span></a><nav class="clay-navlinks"><a href="#categories">The workspace</a><a href="#approach">Our approach</a><a href="/auth" data-link>Sign in</a><a class="clay-btn clay-btn-dark clay-nav-cta" href="/auth" data-link>Get started <span>↗</span></a></nav><button class="clay-menu" aria-label="Open navigation" data-clay-menu>☰</button></header>
<main id="top">
<section class="clay-hero"><div class="clay-hero-copy"><div class="clay-eyebrow"><span></span> A MORE CONSIDERED EVERYDAY</div><h1>Make room for<br><em>what matters.</em></h1><p>One connected place for the little things that keep life moving — money, plans, home, purchases, work and everything in between.</p><div class="clay-hero-actions"><a class="clay-btn clay-btn-dark" href="/auth" data-link>Create your workspace <span>↗</span></a><a class="clay-btn clay-btn-light" href="#categories">Explore the system <span>→</span></a></div><div class="clay-proof"><span>✳ Eight everyday categories</span><span>✳ 40+ practical tools</span><span>✳ One private space</span></div></div>
<div class="clay-hero-art" aria-label="Preview of the Atelier workspace"><div class="clay-art-orbit orbit-a"></div><div class="clay-art-orbit orbit-b"></div><div class="clay-sculpture sculpture-main"><div class="sculpture-shine"></div><div class="sculpture-face">A</div></div><div class="clay-sculpture sculpture-small"><div class="sculpture-shine"></div></div><div class="clay-float-note note-one"><span class="clay-note-icon pink-icon">↗</span><span><b>Money, in view</b><small>Spend with clarity</small></span></div><div class="clay-float-note note-two"><span class="clay-note-icon mint-icon">✳</span><span><b>Room to focus</b><small>One thing at a time</small></span></div><div class="clay-preview-window"><div class="clay-preview-top"><span class="clay-brandmark mini">A</span><b>ATELIER / EVERYDAY</b><span>WORKSPACE / 01</span></div><div class="clay-preview-greeting">A little more order.</div><div class="clay-preview-sub">Your everyday, gathered in one place.</div><div class="clay-preview-tiles"><div class="mini-tile tile-pink"><small>01 / FINANCE</small><b>Money<br>made clearer.</b><span>↗</span></div><div class="mini-tile tile-teal"><small>02 / MOBILITY</small><b>Every journey,<br>accounted for.</b><span>↗</span></div><div class="mini-tile tile-lavender"><small>03 / HOME</small><b>Keep life<br>in good order.</b><span>↗</span></div><div class="mini-tile tile-peach"><small>04 / PLANNING</small><b>Make space<br>for your plans.</b><span>↗</span></div></div></div></div></section>
<section class="clay-marquee" aria-label="Atelier categories"><div>FINANCE <i>✳</i> MOBILITY <i>✳</i> SHOPPING <i>✳</i> HOME <i>✳</i> PRODUCTIVITY <i>✳</i> DIGITAL <i>✳</i> TRAVEL <i>✳</i> WORK <i>✳</i></div></section>
<section class="clay-section clay-category-section" id="categories"><div class="clay-section-heading"><div><div class="clay-eyebrow"><span></span> THE ATELIER WORKSPACE</div><h2>Every part of life.<br><em>One thoughtful system.</em></h2></div><p>Eight focused areas, each with practical tools designed to make everyday decisions feel a little lighter.</p></div><div class="clay-category-grid">${categories.map((c,i)=>{const palette=['tile-pink','tile-teal','tile-lavender','tile-peach','tile-ochre','tile-mint','tile-coral','tile-cream'];return `<a class="clay-category-card ${palette[i]}" href="/auth" data-link><div class="clay-card-top"><span>${c.icon}</span><small>0${i+1} / 08</small></div><h3>${c.name}</h3><p>${c.desc}</p><div class="clay-card-bottom"><span>${c.tools.length} dedicated tools</span><b>↗</b></div><div class="clay-card-art art-${i+1}"><i></i><i></i><i></i></div></a>`}).join('')}</div></section>
<section class="clay-how-system" id="approach">
<div class="clay-how-heading"><div><div class="clay-eyebrow"><span></span> HOW ATELIER WORKS</div><h2>Thoughtfully organised.<br><em>Effortlessly yours.</em></h2></div><p>One considered system for the details of everyday life. Start with one useful task, then let your workspace grow around you.</p></div>
<div class="clay-how-layout">
  <div class="clay-how-steps">
    <article><span class="how-step-no">01</span><div><h3>Bring it together</h3><p>Keep money, plans, purchases and everyday records in one private space.</p></div><i class="how-step-mark mark-pink">＋</i></article>
    <article><span class="how-step-no">02</span><div><h3>Go straight to what you need</h3><p>Eight clear areas make every tool easy to find, understand and use.</p></div><i class="how-step-mark mark-lavender">↗</i></article>
    <article><span class="how-step-no">03</span><div><h3>Keep your own rhythm</h3><p>Save the details that matter and return whenever life moves forward.</p></div><i class="how-step-mark mark-mint">✳</i></article>
  </div>
  <div class="clay-system-preview" aria-label="Atelier workspace structure preview">
    <div class="system-preview-head"><span class="clay-brandmark mini">A</span><b>YOUR ATELIER</b><small>PERSONAL SYSTEM / 01</small></div>
    <div class="system-preview-title">A place for every detail<span>Eight areas. One clear view.</span></div>
    <div class="system-preview-list">
      <div><i class="system-dot dot-pink"></i><span><b>Finance</b><small>Spend, plan and save with clarity</small></span><em>01</em></div>
      <div><i class="system-dot dot-teal"></i><span><b>Mobility</b><small>Understand every journey</small></span><em>02</em></div>
      <div><i class="system-dot dot-lavender"></i><span><b>Home & everyday</b><small>Keep the important details close</small></span><em>03</em></div>
      <div><i class="system-dot dot-peach"></i><span><b>Work & plans</b><small>Make progress feel manageable</small></span><em>04</em></div>
    </div>
    <div class="system-preview-foot"><span>PRIVATE BY DESIGN</span><span>MADE FOR EVERYDAY LIFE ↗</span></div>
  </div>
</div>
</section>
<section class="clay-cta"><div class="clay-cta-art"><div class="cta-orb orb-pink"></div><div class="cta-orb orb-teal"></div><div class="cta-orb orb-gold"></div></div><div class="clay-eyebrow"><span></span> YOUR EVERYDAY, GATHERED</div><h2>Make room for<br><em>what matters.</em></h2><p>Bring the details together. Give your everyday a little more room.</p><a class="clay-btn clay-btn-white" href="/auth" data-link>Create your workspace <span>↗</span></a></section>
</main><footer class="clay-footer"><a class="clay-brand" href="#top"><span class="clay-brandmark">A</span><span>ATELIER / EVERYDAY</span></a><p>A thoughtful home for everyday tools.</p><div><a href="#categories">The workspace</a><a href="#approach">Our approach</a><a href="/auth" data-link>Sign in</a></div><small>© 2026 ATELIER / EVERYDAY · MADE FOR EVERYDAY LIFE</small></footer></div>`}
function auth(){return `<div class="auth-screen"><div class="auth-ambient auth-ambient-one"></div><div class="auth-ambient auth-ambient-two"></div><aside class="auth-visual"><div class="auth-visual-top">${brand()}<span class="auth-edition">PERSONAL SYSTEM / 01</span></div><div class="auth-visual-copy"><div class="auth-kicker"><span></span> TRACK WHAT MATTERS</div><h1 class="serif auth-hero-title">Welcome<br><em>back.</em></h1><p>Your everyday tools, plans, habits and progress — all in one considered space.</p><div class="auth-orbit-art auth-sculpture" aria-hidden="true"><div class="sculpture-halo halo-one"></div><div class="sculpture-halo halo-two"></div><div class="sculpture-ring ring-one"></div><div class="sculpture-ring ring-two"></div><div class="sculpture-orb"><div class="orb-gloss"></div><div class="orb-shadow"></div><span>A</span></div><i class="sculpture-spark spark-one"></i><i class="sculpture-spark spark-two"></i><i class="sculpture-spark spark-three"></i></div></div><div class="auth-visual-foot"><span>ATELIER</span><span>DESIGNED FOR EVERYDAY LIFE</span><span>EST. 2026</span></div></aside><main class="auth-panel"><div class="auth-panel-top"><a href="/" data-link class="auth-back">← <span>Back to home</span></a></div><section class="auth-card"><div class="auth-mobile-brand">${brand()}</div><div class="eyebrow auth-welcome">WELCOME TO ATELIER</div><h2 class="serif" id="authTitle">Welcome back.</h2><p class="auth-intro muted" id="authSub">Sign in to continue to your space.</p><div class="auth-switch" role="tablist"><button class="auth-switch-btn active" data-auth="login" role="tab" aria-selected="true">Sign in</button><button class="auth-switch-btn" data-auth="signup" role="tab" aria-selected="false">Create account</button><span class="auth-switch-indicator"></span></div><button class="google-btn" type="button" id="googleSignIn"><span class="google-mark" aria-hidden="true">G</span><span>Continue with Google</span><span class="google-arrow">↗</span></button><div class="auth-divider"><span>OR CONTINUE WITH EMAIL</span></div><form id="authForm" novalidate><div id="nameField" class="field auth-field" hidden><label for="authName">FULL NAME</label><input id="authName" name="name" placeholder="Your name" autocomplete="name"></div><div class="field auth-field"><label for="authEmail">EMAIL ADDRESS</label><input id="authEmail" name="email" type="email" required placeholder="name@example.com" autocomplete="email"></div><div class="field auth-field"><div class="auth-label-row"><label for="authPassword">PASSWORD</label><span class="auth-hint" id="passwordHint">Your account password</span></div><input id="authPassword" name="password" type="password" required minlength="6" placeholder="Enter your password" autocomplete="current-password"></div><div id="confirmField" class="field auth-field" hidden><label for="authConfirm">CONFIRM PASSWORD</label><input id="authConfirm" name="confirm" type="password" minlength="6" placeholder="Re-enter your password" autocomplete="new-password"></div><button class="btn full auth-submit" type="submit" id="authSubmit"><span>Sign in</span><span>↗</span></button></form><p class="auth-feedback" id="authFeedback" role="status" aria-live="polite" hidden></p><p class="auth-legal" id="authNotice">${supabaseConfigured ? "Secure sign-in, powered by Supabase." : "Connect your Supabase project to enable secure sign-in."}</p><div class="auth-card-foot"><span>PRIVATE BY DESIGN</span><span>•</span><span>YOUR SPACE, YOUR PACE</span></div></section></main></div>`}
function shell(content,active=""){return `<div class="app-shell"><aside class="sidebar" id="sidebar">${brand()}<div class="side-label">Workspace</div><a class="side-link ${active==="/dashboard"?"active":""}" href="/dashboard" data-link><span class="sicon">⌂</span>Overview</a>${categories.map(c=>`<a class="side-link ${active.startsWith("/"+c.id)?"active":""}" href="/${c.id}" data-link><span class="sicon">${c.icon}</span>${c.name}</a>`).join("")}<div class="side-label">Personal</div><a class="side-link" href="/favourites" data-link><span class="sicon">☆</span>Favourites</a><a class="side-link" href="/recent" data-link><span class="sicon">◷</span>Recently used</a><div class="side-bottom"><a class="side-link" href="/settings" data-link><span class="sicon">⚙</span>Settings</a><a class="side-link" href="/" id="logout"><span class="sicon">↪</span>Sign out</a></div></aside><main class="main"><header class="app-top"><div style="display:flex;align-items:center;gap:12px"><button class="iconbtn mobile-menu" id="menu">☰</button><span class="crumb">ATELIER <span style="color:#b2a88f">/</span> ${active.replace("/","").replaceAll("-"," ").toUpperCase()||"WORKSPACE"}</span></div><div class="top-actions"><div class="search-wrap"><span class="search-leading" aria-hidden="true">⌕</span><input class="searchbox" id="globalSearch" type="search" placeholder="Find a utility…" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="searchSuggestions"><div class="search-suggestions" id="searchSuggestions" role="listbox" aria-label="Matching Atelier tools" hidden></div></div><button class="theme-toggle compact" data-theme-toggle aria-label="Toggle colour theme" title="Toggle light and dark mode"><span class="theme-glyph">◐</span></button><a class="profile-button" href="/settings" data-link aria-label="Open profile settings"><span class="profile-button-icon">◎</span><span>Profile</span></a></div></header><div class="content">${content}</div></main></div>`}
function categoryPage(c){return `<div class="page-head"><div><div class="eyebrow">Workspace / ${c.id}</div><h1 class="serif">${c.name}</h1><p>${c.desc}</p></div><span class="eyebrow">${c.tools.length} dedicated workspaces</span></div><div class="tool-grid">${c.tools.map(t=>`<a class="tool-card" href="/${c.id}/${t[0]}" data-link><span class="tiny-icon">${c.icon}</span><b>${t[1]}</b><small>${t[2]}</small><em>Open workspace ↗</em></a>`).join("")}</div>`}
function dashboard(){let fav=get("favs",[]), recent=get("recent",[]);return `<div class="page-head"><div><div class="eyebrow">Friday, 30 October 2026 · Your overview</div><h1 class="serif">Good to have you here, ${(get("user",{name:"there"}).name||"there").split(" ")[0]}.</h1><p>Your everyday tools, in one considered space.</p></div><a class="btn" href="/finance/expenses" data-link>＋ Add an expense</a></div><div class="stat-grid"><div class="stat"><span>MONTHLY EXPENSES</span><b>${money(get("expenses",[]).filter(x=>x.month===new Date().toISOString().slice(0,7)).reduce((s,x)=>s+Number(x.amount),0))}</b></div><div class="stat"><span>ACTIVE TASKS</span><b>${get("tasks",[]).filter(x=>!x.done).length}</b></div><div class="stat"><span>HABITS TODAY</span><b>${get("habits",[]).filter(x=>x.done).length} / ${get("habits",[]).length}</b></div><div class="stat"><span>SAVED WISHLIST ITEMS</span><b>${get("wishlist",[]).length}</b></div></div><div class="panel workspace-panel"><div class="panel-head workspace-panel-head"><h3>Your workspace</h3><span class="muted" style="font-size:11px">Eight areas · One system</span></div><div class="category-grid">${categories.map(c=>`<a class="category-card" href="/${c.id}" data-link style="min-height:160px"><span class="category-icon">${c.icon}</span><h3>${c.name}</h3><p>${c.desc}</p><div class="card-bottom"><span>${c.tools.length} tools</span><span>Open ↗</span></div></a>`).join("")}</div></div><div class="panel recent-panel"><div class="panel-head recent-panel-head"><h3>Recently used</h3><a class="muted" href="/recent" data-link>View all <span aria-hidden="true">→</span></a></div>${recent.length?`<div class="recent-list">${recent.slice(0,5).map((x,i)=>`<a class="recent-row" href="${x.path}" data-link><span class="recent-index">0${i+1}</span><span class="recent-main"><strong>${x.name}</strong><small>${x.category}</small></span><span class="recent-arrow" aria-hidden="true">↗</span></a>`).join("")}</div>`:`<div class="empty">Your recently opened tools will appear here.</div>`}</div>`}
function addExpense(){let rows=get("expenses",[]);return `<div class="page-head"><div><div class="eyebrow">Finance / Daily records</div><h1 class="serif">Expense tracker</h1><p>Keep a clear record of everyday spending.</p></div></div><div class="panel"><h3 style="margin-bottom:15px">Add an expense</h3><form id="expenseForm" class="inline-form"><input name="title" placeholder="What was it for?" required><input name="amount" type="number" min="0.01" step=".01" placeholder="Amount (₹)" required><select name="category"><option>Food</option><option>Travel</option><option>Shopping</option><option>Home</option><option>Bills</option><option>Other</option></select><input name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required><button class="btn small">Add record</button></form></div><div class="stat-grid"><div class="stat"><span>ALL RECORDED</span><b>${money(rows.reduce((s,x)=>s+Number(x.amount),0))}</b></div><div class="stat"><span>ENTRIES</span><b>${rows.length}</b></div><div class="stat"><span>THIS MONTH</span><b>${money(rows.filter(x=>x.month===new Date().toISOString().slice(0,7)).reduce((s,x)=>s+Number(x.amount),0))}</b></div><div class="stat"><span>AVERAGE ENTRY</span><b>${money(rows.length?rows.reduce((s,x)=>s+Number(x.amount),0)/rows.length:0)}</b></div></div><div class="panel"><div class="panel-head"><h3>Expense history</h3><button class="btn secondary small" id="exportExpenses">Export CSV ↓</button></div>${rows.length?`<table class="table"><thead><tr><th>Details</th><th>Category</th><th>Date</th><th>Amount</th><th></th></tr></thead><tbody>${rows.slice().reverse().map(x=>`<tr><td>${esc(x.title)}</td><td>${x.category}</td><td>${x.date}</td><td>${money(x.amount)}</td><td><button class="iconbtn delete-exp" data-id="${x.id}">×</button></td></tr>`).join("")}</tbody></table>`:`<div class="empty">No expenses recorded yet. Add your first entry above.</div>`}</div>`}
function petrol(){return `<div class="page-head"><div><div class="eyebrow">Mobility / Journey planning</div><h1 class="serif">Petrol cost calculator</h1><p>Estimate fuel required and the cost of your next journey.</p></div></div><div class="calc-grid"><div class="panel"><h3>Journey details</h3><div class="field"><label>DISTANCE (KM)</label><input id="distance" type="number" min="0" value="100"></div><div class="field"><label>VEHICLE MILEAGE (KM/L)</label><input id="mileage" type="number" min=".1" value="40"></div><div class="field"><label>PETROL PRICE (₹ / LITRE)</label><input id="price" type="number" min="0" step=".01" value="100"></div><button class="btn" id="calculatePetrol">Calculate journey cost ↗</button></div><div class="result-box" style="align-self:start"><span>ESTIMATED JOURNEY COST</span><strong id="petrolCost">₹250.00</strong><small id="petrolMeta">2.50 litres required · ₹2.50 per km</small><div style="border-top:1px solid #56685e;margin-top:25px;padding-top:18px"><span>FUEL REQUIRED</span><strong id="petrolLitres" style="font-size:22px">2.50 L</strong></div></div></div><p class="form-note">Estimate only. Actual fuel use varies with traffic, road conditions, vehicle condition and driving style.</p>`}
function genericTool(c,t){let slug=t[0], title=t[1], desc=t[2];let storage=slug;let form=`<form id="genericForm" class="inline-form"><input name="title" placeholder="${c.id==="shopping"?"Product or item name":"Name or description"}" required><input name="note" placeholder="Notes (optional)"><button class="btn small">Add item</button></form>`;let rows=get(c.id+"_"+slug,[]);if(c.id==="productivity"&&slug==="tasks") form=`<form id="genericForm" class="inline-form"><input name="title" placeholder="Task to complete" required><input name="note" type="date"><select name="priority"><option>Normal</option><option>High</option><option>Low</option></select><button class="btn small">Add task</button></form>`;
if(c.id==="productivity"&&slug==="habits") form=`<form id="genericForm" class="inline-form"><input name="title" placeholder="Habit name" required><button class="btn small">Add habit</button></form>`;
if(c.id==="shopping"&&slug==="wishlist") form=`<form id="genericForm" class="inline-form"><input name="title" placeholder="Product name" required><input name="amount" type="number" placeholder="Price (₹)"><input name="note" placeholder="Product link / note"><button class="btn small">Save to wishlist</button></form>`;
if(c.id==="work"&&slug==="projects") form=`<form id="genericForm" class="inline-form"><input name="title" placeholder="Project name" required><input name="note" type="date"><select name="priority"><option>In progress</option><option>Not started</option><option>Completed</option></select><button class="btn small">Add project</button></form>`;
return `<div class="page-head"><div><div class="eyebrow">${c.name} / Workspace</div><h1 class="serif">${title}</h1><p>${desc}</p></div></div><div class="panel"><div class="panel-head"><h3>${c.id==="productivity"?"Add to your list":c.id==="shopping"?"Keep a considered list":"Add a new record"}</h3><span class="eyebrow">Personal records</span></div>${form}</div><div class="panel"><div class="panel-head"><h3>Your records</h3><span class="muted" style="font-size:11px">${rows.length} items</span></div>${rows.length?`<table class="table"><thead><tr><th>Item</th><th>Details</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(x=>`<tr><td>${esc(x.title)}</td><td>${esc(x.note||"—")}</td><td>${x.done?"Completed":"Active"}</td><td><button class="iconbtn toggle-row" data-id="${x.id}">${x.done?"↺":"✓"}</button> <button class="iconbtn delete-row" data-id="${x.id}">×</button></td></tr>`).join("")}</tbody></table>`:`<div class="empty">Nothing here yet. Add your first item above and it will be saved in this browser.</div>`}</div><p class="form-note">This starter workspace saves records locally in this browser. Cloud sync and secure multi-device storage require the Supabase integration.</p>`}
function settings(){return `<div class="page-head"><div><div class="eyebrow">Personal / Preferences</div><h1 class="serif">Settings</h1><p>Manage your local profile and workspace preferences.</p></div></div><div class="panel"><h3>Profile</h3><form id="profileForm"><div class="field"><label>DISPLAY NAME</label><input name="name" value="${esc(get("user",{name:""}).name||"")}" required></div><div class="field"><label>EMAIL</label><input name="email" value="${esc(get("user",{email:""}).email||"")}" type="email"></div><button class="btn">Save profile</button></form></div><div class="panel"><h3>Workspace preferences</h3><p class="muted">Currency: Indian Rupee (INR ₹) · Locale: India</p><button class="btn secondary small" id="clearData">Clear local demo data</button></div>`}
function toolPage(path){let parts=path.split("/").filter(Boolean), c=categories.find(x=>x.id===parts[0]);if(!c)return null;if(parts.length===1)return categoryPage(c);let t=c.tools.find(x=>x[0]===parts[1]);if(!t)return `<div class="empty">This workspace is not available.</div>`;if(c.id==="finance"&&parts[1]==="expenses")return addExpense();if(c.id==="mobility"&&parts[1]==="petrol-calculator")return petrol();return genericTool(c,t)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function render(){let p=route();if(supabase&&!authReady&&p!=="/"&&p!=="/auth"){app.innerHTML=`<main class="auth-main" style="min-height:70vh;display:grid;place-items:center"><p class="muted">Restoring your secure session…</p></main>`;return}if(p==="/")app.innerHTML=landing();else if(p==="/auth")app.innerHTML=auth();else{let content=p==="/dashboard"?dashboard():p==="/settings"?settings():p==="/favourites"?`<div class="page-head"><div><div class="eyebrow">Personal</div><h1 class="serif">Favourites</h1><p>Your saved shortcuts will live here.</p></div></div><div class="empty">Use the favourite control on tools as you build out your workspace.</div>`:p==="/recent"?`<div class="page-head"><div><div class="eyebrow">Personal</div><h1 class="serif">Recently used</h1><p>Your recently opened workspaces.</p></div></div>${get("recent",[]).map(x=>`<p><a href="${x.path}" data-link>${x.name} ↗</a></p>`).join("")||'<div class="empty">No recent workspaces yet.</div>'}`:toolPage(p)||`<div class="empty">Page not found.</div>`;app.innerHTML=shell(content,p)}
document.querySelectorAll("[data-link]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.getAttribute("href"))}));
let logout=$("#logout");if(logout)logout.addEventListener("click",async e=>{e.preventDefault();if(supabase)await supabase.auth.signOut();localStorage.removeItem("atelier_user");currentSession=null;go("/")});
let menu=$("#menu");if(menu)menu.onclick=()=>$("#sidebar").classList.toggle("open");
const searchInput=$("#globalSearch");
const searchPanel=$("#searchSuggestions");
if(searchInput&&searchPanel){
 const allTools=categories.flatMap(c=>c.tools.map(t=>({category:c,tool:t,path:`/${c.id}/${t[0]}`})));
 let searchItems=[],activeSearchIndex=-1;
 const closeSearch=()=>{searchPanel.hidden=true;searchInput.setAttribute("aria-expanded","false");searchInput.removeAttribute("aria-activedescendant");activeSearchIndex=-1};
 const chooseSearchItem=item=>{if(!item)return;closeSearch();searchInput.value="";go(item.path)};
 const paintActive=()=>{
  const options=[...searchPanel.querySelectorAll("[role=option]")];
  options.forEach((option,index)=>{const active=index===activeSearchIndex;option.classList.toggle("is-active",active);option.setAttribute("aria-selected",String(active))});
  const active=options[activeSearchIndex];if(active){searchInput.setAttribute("aria-activedescendant",active.id);active.scrollIntoView({block:"nearest"})}else searchInput.removeAttribute("aria-activedescendant");
 };
 const updateSearch=()=>{
  const query=searchInput.value.trim().toLowerCase();
  activeSearchIndex=-1;searchItems=[];
  if(!query){closeSearch();return}
  const categoryMatches=categories.filter(c=>c.name.toLowerCase().includes(query));
  const toolMatches=allTools.map(item=>{
   const name=item.tool[1].toLowerCase(),description=item.tool[2].toLowerCase(),category=item.category.name.toLowerCase();
   let score=name===query?0:name.startsWith(query)?1:name.includes(query)?2:category.startsWith(query)?3:category.includes(query)?4:description.includes(query)?5:99;
   return {...item,score};
  }).filter(item=>item.score<99).sort((a,b)=>a.score-b.score||a.tool[1].localeCompare(b.tool[1])).slice(0,7);
  const items=[...categoryMatches.slice(0,2).map(category=>({kind:"category",category,path:`/${category.id}`,label:category.name,description:category.desc})),...toolMatches];
  searchItems=items;
  if(!items.length){searchPanel.innerHTML='<div class="search-empty">No matching tools. Try another keyword.</div>';searchPanel.hidden=false;searchInput.setAttribute("aria-expanded","true");return}
  searchPanel.innerHTML=items.map((item,index)=>{
   const isCategory=item.kind==="category",title=isCategory?item.label:item.tool[1],subtitle=isCategory?"Explore category":item.category.name,description=isCategory?item.description:item.tool[2],icon=isCategory?item.category.icon:item.category.icon;
   return `<button type="button" class="search-option" id="search-option-${index}" role="option" aria-selected="false" data-search-option="${index}"><span class="search-option-icon">${esc(icon)}</span><span class="search-option-copy"><strong>${esc(title)}</strong><small>${esc(description)}</small></span><span class="search-option-meta">${esc(subtitle)} <b>↗</b></span></button>`;
  }).join("");
  searchPanel.hidden=false;searchInput.setAttribute("aria-expanded","true");
  searchPanel.querySelectorAll("[data-search-option]").forEach(button=>button.addEventListener("click",()=>chooseSearchItem(searchItems[Number(button.dataset.searchOption)])));
 };
 searchInput.addEventListener("input",updateSearch);
 searchInput.addEventListener("keydown",event=>{
  if(event.key==="ArrowDown"&&!searchPanel.hidden){event.preventDefault();activeSearchIndex=Math.min(activeSearchIndex+1,searchItems.length-1);paintActive()}
  else if(event.key==="ArrowUp"&&!searchPanel.hidden){event.preventDefault();activeSearchIndex=Math.max(activeSearchIndex-1,0);paintActive()}
  else if(event.key==="Enter"){
   if(!searchPanel.hidden&&searchItems.length){event.preventDefault();chooseSearchItem(searchItems[activeSearchIndex>=0?activeSearchIndex:0])}
   else if(searchInput.value.trim())toast("No matching utility found");
  }else if(event.key==="Escape"&&!searchPanel.hidden){event.preventDefault();closeSearch()}
 });
 searchInput.addEventListener("focus",()=>{if(searchInput.value.trim())updateSearch()});
 document.addEventListener("pointerdown",event=>{if(!event.target.closest(".search-wrap"))closeSearch()});
}
if(p==="/auth"){
 let mode="login";
 const feedback=(message,isError=false)=>{
   const el=$("#authFeedback");
   if(!el)return;
   el.hidden=!message;
   el.textContent=message||"";
   el.classList.toggle("error",Boolean(isError));
   el.classList.toggle("success",Boolean(message)&&!isError);
 };
 document.querySelectorAll("[data-auth]").forEach(b=>b.onclick=()=>{
   mode=b.dataset.auth;
   document.querySelectorAll("[data-auth]").forEach(x=>x.classList.toggle("active",x===b));
   $("#nameField").hidden=mode!=="signup"; $("#confirmField").hidden=mode!=="signup";
   $("#authTitle").textContent=mode==="login"?"Welcome back.":"Create your space.";
   $("#authSub").textContent=mode==="login"?"Sign in to continue to your space.":"A few details and your space is ready.";
   $("#authSubmit").innerHTML=mode==="login"?"<span>Sign in</span><span>↗</span>":"<span>Create account</span><span>↗</span>";
   $("#authForm").querySelector('[name="name"]').required=mode==="signup";
   $("#authForm").querySelector('[name="confirm"]').required=mode==="signup";
   $("#passwordHint").textContent=mode==="login"?"Your account password":"At least 6 characters";
   document.querySelectorAll("[data-auth]").forEach(x=>x.setAttribute("aria-selected",String(x===b)));
   const pass=$("#authForm").querySelector('[name="password"]');
   if(pass)pass.autocomplete=mode==="login"?"current-password":"new-password";
   feedback("");
 });
 const googleButton=$("#googleSignIn");
 if(googleButton)googleButton.onclick=async()=>{
   if(!supabaseConfigured){feedback("Supabase is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, then restart the server.",true);return}
   if(authBusy)return;
   authBusy=true;googleButton.disabled=true;googleButton.classList.add("is-loading");feedback("Connecting to Google…");
   try{
     const redirectTo=window.location.origin+window.location.pathname;
     const {error}=await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo}});
     if(error)throw error;
   }catch(err){feedback(err.message||"Google sign-in could not start.",true);authBusy=false;googleButton.disabled=false;googleButton.classList.remove("is-loading")}
 };
 $("#authForm").onsubmit=async e=>{
   e.preventDefault();
   if(!supabaseConfigured){feedback("Supabase is not connected. Add your project URL and publishable/anon key to .env.local, then restart npm run dev.",true);return}
   if(authBusy)return;
   const f=new FormData(e.target),email=String(f.get("email")||"").trim(),password=String(f.get("password")||"");
   if(!email||!password){feedback("Enter your email address and password.",true);return}
   if(mode==="signup"&&password!==f.get("confirm")){feedback("Your passwords do not match.",true);return}
   authBusy=true;const submit=$("#authSubmit");submit.disabled=true;submit.textContent="Please wait…";feedback(mode==="login"?"Checking your account…":"Creating your account…");
   try{
     if(mode==="signup"){
       const fullName=String(f.get("name")||"").trim();
       const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:fullName}}});
       if(error)throw error;
       if(data.session){
         currentSession=data.session;authReady=true;
         set("user",{name:fullName||email.split("@")[0],email});
         go("/dashboard");
       }else{
         feedback("Account created. Supabase requires email confirmation before you can sign in. Check your inbox, confirm your email, then return here.");
       }
     }else{
       const {data,error}=await supabase.auth.signInWithPassword({email,password});
       if(error)throw error;
       if(!data.session)throw new Error("Sign-in succeeded but no session was returned. Check your Supabase Auth settings.");
       currentSession=data.session;authReady=true;
       set("user",{name:data.user.user_metadata?.full_name||data.user.user_metadata?.name||email.split("@")[0],email});
       go("/dashboard");
     }
   }catch(err){
     let message=err.message||"Authentication failed.";
     if(/invalid login credentials/i.test(message))message="Email or password is incorrect. If you haven't registered yet, choose Create account first.";
     if(/email not confirmed/i.test(message))message="Please confirm your email using the link sent by Supabase before signing in.";
     feedback(message,true);
   }finally{
     authBusy=false;
     if($("#authSubmit")){$("#authSubmit").disabled=false;$("#authSubmit").innerHTML=mode==="login"?"<span>Sign in</span><span>↗</span>":"<span>Create account</span><span>↗</span>"}
     if(googleButton){googleButton.disabled=false;googleButton.classList.remove("is-loading")}
   }
 };
}
if($("#expenseForm")){$("#expenseForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),date=f.get("date"),rows=get("expenses",[]);rows.push({id:Date.now(),title:f.get("title"),amount:f.get("amount"),category:f.get("category"),date,month:date.slice(0,7)});set("expenses",rows);render();toast("Expense saved")};document.querySelectorAll(".delete-exp").forEach(b=>b.onclick=()=>{set("expenses",get("expenses",[]).filter(x=>x.id!=b.dataset.id));render();toast("Record deleted")});$("#exportExpenses").onclick=()=>downloadCSV("expenses.csv",get("expenses",[]))}
if($("#calculatePetrol"))$("#calculatePetrol").onclick=()=>{let d=+$("#distance").value,m=+$("#mileage").value,p=+$("#price").value;if(d<=0||m<=0||p<0)return toast("Enter valid journey details");let litres=d/m,cost=litres*p;$("#petrolCost").textContent=money(cost);$("#petrolLitres").textContent=litres.toFixed(2)+" L";$("#petrolMeta").textContent=`${litres.toFixed(2)} litres required · ${money(cost/d)} per km`};
if($("#genericForm"))$("#genericForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),key=route().split("/").filter(Boolean).join("_"),rows=get(key,[]);rows.push({id:Date.now(),title:f.get("title"),note:f.get("note")||"",amount:f.get("amount")||"",priority:f.get("priority")||"",done:false});set(key,rows);render();toast("Saved to your workspace")};
document.querySelectorAll(".delete-row").forEach(b=>b.onclick=()=>{let key=route().split("/").filter(Boolean).join("_");set(key,get(key,[]).filter(x=>x.id!=b.dataset.id));render();toast("Item deleted")});
document.querySelectorAll(".toggle-row").forEach(b=>b.onclick=()=>{let key=route().split("/").filter(Boolean).join("_"),rows=get(key,[]);rows=rows.map(x=>x.id==b.dataset.id?{...x,done:!x.done}:x);set(key,rows);render()});
if($("#profileForm"))$("#profileForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),u=get("user",{});u.name=f.get("name");u.email=f.get("email");set("user",u);render();toast("Profile updated")};
if($("#clearData"))$("#clearData").onclick=()=>{if(confirm("Clear all Atelier demo data stored in this browser?")){Object.keys(localStorage).filter(k=>k.startsWith("atelier_")).forEach(k=>localStorage.removeItem(k));go("/")}};
if(p!=="/"&&p!=="/auth"){let c=categories.find(x=>p.startsWith("/"+x.id)),name=c?.tools.find(t=>p.endsWith("/"+t[0]))?.[1]||c?.name||"Overview";let r=get("recent",[]).filter(x=>x.path!==p);r.unshift({path:p,name,category:c?.name||"Personal"});set("recent",r.slice(0,12))}
wireTheme(); animatePage();
}

function applyTheme(theme){const publicRoute=route()==="/"||route()==="/auth";const effectiveTheme=publicRoute?"light":theme;document.documentElement.dataset.theme=effectiveTheme;if(!publicRoute)localStorage.setItem("atelier_theme",effectiveTheme);document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{btn.setAttribute("aria-label",effectiveTheme==="dark"?"Switch to light mode":"Switch to dark mode");let glyph=btn.querySelector(".theme-glyph"),label=btn.querySelector(".theme-label");if(glyph)glyph.textContent=effectiveTheme==="dark"?"☼":"◐";if(label)label.textContent=effectiveTheme==="dark"?"Light mode":"Dark mode"})}
function wireTheme(){applyTheme(localStorage.getItem("atelier_theme")||"light");document.querySelectorAll("[data-theme-toggle]").forEach(btn=>btn.addEventListener("click",()=>{let next=document.documentElement.dataset.theme==="dark"?"light":"dark";applyTheme(next);gsap.fromTo(btn,{scale:.92},{scale:1,duration:.35,ease:"back.out(2)"})}))}
function animatePage(){
 if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 gsap.killTweensOf(".hero > div, .page-head, .stat, .panel");
 const intro=document.querySelectorAll(".hero > div, .page-head, .stat, .panel");
 if(intro.length)gsap.fromTo(intro,{y:16,opacity:0},{y:0,opacity:1,duration:.72,stagger:.07,ease:"power3.out",clearProps:"transform"});
 const preview=document.querySelector(".preview");
 if(preview)gsap.fromTo(preview,{rotate:3,y:24,opacity:0},{rotate:1,y:0,opacity:1,duration:1.1,ease:"power3.out",delay:.15});
 const reveal=document.querySelectorAll(".section-head, .category-card, .benefit, .step, .tool-card");
 if(!reveal.length)return;
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){gsap.fromTo(entry.target,{y:20,opacity:0},{y:0,opacity:1,duration:.65,ease:"power3.out",clearProps:"transform"});observer.unobserve(entry.target)}}),{threshold:.12});
 reveal.forEach(el=>observer.observe(el));
}

function downloadCSV(name,rows){if(!rows.length)return toast("Nothing to export yet");let keys=Object.keys(rows[0]),csv=[keys.join(","),...rows.map(r=>keys.map(k=>'"'+String(r[k]??"").replaceAll('"','""')+'"').join(","))].join("\\n"),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
render();

// Restore the Supabase session. Auth events can arrive before getSession() resolves
// (especially after OAuth redirects); never let a late initial read overwrite a newer event.
if (supabase) {
  supabase.auth.onAuthStateChange((event, session) => {
    authEventSeen = true;
    authReady = true;
    currentSession = session || null;

    if (session?.user) {
      const u = session.user;
      set("user", {
        name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "User",
        email: u.email || ""
      });
    }

    if (event === "SIGNED_OUT") {
      localStorage.removeItem("atelier_user");
      go("/");
    } else if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION")) {
      if (route() === "/auth" || route() === "/") go("/dashboard");
      else render();
    } else {
      render();
    }
  });

  supabase.auth.getSession().then(({ data, error }) => {
    if (error) console.error("Could not restore Supabase session:", error.message);
    // A newer auth event takes precedence over this startup snapshot.
    if (!authEventSeen) {
      currentSession = data?.session || null;
      authReady = true;
      if (currentSession?.user) {
        const u = currentSession.user;
        set("user", {
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "User",
          email: u.email || ""
        });
      }
    }

    const activeSession = currentSession;
    const currentRoute = route();
    if (!activeSession && currentRoute !== "/" && currentRoute !== "/auth") go("/auth");
    else if (activeSession && (currentRoute === "/auth" || currentRoute === "/")) go("/dashboard");
    else render();
  }).catch(err => {
    console.error("Supabase session restore failed:", err);
    authReady = true;
    render();
  });
} else if (route() !== "/" && route() !== "/auth") {
  go("/auth");
}
