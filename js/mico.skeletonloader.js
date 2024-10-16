// skeleton-loader.js
class SkeletonLoader {
    constructor() {
      this.contentElements = document.querySelectorAll('[data-loader]');
      this.skeletonContainer = document.createElement('div');
      this.skeletonContainer.id = 'skeleton-container';
      document.body.insertBefore(this.skeletonContainer, document.body.firstChild);
      this.init();
    }
  
    init() {
      this.contentElements.forEach(element => {
        const type = element.dataset.loader;
        const skeletonLoader = document.createElement('div');
        skeletonLoader.className = `skeleton-loader skeleton-${type}`;
        skeletonLoader.innerHTML = this.getLoaderContent(type);
        this.skeletonContainer.appendChild(skeletonLoader);

        // Hide the actual content
        element.style.display = 'none';
      });
    }
  
    getLoaderContent(type) {
      switch (type) {
        case 'header':
          return `
            <div class="skeleton skeleton-logo"></div>
            <div class="skeleton-nav">
              <div class="skeleton skeleton-nav-item"></div>
              <div class="skeleton skeleton-nav-item"></div>
              <div class="skeleton skeleton-nav-item"></div>
              <div class="skeleton skeleton-nav-item"></div>
            </div>
          `;
        case 'hero':
          return `
            <div class="skeleton skeleton-hero-title"></div>
            <div class="skeleton skeleton-hero-title"></div>
            <div class="skeleton skeleton-hero-subtitle"></div>
            <div class="skeleton skeleton-hero-cta"></div>
          `;
        case 'left-right':
          return `
            <div class="skeleton skeleton-left-right-image"></div>
            <div class=" skeleton-left-right-content">
              <div class="skeleton skeleton-left-right-title"></div>
              <div class="skeleton skeleton-left-right-text"></div>
              <div class="skeleton skeleton-left-right-text"></div>
            </div>
          `;
        case 'card-grid':
          return Array(3).fill().map(() => `
            <div class="skeleton-card">
              <div class="skeleton skeleton-card-image"></div>
              <div class="skeleton skeleton-card-title"></div>
              <div class="skeleton skeleton-card-text"></div>
            </div>
          `).join('');
        default:
          return '';
      }
    }
  
    showContent() {
      // Remove the skeleton container
      this.skeletonContainer.remove();

      // Show the actual content
      this.contentElements.forEach(element => {
        element.style.display = '';
      });

      console.log('Content loaded, skeleton removed');
    }
  }

// main.js
document.addEventListener('DOMContentLoaded', () => {
  const skeletonLoader = new SkeletonLoader();

  // Simulate content loading
  setTimeout(() => {
    skeletonLoader.showContent();
  }, 2000); 
});