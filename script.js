// ── Mobile nav toggle ────────────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
});

// Close menu when a nav link is clicked
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('i').className = 'fas fa-bars';
  });
});

// ── Highlight active nav link on scroll ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ── Contact form handling ────────────────────────────────────
const form      = document.getElementById('contact-form');
const statusEl  = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name)              { showStatus('error', 'Please enter your name.');                   form.name.focus();    return; }
  if (!emailRx.test(email)) { showStatus('error', 'Please enter a valid email address.');    form.email.focus();   return; }
  if (!message)           { showStatus('error', 'Please write a message before sending.');   form.message.focus(); return; }

  // Simulate send — replace this block with a real fetch() to your backend
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';

  await new Promise(r => setTimeout(r, 1400));

  form.reset();
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Send Message';
  showStatus('success', `Thanks ${name}! Message received — Pratyush will get back to you soon.`);
});

function showStatus(type, msg) {
  statusEl.textContent = msg;
  statusEl.className   = 'form-status ' + type;
  statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
