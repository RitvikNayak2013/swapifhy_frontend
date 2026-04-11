console.log("Waitlist script loaded");

const supabaseConn = window.supabase.createClient(
  "https://etmsbcxinyttftrgoflt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bXNiY3hpbnl0dGZ0cmdvZmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NDc4OTMsImV4cCI6MjA5MTQyMzg5M30.OGhpfDapjw6NtV24tVuOr6KyqHUyq2-R8rWuNJzec3g",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

const joinBtn = document.getElementById('join-btn');
const waitlistForm = document.getElementById('waitlist-form');
const waitlistSuccess = document.getElementById('waitlist-success');
const emailInput = document.getElementById('email-input');

if (!waitlistForm) {
  console.error("waitlist-form not found in DOM");
}

waitlistForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  console.log("Form submit intercepted");

  const email = emailInput.value.trim();

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  joinBtn.disabled = true;
  joinBtn.innerHTML = "<span>Joining...</span>";

  try {
    const { error } = await supabaseConn
      .from('waitlist')
      .insert([
        {
          email: email,
          page: "Swapifhy Landing Page"
        }
      ]);

    if (error) {
      if (error.code === "23505") {
        alert("You're already on the waitlist 😉");
      } else {
        console.error(error);
        alert("Something went wrong. Try again.");
      }
      return;
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

  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Network error. Try again.");
  } finally {
    joinBtn.disabled = false;
    joinBtn.innerHTML = "<span>Join Waitlist</span>";
  }
});