const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".site-header");

toggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(Boolean(open)));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open menu");
  });
});

document.querySelectorAll("[data-form='preorder']").forEach((form) => {
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const theme = String(data.get("theme") || "movie");
    const labels = {
      movie: "the $29 First Box tier",
      game: "the $79 Season Pass",
      midnight: "the $149 Party Bundle",
    };
    if (status) {
      status.textContent = `You're on the list for ${labels[theme] ?? theme}. We'll email ${email} when Kickstarter opens.`;
      status.classList.add("is-live");
    }
    form.reset();
    const first = form.querySelector('input[name="theme"]');
    if (first) first.checked = true;
  });
});

/* Sticky header elevation on scroll */
const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Auto-tag common blocks for reveal + stagger children */
const autoRevealSelectors = [
  ".section-head",
  ".campaign-bar",
  ".cta-row",
  ".page-hero .wrap > *",
  ".band-sun .wrap > *",
  ".band-teal .section-head",
  ".band-teal .btn",
];

autoRevealSelectors.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  });
});

document.querySelectorAll(".feature-list, .theme-grid, .reward-grid, .steps, .logo-lockups, .faq").forEach((group) => {
  [...group.children].forEach((child, index) => {
    child.classList.add("reveal");
    child.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
  });
});

document.querySelectorAll(".progress").forEach((bar) => {
  bar.classList.add("reveal", "reveal-progress");
});

/* Hero entrance (first paint) */
if (!reduceMotion) {
  document.body.classList.add("motion-ready");
  requestAnimationFrame(() => {
    document.body.classList.add("is-booted");
  });
} else {
  document.body.classList.add("is-booted");
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("reveal-progress")) {
          entry.target.classList.add("is-filled");
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible", "is-filled"));
}

/* Smooth in-page anchor scrolling with header offset */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 12;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  });
});
