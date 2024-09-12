// smooth-scroll.js

(function() {
  // Check if browser supports smooth scrolling
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  // Easing function for smooth animation
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // Smooth scroll function
  function smoothScroll(targetElement, duration) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Handle click events on anchor links
  function handleLinkClick(event) {
    const href = event.currentTarget.getAttribute('href');

    // Check if the link is an anchor link
    if (href.startsWith('#')) {
      event.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const duration = parseFloat(event.currentTarget.getAttribute('data-scroll-duration')) || 1000;
        
        if (supportsNativeSmoothScroll) {
          // Use native smooth scrolling if supported
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Use JS fallback for unsupported browsers
          smoothScroll(targetElement, duration);
        }
      }
    }
  }

  // Attach click event listeners to all anchor links
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
  });
})();

//Scroll on animate
function supportsIntersectionObserver() {
  return 'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;
}

function fallbackAnimations() {
  const animatedElements = document.querySelectorAll('.animate');
  
  function checkElements() {
    const windowHeight = window.innerHeight;
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const triggerPoint = (parseFloat(element.getAttribute('data-trigger') || 0.1) * windowHeight);
      if (elementTop < windowHeight - triggerPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  checkElements();
  window.addEventListener('scroll', checkElements);
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate');

  if (supportsIntersectionObserver()) {
    animatedElements.forEach((element) => {
      const triggerPoint = parseFloat(element.getAttribute('data-trigger') || 0.1);
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('active');
          } else {
            element.classList.remove('active');
          }
        });
      }, {
        threshold: triggerPoint
      });

      // Apply custom duration
      const duration = element.getAttribute('data-duration');
      if (duration) {
        element.style.transitionDuration = `${duration}ms`;
      }

      // Apply custom delay
      const delay = element.getAttribute('data-delay');
      if (delay) {
        element.style.transitionDelay = `${delay}ms`;
      }

      // Apply custom timing function
      const timingFunction = element.getAttribute('data-timing-function');
      if (timingFunction) {
        element.style.transitionTimingFunction = timingFunction;
      }

      observer.observe(element);
    });
  } else {
    fallbackAnimations();
  }
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);