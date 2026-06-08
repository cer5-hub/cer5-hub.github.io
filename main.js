// close mobile navbar on link click
const navLinks = document.querySelectorAll(".site-nav-link");
const navMenu = document.getElementById("navMenu");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    var bsCollapse = bootstrap.Collapse.getInstance(navMenu);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});

// validation and submission
var contactForm = document.getElementById("contactForm");
var submitBtn = document.getElementById("submitBtn");
var btnLabel = submitBtn.querySelector(".btn-label");
var btnSpinner = submitBtn.querySelector(".btn-spinner");
var formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // bootstrap's built-in validation styles
  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated");
    return;
  }

  // Show loading spinner, disable button
  btnLabel.classList.add("d-none");
  btnSpinner.classList.remove("d-none");
  submitBtn.disabled = true;
  submitBtn.setAttribute("aria-busy", "true");

  // async, will replace this if time woth real fetch
  setTimeout(function () {
    // Reset button state
    btnLabel.classList.remove("d-none");
    btnSpinner.classList.add("d-none");
    submitBtn.disabled = false;
    submitBtn.removeAttribute("aria-busy");

    // Reset form and show success message
    contactForm.reset();
    contactForm.classList.remove("was-validated");
    formSuccess.classList.remove("d-none");

    // Move focus to success message for screen readers
    formSuccess.setAttribute("tabindex", "-1");
    formSuccess.focus();

    // Hide after 6 seconds
    setTimeout(function () {
      formSuccess.classList.add("d-none");
    }, 6000);
  }, 1500);
});

var revealEls = document.querySelectorAll("section");

revealEls.forEach(function (el) {
  el.classList.add("reveal");
});

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.08 }
);

revealEls.forEach(function (el) {
  observer.observe(el);
});

//  Active nav link on scroll
var sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  var scrollY = window.scrollY;

  sections.forEach(function (section) {
    var top = section.offsetTop - 90;
    var bottom = top + section.offsetHeight;
    var id = section.getAttribute("id");
    var link = document.querySelector('.site-nav-link[href="#' + id + '"]');

    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        link.setAttribute("aria-current", "page");
        link.style.background = "var(--ice-blue)";
        link.style.color = "var(--dark-slate)";
      } else {
        link.removeAttribute("aria-current");
        link.style.background = "";
        link.style.color = "";
      }
    }
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();
