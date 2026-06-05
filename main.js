//  navbar section, active link highlight on scroll
const navLinks = document.querySelectorAll(".nav-pill");
const sections = document.querySelectorAll("section[id]");
const mainNav = document.getElementById("main-nav");

function updateActiveNavLink() {
  const scrollY = window.scrollY;

  //  shadow class on scroll
  if (scrollY > 60) {
    mainNav.classList.add("scrolled");
  } else {
    mainNav.classList.remove("scrolled");
  }

  // highlight nav link for visible section
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink, { passive: true });
updateActiveNavLink();
