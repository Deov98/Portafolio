// ── Tema oscuro / claro ──────────────────────
const themeBtn = document.getElementById('themeBtn');
let dark = true;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  document.body.classList.toggle('light', !dark);
  themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'light') {
  dark = false;
  document.body.classList.add('light');
  themeBtn.textContent = '☀️';
}

// ── Hamburger móvil ──────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ── Scroll reveal ────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Active nav en scroll ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── Botón volver arriba ──────────────────────
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Copiar al portapapeles + Toast ───────────
let toastTimer;
function copyText(text, label) {
  navigator.clipboard.writeText(text).catch(() => {
    const t = document.createElement('textarea');
    t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    document.execCommand('copy'); document.body.removeChild(t);
  });
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = label + ' copiado al portapapeles';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Certificados — modal ─────────────────
const certData = [
  { title: 'Python Esencial', issuer: 'Cisco', year: '2026', img: 'archivos/CertificadoFundamentos.png', link: 'https://www.credly.com/badges/c31aed19-50bc-4b1f-a102-3fa1cdf1120e/public_url'},
  { title: 'HTML & CSS',      issuer: 'AWS', year: '2023', img: 'archivos/awscertificado.png' , link: 'https://www.credly.com/badges/55dc7230-9bb0-49a4-a623-961b2a300634/public_url'},
  // agrega más aquí
];

function openModal(index) {
  const c = certData[index];

  document.getElementById('modalTitle').textContent = c.title;
  document.getElementById('modalMeta').textContent  = c.issuer + ' · ' + c.year;
  document.getElementById('modalImg').src           = c.img;
  document.getElementById('modalImg').alt           = 'Certificado ' + c.title;

  // actualiza el enlace dinámicamente
  const link = document.getElementById('modalLink');
  if (c.link) {
    link.href         = c.link;
    link.style.display = 'inline-flex';
  } else {
    link.style.display = 'none'; // oculta si no hay enlace
  }

  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});



// ── Formulario de contacto ───────────────────────
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('.form-submit');
  const submitLabel = submitButton.querySelector('span');
  const formData = Object.fromEntries(new FormData(contactForm));

  submitButton.disabled = true;
  submitLabel.textContent = 'Enviando...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error('No se pudo enviar el mensaje');

    contactForm.reset();
    formStatus.textContent = '¡Mensaje enviado! Te responderé lo antes posible.';
    formStatus.classList.add('success');
  } catch (error) {
    formStatus.textContent = 'No se pudo enviar. Inténtalo otra vez o escríbeme directamente.';
    formStatus.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = 'Enviar mensaje';
  }
});