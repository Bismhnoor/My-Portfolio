
/* ---- Navbar: shrink on scroll ---- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

/* ---- Mobile menu ---- */
const burger = document.getElementById('hamburger'),
      links  = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  links.classList.toggle('open');
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); links.classList.remove('open');
}));

/* ---- Reveal on scroll ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- Skill bars ---- */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) {
    e.target.style.width = e.target.dataset.level + '%';
    barObs.unobserve(e.target);
  }});
}, { threshold: .4 });
document.querySelectorAll('.bar-fill').forEach(el => barObs.observe(el));

/* ---- Animated counters ---- */
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
    const start = performance.now(), dur = 1300;
    (function step(now){
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
    countObs.unobserve(el);
  });
}, { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ---- Typewriter: your other roles ---- */
const words = ['WordPress Developer', 'AI Researcher', 'MS AI Student', 'Digital Marketer', 'Customer Support'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
(function type(){
  const w = words[wi];
  typedEl.textContent = w.slice(0, ci);
  let delay = deleting ? 45 : 95;
  if (!deleting && ci === w.length) { deleting = true; delay = 1500; }
  else if (deleting && ci === 0)    { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
  else ci += deleting ? -1 : 1;
  setTimeout(type, delay);
})();

/* ---- Active nav link ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) {
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }});
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => secObs.observe(s));

/* ---- Year ---- */
document.getElementById('year').textContent = new Date().getFullYear();