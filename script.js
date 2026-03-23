gsap.registerPlugin(ScrollTrigger);

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
});

// Magnetic effect
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)"
    });
  });
});

// Tilt effect
document.querySelectorAll('.tilt-card').forEach(card => {
  const glare = card.querySelector('.feature-glare, .story-card-glare');
  const glareColor = card.dataset.glare || "rgba(255,255,255,0.25)";

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000
    });

    if (glare) {
      gsap.set(glare, {
        background: `radial-gradient(circle at ${x}px ${y}px, ${glareColor}, transparent 60%)`,
        opacity: 1
      });
    }
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

    if (glare) {
      gsap.to(glare, { opacity: 0, duration: 0.3 });
    }
  });
});

// Navbar scroll effect
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

// ================= WAITLIST WITH SHEETMONKEY =================
const joinBtn = document.getElementById('join-btn');
const waitlistForm = document.getElementById('waitlist-form');
const waitlistSuccess = document.getElementById('waitlist-success');
const emailInput = document.getElementById('email-input');

const SHEETMONKEY_URL = "https://api.sheetmonkey.io/forms/vsnqvEtTYpTSmvULkojiXn";

waitlistForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput?.value.trim();
  if (!email) return;

  joinBtn.disabled = true;
  joinBtn.innerHTML = "<span>Joining...</span>";

  const formData = new FormData(waitlistForm);

  try {
    const response = await fetch(SHEETMONKEY_URL, {
      method: "POST",
      body: formData,
      redirect: "follow"
    });

    const responseText = await response.text();

    console.log("SheetMonkey status:", response.status);
    console.log("SheetMonkey response:", responseText);

    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.status} ${responseText}`);
    }

    gsap.to(waitlistForm, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        waitlistForm.style.display = "none";

        gsap.fromTo(
          waitlistSuccess,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, display: "flex", duration: 0.5 }
        );

        createConfetti();
        waitlistForm.reset();
      }
    });
  } catch (error) {
    console.error("SheetMonkey error:", error);
    alert("Something went wrong while joining the waitlist. Please check the console or Network tab for the exact SheetMonkey error.");
  } finally {
    joinBtn.disabled = false;
    joinBtn.innerHTML = "<span>Join Waitlist</span>";
  }
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

// TEAM SECTION
const teamData = [
  {
    name: "Falak Yadav",
    role: "CTO & Co-Founder",
    department: "Tech",
    avatar: "FY",
    image: "./images/team_members/falak.jpeg",
    linkedin: "https://www.linkedin.com/in/falak-yadav/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Chief Technology Officer and Co-Founder of Swapifhy. Focused on product, systems, and building student-first tech."
  },
  {
    name: "Pragati Singh",
    role: "Growth Intern",
    department: "Growth",
    avatar: "PS",
    image: "./images/team_members/pragati.jpeg",
    linkedin: "",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Writer who turns ideas into meaningful stories that connect people and products. Currently pursuing B.Tech and exploring growth through content and creativity."
  },
  {
    name: "Khyati",
    role: "Growth Intern",
    department: "Growth",
    avatar: "KH",
    image: "./images/team_members/khyati.jpeg",
    linkedin: "",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Academic scholar and school captain with experience in debates, science congresses, and national events. Passionate about leadership, community building, and creative expression."
  },
  {
    name: "Harima",
    role: "Growth Intern",
    department: "Growth",
    avatar: "HA",
    image: "./images/team_members/harima.jpeg",
    linkedin: "",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Interested in startups, research, and growth strategy. Enjoys fast-paced environments and contributing to impactful ideas."
  },
  {
    name: "Naira M",
    role: "Growth Head",
    department: "Growth",
    avatar: "NM",
    image: "",
    linkedin: "https://www.linkedin.com/in/naira-m/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Focused on building growth-driven ecosystems. Believes in turning skill trading into a lifestyle and scaling meaningful movements."
  },
  {
    name: "Karan Choudhary",
    role: "App Developer",
    department: "Tech",
    avatar: "KC",
    image: "./images/team_members/karan.jpeg",
    linkedin: "https://www.linkedin.com/in/karan-choudhary-8b62a6216/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Backend-focused developer interested in scalable systems, data pipelines, and building reliable software."
  },
  {
    name: "Ritvik Nayak",
    role: "Developer",
    department: "Tech",
    avatar: "RN",
    image: "./images/team_members/ritvik.jpeg",
    linkedin: "https://www.linkedin.com/in/ritvik-nayak/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Full-stack developer passionate about building elegant solutions and bringing creative ideas to life through code."
  },
  {
    name: "Aditya Raj Tiwari",
    role: "Tech Developer",
    department: "Tech",
    avatar: "AT",
    image: "./images/team_members/aditya_raj.jpg",
    linkedin: "https://www.linkedin.com/in/aditya-raj-tiwari-36a3b5293/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Creative problem solver skilled in coding, storytelling, and media. Brings a blend of technical and communication skills."
  },
  {
    name: "Aksh Tiwari",
    role: "App Developer",
    department: "Tech",
    avatar: "AT",
    image: "",
    linkedin: "https://www.linkedin.com/in/akshtiwariweb/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Frontend-focused developer and UI designer specializing in web development, cloud, networking, and creative development."
  },
  {
    name: "Ishani Sharma",
    role: "Chief of Staff & Partnerships",
    department: "Management",
    avatar: "IS",
    image: "./images/team_members/ishani.jpeg",
    linkedin: "https://www.linkedin.com/in/ishani-sharma-724271320/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Finance major passionate about accessibility, collaboration, and impact. Enjoys solving complex problems and building opportunities."
  },
  {
    name: "Syed Azmaan",
    role: "Partnerships & Hiring",
    department: "Management",
    avatar: "SA",
    image: "./images/team_members/syed.jpeg",
    linkedin: "https://www.linkedin.com/in/syed-azmaan-ali-madni-99642b230/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Curious thinker driven by conversations and ideas that create impact."
  },
  {
    name: "Anwesha Ganji",
    role: "Founder & CEO",
    department: "Management",
    avatar: "AG",
    image: "./images/team_members/anwesha.png",
    linkedin: "https://www.linkedin.com/in/anwesha-g-861785344/",
    color: "var(--gradient-hero)",
    text: "#fff",
    description: "Builder focused on entrepreneurship, research, and design. Leads Swapifhy with a vision to make collaboration and learning more accessible."
  }
];

function renderTeam() {
  const track = document.querySelector(".team-track");
  if (!track) return;

  const fullData = [...teamData, ...teamData];

  track.innerHTML = fullData.map(member => {
    const name = member.name || "Unknown";
    const role = member.role || "";
    const dept = member.department || "";
    const avatar = member.avatar || "?";
    const image = member.image || "";
    const linkedin = member.linkedin || "";
    const color = member.color || "#333";
    const text = member.text || "#fff";
    const description = member.description || "";

    const avatarHTML = image && image.trim() !== ""
      ? `<img src="${image}" alt="${name}" class="team-avatar-img">`
      : `<div class="team-avatar" style="background:${color}; color:${text}">${avatar}</div>`;

    return `
      <div class="team-card ${linkedin ? "clickable" : ""}"
        data-linkedin="${linkedin}"
        data-name="${name}"
        data-role="${role}"
        data-department="${dept}"
        data-description="${description}"
      >
        ${avatarHTML}
        <h3>${name}</h3>
        <p>${role}</p>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".team-card.clickable").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.dataset.linkedin;
      if (link) {
        window.open(link, "_blank");
      }
    });
  });
}

let tween;

function initTeamMarquee() {
  const track = document.querySelector(".team-track");
  if (!track) return;

  requestAnimationFrame(() => {
    const totalWidth = track.scrollWidth / 2;

    if (totalWidth === 0) {
      console.warn("Track width is 0 -> CSS/layout issue");
      return;
    }

    gsap.killTweensOf(track);
    gsap.set(track, { x: 0 });

    tween = gsap.to(track, {
      x: -totalWidth,
      duration: 120,
      repeat: -1,
      ease: "none"
    });

    console.log("tween created:", tween);
  });
}

renderTeam();
initTeamMarquee();
