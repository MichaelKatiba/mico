/**
 * Mico CSS Framework - Theme Switcher
 *
 * This script provides functionality to switch between light and dark modes.
 * It supports:
 * - Light/dark mode toggle
 * - System preference detection
 * - Theme persistence using localStorage
 */

class MicoThemeManager {
  constructor(options = {}) {
    // Default options
    this.options = {
      storageKey: 'mico-theme',
      defaultTheme: 'light',
      supportedThemes: ['light', 'dark'],
      toggleSelector: '[data-theme-toggle]',
      ...options
    };

    // Initialize
    this.init();
  }

  init() {
    // Set initial theme
    this.setInitialTheme();

    // Set up event listeners
    this.setupEventListeners();

    // Dispatch event that theme system is ready
    document.dispatchEvent(new CustomEvent('mico:theme-ready', {
      detail: { theme: this.getCurrentTheme() }
    }));
  }

  setInitialTheme() {
    // Check for saved theme
    const savedTheme = localStorage.getItem(this.options.storageKey);

    if (savedTheme && this.options.supportedThemes.includes(savedTheme)) {
      // Use saved theme
      this.setTheme(savedTheme);
    } else if (savedTheme === 'system') {
      // Use system preference
      this.setTheme('system');
    } else {
      // Use default theme
      this.setTheme(this.options.defaultTheme);
    }
  }

  setupEventListeners() {
    // Theme toggle button
    const toggleButtons = document.querySelectorAll(this.options.toggleSelector);
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
      });
    });

    // Listen for system preference changes
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', () => {
      if (this.getCurrentTheme() === 'system') {
        this.applySystemTheme();
      }
    });
  }

  getCurrentTheme() {
    const dataTheme = document.documentElement.getAttribute('data-theme');
    return dataTheme || 'system';
  }

  setTheme(theme) {
    if (!theme || (theme !== 'system' && !this.options.supportedThemes.includes(theme))) {
      console.warn(`Theme "${theme}" is not supported. Using default theme.`);
      theme = this.options.defaultTheme;
    }

    // Save theme preference
    localStorage.setItem(this.options.storageKey, theme);

    if (theme === 'system') {
      // Remove data-theme attribute to use system preference
      document.documentElement.removeAttribute('data-theme');
      this.applySystemTheme();
    } else {
      // Set data-theme attribute
      document.documentElement.setAttribute('data-theme', theme);
    }

    // Update toggle buttons
    const toggleButtons = document.querySelectorAll(this.options.toggleSelector);
    toggleButtons.forEach(button => {
      const isDark = theme === 'dark' || (theme === 'system' && this.isSystemDarkMode());
      button.setAttribute('aria-pressed', isDark);

      // Update icon if it exists
      const lightIcon = button.querySelector('.theme-light-icon');
      const darkIcon = button.querySelector('.theme-dark-icon');

      if (lightIcon && darkIcon) {
        lightIcon.style.display = isDark ? 'block' : 'none';
        darkIcon.style.display = isDark ? 'none' : 'block';
      }
    });

    // Dispatch theme change event
    document.dispatchEvent(new CustomEvent('mico:theme-changed', {
      detail: { theme }
    }));
  }

  applySystemTheme() {
    // Apply appropriate theme based on system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Update toggle buttons
    const toggleButtons = document.querySelectorAll(this.options.toggleSelector);
    toggleButtons.forEach(button => {
      button.setAttribute('aria-pressed', prefersDarkScheme.matches);

      // Update icon if it exists
      const lightIcon = button.querySelector('.theme-light-icon');
      const darkIcon = button.querySelector('.theme-dark-icon');

      if (lightIcon && darkIcon) {
        lightIcon.style.display = prefersDarkScheme.matches ? 'block' : 'none';
        darkIcon.style.display = prefersDarkScheme.matches ? 'none' : 'block';
      }
    });
  }

  isSystemDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.micoThemeManager = new MicoThemeManager();
});
