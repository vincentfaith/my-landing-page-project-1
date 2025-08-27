// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('show');
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      navLinks.classList.remove('show'); // close on mobile
      window.scrollTo({
        top: document.querySelector(id).offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Typing effect =====
const roles = [
  "Web Developer",
  "Funnel Builder",
  "Automation Nerd"
];
const typingEl = document.getElementById('typing');
let r = 0, i = 0, deleting = false;

function type() {
  const word = roles[r];
  typingEl.textContent = word.slice(0, i);
  if (!deleting) {
    if (i < word.length) i++;
    else { deleting = true; setTimeout(type, 900); return; }
  } else {
    if (i > 0) i--;
    else { deleting = false; r = (r + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

// ===== Scroll reveal (IntersectionObserver) =====
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Popup modal =====
const popup = document.getElementById('popup');
const openers = [document.getElementById('openPopup'), document.getElementById('openPopup2'), document.getElementById('openPopup3')].filter(Boolean);
const closeBtn = document.getElementById('closePopup');

openers.forEach(btn => btn.addEventListener('click', () => {
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.querySelector('#popup .popup-content').focus?.(), 0);
}));

function closePopup() {
  popup.style.display = 'none';
  document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closePopup);
popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

// ===== Fake submit (show toast) =====
// Replace this with your real submit (AJAX/fetch/WhatsApp redirect)
const form = document.getElementById('inquiryForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  const data = Object.fromEntries(new FormData(form));
  if (!data.name || !data.email || !data.details) return;

  // Example: WhatsApp redirect (uncomment to use)
  // const msg = encodeURIComponent(Hi Vincent! I'm ${data.name}. Email: ${data.email}\nProject: ${data.details});
  // window.open(https://wa.me/60123456789?text=${msg}, '_blank');

  // Example: fetch to your backend (POST)
  // fetch('/api/inquiry', { method:'POST', body: new FormData(form) });

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
  form.reset();
  closePopup();
});