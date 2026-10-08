// MiniGame Premium Animations
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.panel, .info-card, .feature-card').forEach(el => {
    observer.observe(el);
  });

  // Mouse glow effect for primary button
  const primaryBtn = document.querySelector('.primary-btn');
  if (primaryBtn) {
    primaryBtn.addEventListener('mousemove', (e) => {
      const rect = primaryBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      primaryBtn.style.setProperty('--mouse-x', x + 'px');
      primaryBtn.style.setProperty('--mouse-y', y + 'px');
    });
  }

  // Display cards interactive effect
  const displays = document.querySelectorAll('.display');
  displays.forEach(display => {
    display.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('display-tft') 
        ? 'translateX(-18%) scale(1.02)' 
        : 'scale(1.02)';
    });

    display.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const displays = document.querySelectorAll('.display');
    
    displays.forEach((display, index) => {
      const speed = 0.5 + (index * 0.1);
      display.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.primary-btn, .ghost-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Animate counters if they exist
  const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

  // Gradient text animation
  const gradientTexts = document.querySelectorAll('h1');
  gradientTexts.forEach(text => {
    text.style.backgroundImage = 'linear-gradient(135deg, var(--text), var(--primary))';
  });
});

// Prevent ripple overflow
const style = document.createElement('style');
style.textContent = `
  .primary-btn, .ghost-btn {
    position: relative;
    overflow: hidden;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
