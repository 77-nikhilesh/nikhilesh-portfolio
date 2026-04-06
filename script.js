/* Portfolio interactions */
document.documentElement.classList.add('js-ready');


(() => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

(() => {
  const nav = document.getElementById('navbar');
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!nav || !btn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    document.querySelectorAll('.nav-links a').forEach((link) => {
      const id = link.getAttribute('href');
      const section = document.querySelector(id);
      if (!section) return;
      const active = window.scrollY >= section.offsetTop - 120;
      link.classList.toggle('active', active);
    });
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) closeMenu();
  });
})();

(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const success = document.getElementById('form-success');
  const fields = [name, email, message];

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  function setError(input, text) {
    input.classList.add('error');
    document.getElementById(`${input.id}-error`).textContent = text;
  }

  function clearError(input) {
    input.classList.remove('error');
    document.getElementById(`${input.id}-error`).textContent = '';
  }

  function validate() {
    let ok = true;
    if (!name.value.trim()) {
      setError(name, 'Please enter your name.');
      ok = false;
    } else clearError(name);

    if (!email.value.trim()) {
      setError(email, 'Please enter your email.');
      ok = false;
    } else if (!validateEmail(email.value)) {
      setError(email, 'Please enter a valid email address.');
      ok = false;
    } else clearError(email);

    if (message.value.trim().length < 10) {
      setError(message, 'Please enter at least 10 characters.');
      ok = false;
    } else clearError(message);
    return ok;
  }

  fields.forEach((field) => field.addEventListener('input', () => clearError(field)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.remove('show');
    if (!validate()) return;
    const subject = encodeURIComponent(`Portfolio enquiry from ${name.value.trim()}`);
    const body = encodeURIComponent(`Name: ${name.value.trim()}
Email: ${email.value.trim()}

Message:
${message.value.trim()}`);
    window.location.href = `mailto:nikhileshyadavkk@gmail.com?subject=${subject}&body=${body}`;
    success.classList.add('show');
    form.reset();
  });
})();
