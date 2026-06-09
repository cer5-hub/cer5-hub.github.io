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
  // Submit to Formspree
  fetch(contactForm.action, {
    method: "POST",
    body: new FormData(contactForm),
    headers: { Accept: "application/json" },
  })
    .then(function (response) {
      btnLabel.classList.remove("d-none");
      btnSpinner.classList.add("d-none");
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");

      if (response.ok) {
        contactForm.reset();
        contactForm.classList.remove("was-validated");
        formSuccess.classList.remove("d-none");
        formSuccess.setAttribute("tabindex", "-1");
        formSuccess.focus();
        setTimeout(function () {
          formSuccess.classList.add("d-none");
        }, 6000);
      } else {
        alert(
          "Something went wrong. Please email me directly at ErikaCervantesArellano@gmail.com"
        );
      }
    })
    .catch(function () {
      btnLabel.classList.remove("d-none");
      btnSpinner.classList.add("d-none");
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
      alert(
        "Network error. Please email me directly at ErikaCervantesArellano@gmail.com"
      );
    });
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
        link.classList.add("active-link");
      } else {
        link.removeAttribute("aria-current");
        link.classList.remove("active-link");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();
