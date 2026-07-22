// ================================================
// Norwest Fresh Seafood — Main JavaScript File
// Project: SPC3039 External Project
// Group D: Umesh, Osina, Yousif
// ================================================

// Mobile hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link based on current page
const currentPage = window.location.pathname.split('/').pop();
navItems.forEach(function (link) {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
