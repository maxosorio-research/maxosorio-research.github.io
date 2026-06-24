const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

document.documentElement.classList.add("enhanced");

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 48);
  },
  { passive: true }
);

function closeMenu() {
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("open");
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.classList.remove("nav-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileNav.classList.toggle("open", isOpen);
  mobileNav.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
