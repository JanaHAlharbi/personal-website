const yearEl = document.getElementById("year");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-links a");
const revealSections = document.querySelectorAll(".section-reveal");
const email = "jalharbi4634@gmail.com";

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = "Copied";
    } catch {
      copyEmailBtn.textContent = "Copy failed";
    }

    window.setTimeout(() => {
      copyEmailBtn.textContent = "Copy Email";
    }, 1500);
  });
}

if (menuToggle && siteHeader) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader?.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealSections.forEach((section) => {
  revealObserver.observe(section);
});
