// Setup GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DarkMode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Cursor Follower
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const mouseGlow = document.querySelector('.mouse-glow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const moveRingX = gsap.quickTo(cursorRing, "x", { duration: 0.3, ease: "power3.out" });
const moveRingY = gsap.quickTo(cursorRing, "y", { duration: 0.3, ease: "power3.out" });

const moveGlowX = gsap.quickTo(mouseGlow, "x", { duration: 0.8, ease: "power2.out" });
const moveGlowY = gsap.quickTo(mouseGlow, "y", { duration: 0.8, ease: "power2.out" });

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY
    });

    moveRingX(mouseX);
    moveRingY(mouseY);

    moveGlowX(mouseX);
    moveGlowY(mouseY);
});

// Hover Targets
function attachHoverEvents() {
    document.querySelectorAll('.hover-target').forEach(target => {
        target.addEventListener('mouseenter', () => {
            document.body.classList.add("hovering");
        });

        target.addEventListener('mouseleave', () => {
            document.body.classList.remove("hovering");
        });
    });
}
attachHoverEvents();

// Magnetic Buttons (aint no one gonna use this class name but just in case)
document.querySelectorAll('.magnetic').forEach(btn => {
    const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        xTo(x * 0.25);
        yTo(y * 0.25);

        gsap.to(btn, { scale: 1.05, duration: 0.2 });
    });

    btn.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
        gsap.to(btn, { scale: 1, duration: 0.3 });
    });
});

// 3d Card Effect
document.querySelectorAll('.glare-card').forEach(card => {
    const glare = card.querySelector('.glare');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        const isDark = document.body.classList.contains('dark-mode');
        const glareColor = isDark
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(255,255,255,0.6)';

        gsap.to(card, {
            rotateX,
            rotateY,
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000
        });

        gsap.set(glare, {
            background: `radial-gradient(circle at ${x}px ${y}px, ${glareColor}, transparent 60%)`,
            opacity: 1
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out"
        });

        gsap.to(glare, { opacity: 0, duration: 0.3 });
    });
});

// navbar scroll effect using ScrollTrigger instead of scroll event for better performance
const header = document.getElementById('header');

ScrollTrigger.create({
    start: "top -30",
    onUpdate: (self) => {
        if (self.scroll() > 30) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    }
});

// Reveal Animations
gsap.utils.toArray('.reveal').forEach(el => {
    gsap.from(el, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%"
        }
    });
});

gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.from(el, {
        x: -60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: "top 85%"
        }
    });
});

gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.from(el, {
        x: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: "top 85%"
        }
    });
});

// ================= WAITLIST & CONFETTI =================
const joinBtn = document.getElementById('join-btn');
const waitlistForm = document.getElementById('waitlist-form');
const waitlistSuccess = document.getElementById('waitlist-success');
const emailInput = document.getElementById('email-input');

joinBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    if (!emailInput?.value.trim()) return;

    gsap.to(waitlistForm, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => waitlistForm.style.display = "none"
    });

    gsap.fromTo(waitlistSuccess,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, display: "flex", duration: 0.5 }
    );

    createConfetti();
});

function createConfetti() {
    const colors = ['#8EB9FF', '#FFB3D9', '#FFD96A', '#D6C4FF'];

    for (let i = 0; i < 40; i++) {
        const conf = document.createElement('div');

        Object.assign(conf.style, {
            position: 'fixed',
            width: Math.random() > 0.5 ? '8px' : '12px',
            height: '8px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100 + 'vw',
            top: '-20px',
            zIndex: 9999,
            pointerEvents: 'none'
        });

        document.body.appendChild(conf);

        gsap.to(conf, {
            y: window.innerHeight + 100,
            x: "+=" + (Math.random() * 200 - 100),
            rotation: Math.random() * 720,
            opacity: 0,
            duration: Math.random() * 2 + 2,
            ease: "power2.out",
            onComplete: () => conf.remove()
        });
    }
}

// ================= TEAM SIDEBAR =================
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

        gsap.to(sidebar, { x: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(sidebarOverlay, { opacity: 1, display: "block", duration: 0.3 });
    });
});

