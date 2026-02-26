// this is the toggle i made for dark mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });

// cursor physics and glowing effect for cursor animations
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

document.querySelectorAll('.hover-target').forEach(target => {
  target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// i made this magnetic button effect for the buttons on the website, it makes them feel more interactive and fun to click
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = `translate(0px, 0px) scale(1)`; });
});

// 3d card glare
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
  card.addEventListener('mouseleave', () => {
    card.classList.add('reset'); glare.style.opacity = '0';
  });
});


window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 30) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));