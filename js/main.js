(function(){
const S=SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tel=p=>'tel:'+p.replace(/[^+\d]/g,''),br=n=>String(n).replace('.',',')+' Br';
const pages=[['index.html','Главная'],['menu.html','Меню'],['kitchen.html','Кухня'],['atmosphere.html','Атмосфера'],['contacts.html','Контакты']];
const cur=location.pathname.split('/').pop()||'index.html';
$('#site-header').innerHTML=`<div class="wrap bar"><a class="logo" href="index.html"><img src="images/logo-mark.png" alt="" width="42" height="42"><span>My Dear <i>Kebab</i></span></a><nav id="nav">${pages.map(p=>`<a href="${p[0]}"${p[0]===cur?' class="on"':''}>${p[1]}</a>`).join('')}<a class="btn sm" href="${tel(S.phone)}">Позвонить</a></nav><button id="burger" aria-label="Меню"><i></i><i></i><i></i></button></div>`;
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
$('#site-footer').innerHTML=`<div class="wrap"><div class="foot"><div><img src="images/logo-mark.png" alt="" width="52" height="52"><b>My Dear Kebab</b>${S.address}<br>${S.hours}</div><div><b>Разделы</b>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</div><div><b>Связь</b><a href="${tel(S.phone)}">${S.phone}</a><br><a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">Instagram</a><br><a href="https://facebook.com/${S.facebook}" target="_blank" rel="noopener">Facebook</a></div></div></div><div class="wrap copy">© My Dear Kebab · Сайт сделал <a href="https://t3trix-hub.github.io/t3trix-portfolio/" target="_blank" rel="noopener">Lexey</a></div>`;
$$('[data-site]').forEach(e=>e.textContent=S[e.dataset.site]);
$$('[data-tel]').forEach(e=>e.href=tel(S.phone));$$('[data-ig]').forEach(e=>e.href='https://instagram.com/'+S.instagram);
$$('[data-fb]').forEach(e=>e.href='https://facebook.com/'+S.facebook);$$('[data-map]').forEach(e=>e.href=S.ymaps);$$('[data-menu]').forEach(e=>e.href=S.menuLink);
const card=(it,cat)=>`<article class="card rv"><div class="ph"><img loading="lazy" src="images/menu/${it[0]}.jpg" alt="${esc(it[1])}" onerror="this.parentNode.classList.add('no');this.remove()"></div><div class="cb"><h3>${esc(it[1])}</h3><p>${esc(it[2])}</p><ul>${it[3].map(v=>`<li><span>${esc(v[0])||'Порция'} <em>${v[2]}</em></span><b>${br(v[1])}</b></li>`).join('')}</ul>${cat?`<a class="go" href="menu.html#${cat}">В меню →</a>`:''}</article>`.replace('</article>','</div></article>');
const all=MENU.flatMap(c=>c.items.map(i=>({i,c:c.id})));
const rnd=$('#random');
if(rnd){const pool=all.filter(x=>x.c!=='sauces');let last='';
 const roll=()=>{let p;do{p=[...pool].sort(()=>Math.random()-.5).slice(0,3)}while(p.map(x=>x.i[0]).join()===last);last=p.map(x=>x.i[0]).join();rnd.innerHTML=p.map(x=>card(x.i,x.c)).join('');window.reveal&&reveal()};
 $('#reroll').onclick=roll;roll()}
const grid=$('#menu');
if(grid){const tabs=$('#tabs'),q=$('#q'),info=$('#info');
 tabs.innerHTML=MENU.map(c=>`<button data-c="${c.id}">${esc(c.name)}</button>`).join('');
 const show=id=>{const c=MENU.find(x=>x.id===id)||MENU[0];$$('button',tabs).forEach(b=>b.classList.toggle('on',b.dataset.c===c.id));info.textContent='';grid.innerHTML=c.items.map(i=>card(i)).join('');history.replaceState(null,'','#'+c.id);window.reveal&&reveal()};
 tabs.onclick=e=>{const b=e.target.closest('button');if(b){q.value='';show(b.dataset.c)}};
 q.oninput=()=>{const t=q.value.trim().toLowerCase();if(!t)return show(location.hash.slice(1));$$('button',tabs).forEach(b=>b.classList.remove('on'));const r=all.filter(x=>(x.i[1]+' '+x.i[2]).toLowerCase().includes(t));info.textContent=r.length?`Найдено блюд: ${r.length}`:'Ничего не найдено, попробуйте другое слово';grid.innerHTML=r.map(x=>card(x.i)).join('');window.reveal&&reveal()};
 show(location.hash.slice(1))}
const mq=$('#mq');if(mq){const t=['My Dear Kebab','Шашлык на углях','Донер','Пиде','Лахмаджун','Фалафель'].map(x=>`<span>${x}</span>`).join('');mq.innerHTML=`<div>${t}${t}${t}${t}</div>`}
$$('main h1,main h2,.tile,.shot,.cap,.kit>*,.boardx,.mapx').forEach(e=>e.classList.add('rv'));
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const t=x.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>t.style.transitionDelay='',900)}}),{threshold:.08}):null;
window.reveal=()=>{let i=0;$$('.rv:not(.in)').forEach(e=>{if(!io)return e.classList.add('in');if(!e.dataset.o){e.dataset.o=1;e.style.transitionDelay=Math.min(i++,7)*55+'ms';io.observe(e)}})};reveal();
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html?$|\/$/.test(u.pathname))return;e.preventDefault();document.body.classList.add('leave');setTimeout(()=>location.href=a.href,200)});
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leave')});
})();
