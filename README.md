# Mico CSS Framework

Welcome to Mico - a utility-first CSS framework for building beautiful, responsive, and customizable websites with ease!

Mico is a lightweight and versatile CSS framework designed to make building responsive and beautiful web interfaces a breeze. With Mico's utility classes, you can quickly create modern and stylish websites without the bloat of larger frameworks.

## Features

- **Utility-First Approach**: Build custom designs without leaving your HTML using composable utility classes.
- **Responsive Design**: Mico ensures that your website looks great on any device, from desktops to smartphones.
- **Easy to Use**: With intuitive utility classes, Mico makes it simple to create stunning layouts.
- **Customizable**: Tailor Mico to fit your unique style with customizable variables and utility classes.
- **Lightweight**: Mico is designed to be lightweight, ensuring fast loading times for your website.
- **Flexible**: Whether you're building a blog, portfolio, or e-commerce site, Mico adapts to your needs.
- **Accessible**: Built with accessibility in mind, following WCAG 2.1 AA standards.
- **Dark Mode Support**: Seamlessly switch between light and dark modes.
- **Theming System**: Create custom themes with ease.

## Getting Started

### Via CDN

Add the following link tag to your HTML file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/css/mico.min.css">
```

For JavaScript functionality (theme switching, etc.):

```html
<script src="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/js/mico.min.js"></script>
```

### Local Installation

1. Clone the repository:

```bash
git clone https://github.com/michaelkatiba/mico.git
```

2. Install dependencies:

```bash
npm install
```

3. Build the CSS:

```bash
npm run build:css
```

4. Link the CSS in your HTML:

```html
<link rel="stylesheet" href="path/to/dist/css/mico.min.css">
```

### WordPress (Oxygen Builder Integration)
_More integration coming soon_

Add this code snippet using your preferred code snippet plugin:

```php
function enqueue_mico_framework() {
    if (defined('SHOW_CT_BUILDER') && !defined('OXYGEN_IFRAME')) {
        return;
    }

    wp_enqueue_style(
        'mico-framework',
        'https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/css/mico.min.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'mico-framework-js',
        'https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/js/mico.min.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_mico_framework', 999);
```

### Usage with Astro

Import Mico in your Astro project:

```astro
---
// In your Astro layout or component
import '../path/to/dist/css/mico.min.css';
---
```

## Customization

### Using CSS Variables

Mico uses CSS variables for easy customization. Override them in your own CSS:

```css
:root {
  --mico-color-primary: #3498db;
  --mico-color-secondary: #2ecc71;
  --mico-color-accent: #e74c3c;
}
```

### Using the Theme System

Mico includes a powerful theming system. Add the theme CSS and JavaScript:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/css/themes/theme.min.css">
<script src="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/js/mico.theme.min.js"></script>
```

Then use the theme attributes:

```html
<!-- Theme toggle button -->
<button data-theme-toggle>Toggle Dark Mode</button>

<!-- Theme selector dropdown -->
<select data-theme-select>
  <option value="system">System Preference</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="ocean">Ocean</option>
  <option value="forest">Forest</option>
  <option value="sunset">Sunset</option>
</select>
```

### Creating a Custom Build

You can create a custom build with only the utilities you need:

1. Edit the `mico.config.js` file to include only the utilities you need.
2. Run the custom build script:

```bash
npm run build:custom
```

3. Use the custom build in your HTML:

```html
<link rel="stylesheet" href="path/to/dist/css/mico.custom.min.css">
```

## Utility Classes

Mico provides a comprehensive set of utility classes for building custom interfaces. Here are a few examples:

### Example: Button

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-sm">Small Button</button>
<button class="btn btn-lg">Large Button</button>
<button class="btn btn-outline">Outline Button</button>
```

### Example: Card-like Element Using Utilities

```html
<div class="d-flex flex-column border rounded overflow-hidden">
  <div class="p-3 bg-light border-bottom">Card Header</div>
  <div class="p-4 flex-grow-1">
    <h3 class="mb-3">Card Title</h3>
    <p class="mb-0">This is a card with some content.</p>
  </div>
  <div class="p-3 bg-light border-top">
    <button class="btn btn-sm btn-primary">Read More</button>
  </div>
</div>
```

## Browser Support

Mico supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Usage Notes

- Production-ready for most projects
- Optimized for performance and accessibility
- Actively being developed with frequent updates

## Feedback

Your feedback and bug reports are valuable to us as we work towards improving Mico. Feel free to open issues on GitHub.

---
For more information and documentation, visit our GitHub repository.

```
mico
├─ .idea
│  ├─ mico.iml
│  ├─ modules.xml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ css
│  ├─ components
│  │  ├─ accordion.comp.css
│  │  ├─ alert.comp.css
│  │  ├─ article.comp.css
│  │  ├─ avatar.comp.css
│  │  ├─ badge.comp.css
│  │  ├─ button.comp.css
│  │  ├─ calender.comp.css
│  │  ├─ card.comp.css
│  │  ├─ form.comp.css
│  │  ├─ modal.comp.css
│  │  ├─ navigation.comp.css
│  │  ├─ pagination.comp.css
│  │  ├─ select.comp.css
│  │  ├─ skeleton.comp.css
│  │  ├─ slider.comp.css
│  │  ├─ table.comp.css
│  │  ├─ tabs.comp.css
│  │  └─ tooltip.comp.css
│  ├─ mico.accessibility.css
│  ├─ mico.css
│  ├─ mico.variables.css
│  ├─ motion
│  │  └─ mico.motion.css
│  ├─ presets
│  │  ├─ default.pre.css
│  │  └─ oxygenbuilder.pre.css
│  └─ utils
│     ├─ animation.utils.css
│     ├─ border.utils.css
│     ├─ button.utils.css
│     ├─ color.utils.css
│     ├─ layout.utils.css
│     ├─ navigation.utils.css
│     ├─ spacing.utils.css
│     ├─ states.utils.css
│     └─ typography.utils.css
├─ img
│  └─ Lighthouse Pixels Web Design Brand Colors.png
├─ js
│  ├─ mico.motion.js
│  ├─ mico.script.js
│  └─ mico.skeletonloader.js
├─ LICENSE
└─ README.md

```