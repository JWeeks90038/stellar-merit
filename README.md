# Stellar Merit Statuary Website

A modern, responsive website for showcasing handcrafted cement statues.

## 🎨 Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Hero Carousel**: Auto-playing image carousel with manual controls
- **Product Gallery**: Grid-based gallery with category filtering
- **Lightbox Modal**: Click to view larger images with details
- **Contact Form**: Validated contact form with user feedback
- **Smooth Animations**: Scroll animations and hover effects
- **Clean Design**: Natural color palette reflecting cement/statuary

## 📁 Project Structure

```
stellar-merit/
├── index.html          # Home page with hero carousel
├── shop.html           # Gallery page with filterable products
├── about.html          # About the artist and business
├── contact.html        # Contact form and information
├── styles.css          # Main stylesheet with responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Image directory
    ├── hero/           # Carousel images
    ├── products/       # Product photos
    └── about/          # About page images
```

## 🖼️ Image Requirements

To complete the website, add your images to the appropriate folders:

### Hero Images (images/hero/)
- `meditating-dog-1.jpg` - Main hero image of meditating dog
- `owl-1.jpg` - Hero image of owl statue
- `collection.jpg` - Wide shot of statue collection

### Product Images (images/products/)
- `meditating-dog-1.jpg`, `meditating-dog-2.jpg`, `meditating-dog-3.jpg`
- `owl-1.jpg`, `owl-2.jpg`, `owl-3.jpg`
- `buddha-1.jpg`, `garden-gnome-1.jpg` (optional)

### About Images (images/about/)
- `artist.jpg` - Photo of the artist
- `studio.jpg` - Studio workspace
- `process-1.jpg`, `process-2.jpg` - Work in progress photos

**Recommended Image Sizes:**
- Hero images: 1920x1080px (16:9)
- Product images: 800x800px (1:1 square)
- About images: 800x600px (4:3)

## 🚀 Getting Started

1. **Add Your Images**: Place your statue photos in the appropriate folders
2. **Open the Website**: Open `index.html` in a web browser
3. **Customize Content**: Edit HTML files to update text, prices, and descriptions
4. **Adjust Colors**: Modify CSS variables in `styles.css` to change the color scheme

## 🎨 Customization

### Colors
Edit the CSS variables at the top of `styles.css`:

```css
:root {
    --color-primary: #6b7280;
    --color-accent: #8b7355;
    /* etc. */
}
```

### Product Information
Edit products in `shop.html`:
- Update titles in `<h3>` tags
- Change descriptions in `.description` paragraphs
- Modify prices in `.price` paragraphs

### Contact Information
Update contact details in `contact.html`:
- Email address
- Instagram handle
- Business hours

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: ES6+ classes and modern APIs
- **No dependencies**: Pure HTML/CSS/JS (no frameworks required)

### JavaScript Features
- Image carousel with auto-play
- Lightbox modal for gallery images
- Product filtering by category
- Form validation
- Smooth scroll animations
- Mobile menu toggle
- Lazy loading images

## 📝 To-Do / Future Enhancements

- [ ] Add actual image files
- [ ] Set up email backend for contact form
- [ ] Add shopping cart functionality
- [ ] Integrate payment processing
- [ ] Add customer testimonials section
- [ ] Implement blog/news section
- [ ] Add search functionality
- [ ] Optimize images for web

## 📄 License

Copyright © 2025 Stellar Merit Statuary. All rights reserved.

## 📧 Contact

- **Instagram**: [@stellarmerit_statuary](https://instagram.com/stellarmerit_statuary)
- **Email**: info@stellarmeritstatuary.com

---

Built with ❤️ for Stellar Merit Statuary