function closeSidebar() {
    gsap.to(sidebar, { x: "100%", duration: 0.5 });
    gsap.to(sidebarOverlay, { opacity: 0, duration: 0.3, onComplete: () => {
        sidebarOverlay.style.display = "none";
    }});
}

closeSidebarBtn?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// team section

const teamData = [
  {
    name: "Anwesha Ganji",
    role: "Founder & CEO",
    avatar: "AG",
    color: "var(--gradient-hero)",
    text: "#fff",
    story: "Anwesha started Swapifhy because she believed that learning shouldn't be lonely or expensive. She envisioned a world where teenagers could just build together. When she isn't strategizing the next big move for Swapifhy, you can find her diving down random late-night rabbit holes."
  },
  {
    name: "Aditya Sinha",
    role: "Chief Operations Officer (COO)",
    avatar: "AS",
    color: "var(--swap-lavender)",
    text: "#000",
    story: "Aditya is the glue that holds the chaos together. He makes sure ideas don't just stay ideas, turning wild concepts into executing systems. A master at project management and keeping everyone on track."
  },
  {
    name: "Falak Yadav",
    role: "Co Founder & CTO",
    avatar: "FY",
    color: "linear-gradient(135deg, #FFD96A, #FFB3D9)",
    text: "#fff",
    story: "Falak bridges the gap between massive creative vision and the tough technical reality. As CTO, he maps out the architecture that lets Swapifhy handle all the crazy co-creation magic seamlessly."
  },
  {
    name: "Aditya Raj Tiwari",
    role: "Tech Developer",
    avatar: "AT",
    color: "linear-gradient(135deg, #8EB9FF, #FFD96A)",
    text: "#fff",
    story: "The code wizard. Aditya Raj turns coffee into components. Whether it's crushing bugs or building out the matchmaking algorithm that helps you find your perfect swap, he is the engine under the hood."
  },
  {
    name: "Ritvik Nayak",
    role: "Web Developer",
    avatar: "RN",
    color: "linear-gradient(135deg, var(--swap-blue), var(--swap-lavender))",
    text: "#fff",
    story: "Ritvik is the front-end artist who ensures every pixel on Swapifhy looks buttery smooth. He's obsessed with UI/UX, micro-interactions, and making sure you enjoy simply clicking around the site."
  },
  {
    name: "Alankrita Sharma",
    role: "Marketing Head",
    avatar: "AS",
    color: "linear-gradient(135deg, #D6C4FF, #8EB9FF)",
    text: "#fff",
    story: "Alankrita makes sure the world knows about Swapifhy. She knows exactly how to tell our story, run campaigns, and build hype. If you found us on social media, you have Alankrita to thank for it."
  },
  {
    name: "Anushka Bhagat",
    role: "Creative Director",
    avatar: "AB",
    color: "var(--swap-pink)",
    text: "#fff",
    story: "Anushka is the visionary behind Swapifhy's aesthetic. She curates the vibe, the brand colors, and the entire visual language that makes the platform feel like an experience rather than a boring tool."
  },
  {
    name: "Alia Gupta",
    role: "Creative Strategist",
    avatar: "AG",
    color: "var(--swap-gold)",
    text: "#000",
    story: "Alia brings the big-picture creative ideas down to earth. She figures out the 'why' behind our visuals and interactions, ensuring every creative move aligns perfectly with the community's needs."
  }
];

function renderTeam() {
  const track = document.querySelector(".team-track");

  // duplicate for infinite loop
  const fullData = [...teamData, ...teamData];

  track.innerHTML = fullData.map(member => `
    <div class="team-card"
      data-name="${member.name}"
      data-role="${member.role}"
      data-story="${member.story}"
    >
      <div class="team-avatar" style="background:${member.color}; color:${member.text}">
        ${member.avatar}
      </div>
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    </div>
  `).join("");
}

function initTeamMarquee() {
  const track = document.querySelector(".team-track");

  const totalWidth = track.scrollWidth / 2;

  gsap.to(track, {
    x: `-=${totalWidth}`,
    duration: 10,
    ease: "none",
    repeat: -1
  });
}

renderTeam();
initTeamMarquee();