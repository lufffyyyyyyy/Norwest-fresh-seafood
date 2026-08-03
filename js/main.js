// ================================================
// Norwest Fresh Seafood — Main JavaScript File
// Project: SPC3039 External Project
// Group D: Umesh, Osina, Yousif
// ================================================

// ── LOADING SCREEN ──
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () {
      loader.classList.add('fade-out');
      setTimeout(function () {
        loader.style.display = 'none';
      }, 600);
    }, 1800);
  }
});

// ── MOBILE HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(function (link) {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── SMOOTH PAGE TRANSITIONS ──
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('page-loaded');
});

document.querySelectorAll('a').forEach(function (link) {
  const href = link.getAttribute('href');
  if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(function () {
        window.location.href = href;
      }, 300);
    });
  }
});

// ── PRODUCT FILTER (Fresh Seafood Page) ──
function filterProducts(category) {
  const grids = document.querySelectorAll('.product-grid');
  const titles = document.querySelectorAll('.product-section-title');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (category === 'all') {
    grids.forEach(g => g.style.display = 'grid');
    titles.forEach(t => t.style.display = 'inline-block');
  } else {
    grids.forEach(function (grid) {
      const cat = grid.getAttribute('data-category');
      const title = grid.previousElementSibling;
      if (cat === category) {
        grid.style.display = 'grid';
        if (title) title.style.display = 'inline-block';
      } else {
        grid.style.display = 'none';
        if (title) title.style.display = 'none';
      }
    });
  }
}

// ── ANIMATED COUNTERS ──
function animateCounter(el, target, suffix) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(function (el) {
  counterObserver.observe(el);
});

// ── BACK TO TOP BUTTON ──
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── OPEN NOW INDICATOR ──
function checkOpenStatus() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
  const hour = now.getHours();
  const isOpen = hour >= 7 && hour < 21;
  const indicator = document.getElementById('openIndicator');
  if (indicator) {
    indicator.textContent = isOpen ? '🟢 Open Now' : '🔴 Closed';
    indicator.style.color = isOpen ? '#27AE60' : '#C0392B';
  }
}
checkOpenStatus();
setInterval(checkOpenStatus, 60000);

// ── FRESH TODAY TICKER ──
const tickerItems = [
  '🐟 Salmon Fillets $49.99/kg',
  '🦐 Large Tiger Prawns $38.99/kg',
  '🦪 Sydney Rock Oysters $26.99/doz',
  '🐟 Whole Barramundi $23.99/kg',
  '🍣 Sashimi Pack $25.00',
  '🦀 Blue Swimmer Crab $36.99/kg',
  '🐙 Marinated Octopus $44.99/kg',
  '🥗 Seafood Salad $9.50 Sml',
];

const ticker = document.getElementById('ticker');
if (ticker) {
  ticker.innerHTML = tickerItems.map(i => `<span>${i}</span>`).join(' &nbsp;&nbsp;•&nbsp;&nbsp; ');
}

// ── PRE-ORDER FORM VALIDATION ──
window.submitOrder = function (e) {
  e.preventDefault();
  const errorDiv = document.getElementById('formError');
  const fields = ['firstName', 'lastName', 'phone', 'email', 'product', 'quantity', 'pickupDate', 'pickupTime'];
  let allGood = true;

  fields.forEach(function (f) {
    const el = document.getElementById(f);
    if (el && !el.value.trim()) {
      el.style.borderColor = '#C0392B';
      allGood = false;
    } else if (el) {
      el.style.borderColor = '#DDD';
    }
  });

  if (!allGood) {
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Please fill in all required fields before submitting.';
    return;
  }

  errorDiv.style.display = 'none';
  document.getElementById('preorderForm').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
