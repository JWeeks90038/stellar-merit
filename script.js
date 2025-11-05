// ============================================
// STELLAR MERIT STATUARY - JAVASCRIPT
// Interactive functionality for the website
// ============================================

// ============================================
// MOBILE NAVIGATION MENU
// Toggles mobile menu open/closed
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu icon
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});

// ============================================
// HERO CAROUSEL
// Automatic image carousel with manual controls
// ============================================
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        // Only initialize if carousel elements exist
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Set up button event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Set up indicator event listeners
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start automatic slideshow
        this.startAutoPlay();
        
        // Pause on hover
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide index
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Carousel();
});

// ============================================
// LIGHTBOX MODAL
// Full-screen image viewer for gallery items
// ============================================
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxDescription = document.getElementById('lightboxDescription');
        this.lightboxPrice = document.getElementById('lightboxPrice');
        this.closeBtn = document.querySelector('.lightbox-close');
        
        // Only initialize if lightbox exists
        if (this.lightbox) {
            this.init();
        }
    }
    
    init() {
        // Set up gallery item click listeners
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(imageWrapper => {
            imageWrapper.addEventListener('click', (e) => {
                const item = imageWrapper.closest('.gallery-item');
                this.open(item);
            });
        });
        
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Close when clicking outside the image
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open(galleryItem) {
        // Get data from gallery item
        const imageSrc = galleryItem.querySelector('.gallery-image img').src;
        const title = galleryItem.querySelector('.gallery-info h3').textContent;
        const description = galleryItem.querySelector('.description').textContent;
        const price = galleryItem.querySelector('.price').textContent;
        
        // Set lightbox content
        this.lightboxImage.src = imageSrc;
        this.lightboxImage.alt = title;
        this.lightboxTitle.textContent = title;
        this.lightboxDescription.textContent = description;
        this.lightboxPrice.textContent = price;
        
        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Lightbox();
});

// ============================================
// PRODUCT FILTER
// Filter gallery items by category
// ============================================
class ProductFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        // Only initialize if filter buttons exist
        if (this.filterButtons.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterItems(filter);
                this.setActiveButton(button);
            });
        });
    }
    
    filterItems(category) {
        this.galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                // Show item with fade-in animation
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
    }
    
    setActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Initialize product filter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ProductFilter();
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// Handle form submission with validation
// ============================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.formMessage = document.getElementById('formMessage');
        
        // Only initialize if form exists
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }
    
    async submitForm() {
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        this.showMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
        this.form.reset();
        
        // In a real application, you would send the data to a server:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                this.showMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
                this.form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            this.showMessage('error', 'Sorry, there was an error sending your message. Please try again or email us directly.');
        }
        */
    }
    
    validateForm(data) {
        // Check required fields
        if (!data.name) {
            this.showMessage('error', 'Please enter your name.');
            return false;
        }
        
        if (!data.email) {
            this.showMessage('error', 'Please enter your email address.');
            return false;
        }
        
        if (!this.validateEmail(data.email)) {
            this.showMessage('error', 'Please enter a valid email address.');
            return false;
        }
        
        if (!data.message) {
            this.showMessage('error', 'Please enter a message.');
            return false;
        }
        
        return true;
    }
    
    validateEmail(email) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showMessage(type, message) {
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        
        // Scroll to message
        this.formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ContactForm();
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// Smooth scrolling behavior for internal links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (targetId === '#' || targetId === '') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// SCROLL ANIMATIONS
// Add fade-in animations to elements as they scroll into view
// ============================================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Only run if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );
            
            // Observe elements that should animate
            const animateElements = document.querySelectorAll(
                '.product-card, .gallery-item, .about-content, .contact-grid'
            );
            
            animateElements.forEach(element => {
                observer.observe(element);
            });
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ScrollAnimations();
});

// ============================================
// IMAGE LAZY LOADING FALLBACK
// Fallback for browsers that don't support native lazy loading
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback: Use Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// UTILITY FUNCTIONS
// Helper functions used throughout the site
// ============================================

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function to ensure a function is called at most once per interval
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Log page load time for performance monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});
