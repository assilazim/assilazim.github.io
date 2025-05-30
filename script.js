document.addEventListener('DOMContentLoaded', () => {
  gsap.utils.toArray('.fade-card').forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      delay: index * 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });
  });
});

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', function () {
  const typedOutput = document.getElementById('typed-output');
  if (typedOutput) {
    new Typed('#typed-output', {
      strings: ['Software Engineer', 'Tech Enthusiast', 'Your New Best Friend :)'],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  gsap.utils.toArray('section, header#home').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      }
    });
  });

  const allSections = [document.querySelector('header#home'), ...document.querySelectorAll('section')].filter(Boolean);
  allSections.forEach(section => {
    if (!section || !section.id) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom top',
      onEnter: () => setActiveLink(section.id),
      onEnterBack: () => setActiveLink(section.id)
    });
  });

  function setActiveLink(id) {
    document.querySelectorAll('nav a').forEach(link => {
      const href = link.getAttribute('href');
      const sectionId = href && href.startsWith('#') ? href.substring(1) : null;
      link.classList.toggle('active', sectionId === id);
    });
  }
});

const canvas = document.getElementById('bg-animation');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('header').offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const circles = Array.from({ length: 120 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 0.5,
    dx: Math.random() * 1.4 - 0.7,
    dy: Math.random() * 1.4 - 0.7,
    opacity: Math.random() * 0.6 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const c of circles) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0, 122, 255, ${c.opacity})`;
      ctx.fill();
      c.x += c.dx;
      c.y += c.dy;
      if (c.x < 0 || c.x > width) c.dx *= -1;
      if (c.y < 0 || c.y > height) c.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
