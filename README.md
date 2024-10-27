# Mico CSS Framework
Welcome to Mico - your go-to solution for building beautiful, responsive, and customizable websites with ease!
Mico is a lightweight and versatile CSS framework designed to make building responsive and beautiful web interfaces a breeze. With Mico, you can quickly create modern and stylish websites without the bloat of larger frameworks.

## Features

- Responsive Design: Mico ensures that your website looks great on any device, from desktops to smartphones.
- Easy to Use: With intuitive classes and components, Mico makes it simple to create stunning layouts.
- Customizable: Tailor Mico to fit your unique style with customizable variables and utility classes.
- Lightweight: Mico is designed to be lightweight, ensuring fast loading times for your website.
- Flexible: Whether you're building a blog, portfolio, or e-commerce site, Mico adapts to your needs.

## Getting Started

### Via CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/css/mico.css">
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
        'https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/css/mico.css',
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_mico_framework', 999);
```

## Usage Notes
- Suitable for experimentation and small projects
- Perfect for learning and testing environments
- Not recommended for production use on critical projects yet
- Actively being developed with frequent updates

## Feedback
Your feedback and bug reports are valuable to us as we work towards a stable release. Feel free to open issues on GitHub.

---
For more information and documentation, visit our GitHub repository.
