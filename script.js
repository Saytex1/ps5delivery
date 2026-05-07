document.addEventListener('DOMContentLoaded', () => {

  // =================== NAVBAR SCROLL ===================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function onScroll() {
    // Navbar background
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // =================== HAMBURGER MENU ===================
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // =================== FAQ ACCORDION ===================
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if wasn't active)
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // =================== SCROLL REVEAL ===================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // =================== HERO PARTICLES ===================
  const particlesContainer = document.getElementById('particles');
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';

    // Random color
    const colors = ['#7b2ff2', '#c471f5', '#00d4ff', '#f72585'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particlesContainer.appendChild(particle);
  }

  // =================== ORDER FORM ===================
  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pack = document.getElementById('pack').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const duration = document.getElementById('duration').value;

    const packNames = { solo: 'Pack Solo (80 DH/jour)', duo: 'Pack Duo (100 DH/jour)', squad: 'Pack Squad (140 DH/jour)' };

    // Build WhatsApp message
    const message = encodeURIComponent(
      `🎮 Nouvelle commande PS5Delivery!\n\n` +
      `📦 Pack: ${packNames[pack]}\n` +
      `👤 Nom: ${name}\n` +
      `📞 Tél: ${phone}\n` +
      `📍 Ville: ${city}\n` +
      `📅 Date: ${date}\n` +
      `⏱️ Durée: ${duration} jour(s)`
    );

    // Open WhatsApp (replace with actual number)
    window.open(`https://wa.me/212600000000?text=${message}`, '_blank');
  });

  // =================== PACK CTA PRESELECT ===================
  document.querySelectorAll('.pack-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardEl = e.target.closest('.pack-card');
      const cards = document.querySelectorAll('.pack-card');
      const index = Array.from(cards).indexOf(cardEl);
      const packValues = ['solo', 'duo', 'squad'];
      
      setTimeout(() => {
        document.getElementById('pack').value = packValues[index];
      }, 500);
    });
  });

  // =================== SET MIN DATE ===================
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
  dateInput.value = today;
});
