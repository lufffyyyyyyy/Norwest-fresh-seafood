// ================================================
// Norwest Fresh Seafood — Main JavaScript File
// Project: SPC3039 External Project
// Group D: Umesh, Osina, Yousif
// ================================================

// Mobile hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// Highlight active nav link based on current page
const currentPage = window.location.pathname.split('/').pop();
const navItems2 = document.querySelectorAll('.nav-links a');
navItems2.forEach(function (link) {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
