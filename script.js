// ==========================
// Theme toggle
// ==========================
function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Apply saved theme on load
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.documentElement.classList.replace("dark", "light");
})();

// ==========================
// Mobile menu toggle
// ==========================
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("open");
}

// ==========================
// Active nav link on scroll
// ==========================
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-links a");
  let current    = "";

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });

// ==========================
// Hide navbar on scroll down, show on scroll up
// ==========================
let lastScrollY = 0;
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  navbar.classList.toggle("nav-hidden", current > lastScrollY && current > 80);
  lastScrollY = current;
}, { passive: true });

// ==========================
// Projects category filter
// ==========================
document.querySelectorAll(".pf-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pf-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    document.querySelectorAll(".proj-card").forEach(card => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.classList.toggle("hidden", !show);
    });
  });
});

// ==========================

// ==========================
// Contact form → mailto
// ==========================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const emailInput = document.getElementById("f-email");
  emailInput.addEventListener("invalid", () => {
    emailInput.setCustomValidity("Please include an '@' in the email address.");
  });
  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
  });

  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name    = document.getElementById("f-name").value.trim();
    const email   = emailInput.value.trim();
    const message = document.getElementById("f-message").value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
  });
}

// ==========================
// Scroll reveal
// ==========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// ==========================
// Init
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNav();
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
});
