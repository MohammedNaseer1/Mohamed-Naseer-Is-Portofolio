document.body.classList.add('page-ready');

const navToggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.topnav nav');
if(navToggle&&nav){navToggle.addEventListener('click',()=>{const open=nav.style.display==='flex';nav.style.display=open?'none':'flex';nav.style.flexDirection='column';navToggle.setAttribute('aria-expanded',String(!open));});}

const revealItems=document.querySelectorAll('.reveal');
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(prefersReduced){revealItems.forEach(el=>el.classList.add('is-visible'));}
else{
 const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
 revealItems.forEach(el=>observer.observe(el));
}
