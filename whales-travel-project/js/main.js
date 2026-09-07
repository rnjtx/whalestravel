/* =========================================================
   WHALES TRAVEL — CONFIG
   Change this email address any time — it is the ONLY
   place the destination email needs to be updated.
========================================================= */
const BOOKING_DESTINATION_EMAIL = "info@whalestravel.com";

/* =========================================================
   NAVBAR: scroll style + active link + mobile menu
========================================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
const sections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href')));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => s && navObserver.observe(s));

/* =========================================================
   REVEAL ON SCROLL
========================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================================
   SUBTLE 3D TILT ON PACKAGE CARDS (desktop only)
========================================================= */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.pkg-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* =========================================================
   BOOKING MODAL
========================================================= */
const modal = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
const selectedPkgName = document.getElementById('selectedPkgName');
const bookingForm = document.getElementById('bookingForm');
const formView = document.getElementById('formView');
const successView = document.getElementById('successView');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const nameField = document.getElementById('nameField');
const phoneField = document.getElementById('phoneField');
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phoneNumber');

let currentPackage = "General Inquiry";

function openModal(pkg) {
  currentPackage = pkg || "General Inquiry";
  selectedPkgName.textContent = currentPackage;
  formView.classList.remove('hide');
  successView.classList.remove('show');
  bookingForm.reset();
  nameField.classList.remove('invalid');
  phoneField.classList.remove('invalid');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-book]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(btn.getAttribute('data-book'));
  });
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
closeSuccessBtn.addEventListener('click', closeModal);

/* ---- sending the booking request ----
   No online payment and no backend server is used.
   This opens the customer's email app with a pre-filled
   message addressed to BOOKING_DESTINATION_EMAIL.
   To connect a fully automatic email service later
   (e.g. Formspree / EmailJS / your own backend), replace
   the body of this function — the rest of the site
   does not need to change. */
function sendBookingRequest({ name, phone, pkg }) {
  const now = new Date().toLocaleString();
  const subject = `New Booking Request - ${pkg}`;
  const body =
`New Booking Request

Customer Name: ${name}
Customer Phone: ${phone}
Selected Package: ${pkg}
Date/Time of Request: ${now}`;

  const mailtoLink = `mailto:${BOOKING_DESTINATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = fullNameInput.value.trim();
  const phone = phoneInput.value.trim();

  const nameValid = name.length > 1;
  const phoneValid = phone.replace(/[^0-9]/g, '').length >= 7;

  nameField.classList.toggle('invalid', !nameValid);
  phoneField.classList.toggle('invalid', !phoneValid);
  if (!nameValid || !phoneValid) return;

  sendBookingRequest({ name, phone, pkg: currentPackage });

  formView.classList.add('hide');
  successView.classList.add('show');
});

/* misc */
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('watchVideoBtn').addEventListener('click', (e) => e.preventDefault());
