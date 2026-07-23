const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

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
    }
    form.reset();
    const first = form.querySelector('input[name="theme"]');
    if (first) first.checked = true;
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );
  revealItems.forEach((el) => observer.observe(el));
}
