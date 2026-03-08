
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });


const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const mouseGlow = document.querySelector('.mouse-glow');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY, glowX = mouseX, glowY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
});

function renderPhysics() {
  ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
  glowX += (mouseX - glowX) * 0.05; glowY += (mouseY - glowY) * 0.05;
  cursorRing.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
  mouseGlow.style.transform = `translate3d(calc(${glowX}px - 50%), calc(${glowY}px - 50%), 0)`;
  requestAnimationFrame(renderPhysics);
}
renderPhysics();

function attachHoverEvents() {
  document.querySelectorAll('.hover-target').forEach(target => {
    target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}
attachHoverEvents();


document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = `translate(0px, 0px) scale(1)`; });
});

document.querySelectorAll('.glare-card').forEach(card => {
  const glare = card.querySelector('.glare');
  card.addEventListener('mousemove', (e) => {
    card.classList.remove('reset');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const centerX = rect.width / 2, centerY = rect.height / 2;
    const isDark = document.body.classList.contains('dark-mode');
    const glareColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)';
    glare.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glareColor} 0%, transparent 60%)`;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.classList.add('reset'); glare.style.opacity = '0'; });
});
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 30) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
const joinBtn = document.getElementById('join-btn');
const waitlistForm = document.getElementById('waitlist-form');
const waitlistSuccess = document.getElementById('waitlist-success');
const emailInput = document.getElementById('email-input');

joinBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (emailInput.value.trim() === '') return;

  waitlistForm.style.display = 'none';
  waitlistSuccess.style.display = 'flex';
  createConfetti();
});

function createConfetti() {
  const colors = ['#8EB9FF', '#FFB3D9', '#FFD96A', '#D6C4FF'];
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.width = Math.random() > 0.5 ? '8px' : '12px';
    conf.style.height = conf.style.width;
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.left = (Math.random() * 100) + 'vw';
    conf.style.top = '-20px';
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    conf.style.zIndex = '9999';
    conf.style.pointerEvents = 'none';
    document.body.appendChild(conf);

    const duration = Math.random() * 2 + 2;
    conf.animate([
      { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: duration * 1000, easing: 'cubic-bezier(.37,0,.63,1)' });

    setTimeout(() => conf.remove(), duration * 1000);
  }
}

const sidebar = document.getElementById('team-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const closeSidebarBtn = document.getElementById('close-sidebar');

const sAvatar = document.getElementById('sidebar-avatar');
const sName = document.getElementById('sidebar-name');
const sRole = document.getElementById('sidebar-role');
const sStory = document.getElementById('sidebar-story');

document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {

    sName.innerText = card.dataset.name;
    sRole.innerText = card.dataset.role;
    sStory.innerHTML = card.dataset.story;

    sAvatar.innerText = card.dataset.avatar;
    sAvatar.style.background = card.dataset.color;
    sAvatar.style.color = card.dataset.text;


    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  });
});

function closeSidebar() {
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
}

closeSidebarBtn.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);
