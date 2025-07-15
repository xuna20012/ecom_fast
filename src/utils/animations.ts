// This file contains utility functions for animations and transitions
// that are used throughout the application

/**
 * Adds a smooth reveal animation to elements with the data-aos attribute
 * when they enter the viewport.
 */
export const initAnimations = () => {
  // Observer for intersection detection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add class when element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px 0px -100px 0px' // Slightly before element comes into view
  });

  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(element => {
    element.classList.add('opacity-0', 'transform', 'transition-all', 'duration-700');
    observer.observe(element);
  });
};

/**
 * Smooth scrolling for anchor links
 */
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: offsetTop - 80, // Account for header height
        behavior: 'smooth'
      });
    });
  });
};

/**
 * Initialize all animations and interactions
 */
export const initializeAllAnimations = () => {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initSmoothScroll();
  });
};