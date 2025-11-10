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
        this.lightboxThumbnails = document.getElementById('lightboxThumbnails');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.getElementById('lightboxPrev');
        this.nextBtn = document.getElementById('lightboxNext');
        
        this.currentImages = [];
        this.currentImageIndex = 0;
        
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
        
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousImage());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }
        
        // Close when clicking outside the content
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowLeft') {
                    this.previousImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            }
        });
    }
    
    open(galleryItem) {
        // Get data from gallery item
        const title = galleryItem.querySelector('.gallery-info h3').textContent;
        const description = galleryItem.querySelector('.description').textContent;
        const price = galleryItem.querySelector('.price').textContent;
        
        // Get images array from data attribute
        const imagesData = galleryItem.getAttribute('data-images');
        if (imagesData) {
            try {
                this.currentImages = JSON.parse(imagesData);
            } catch (e) {
                // Fallback to single image
                this.currentImages = [galleryItem.querySelector('.gallery-image img').src];
            }
        } else {
            // Fallback to single image if no data-images attribute
            this.currentImages = [galleryItem.querySelector('.gallery-image img').src];
        }
        
        this.currentImageIndex = 0;
        
        // Set lightbox content
        this.lightboxTitle.textContent = title;
        this.lightboxDescription.textContent = description;
        this.lightboxPrice.textContent = price;
        
        // Display main image and thumbnails
        this.displayImage();
        this.createThumbnails();
        
        // Show/hide navigation buttons
        this.updateNavigationButtons();
        
        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    displayImage() {
        if (this.currentImages.length > 0) {
            this.lightboxImage.src = this.currentImages[this.currentImageIndex];
            this.lightboxImage.alt = this.lightboxTitle.textContent;
        }
    }
    
    createThumbnails() {
        if (!this.lightboxThumbnails) return;
        
        this.lightboxThumbnails.innerHTML = '';
        
        this.currentImages.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.className = 'lightbox-thumbnail';
            if (index === this.currentImageIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.displayImage();
                this.updateThumbnails();
            });
            
            this.lightboxThumbnails.appendChild(thumbnail);
        });
    }
    
    updateThumbnails() {
        if (!this.lightboxThumbnails) return;
        
        const thumbnails = this.lightboxThumbnails.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === this.currentImageIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    updateNavigationButtons() {
        if (this.currentImages.length <= 1) {
            if (this.prevBtn) this.prevBtn.style.display = 'none';
            if (this.nextBtn) this.nextBtn.style.display = 'none';
        } else {
            if (this.prevBtn) this.prevBtn.style.display = 'flex';
            if (this.nextBtn) this.nextBtn.style.display = 'flex';
        }
    }
    
    previousImage() {
        if (this.currentImages.length > 1) {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.currentImages.length) % this.currentImages.length;
            this.displayImage();
            this.updateThumbnails();
        }
    }
    
    nextImage() {
        if (this.currentImages.length > 1) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.currentImages.length;
            this.displayImage();
            this.updateThumbnails();
        }
    }
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        this.currentImages = [];
        this.currentImageIndex = 0;
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

// ============================================
// SHOPPING CART
// Shopping cart functionality with local storage
// ============================================
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartIcon = document.getElementById('cartIcon');
        this.cartClose = document.getElementById('cartClose');
        this.cartItems = document.getElementById('cartItems');
        this.cartCount = document.getElementById('cartCount');
        this.totalAmount = document.getElementById('totalAmount');
        
        // Load cart from local storage
        this.loadCart();
        
        // Only initialize if cart elements exist
        if (this.cartSidebar) {
            this.init();
        }
    }
    
    init() {
        // Add to cart button listeners
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productData = {
                    id: button.getAttribute('data-id'),
                    name: button.getAttribute('data-name'),
                    price: parseFloat(button.getAttribute('data-price')),
                    priceId: button.getAttribute('data-price-id'),
                    shippingId: button.getAttribute('data-shipping-id'),
                    image: button.getAttribute('data-image')
                };
                this.addToCart(productData);
            });
        });
        
        // Cart icon click
        if (this.cartIcon) {
            this.cartIcon.addEventListener('click', () => this.openCart());
        }
        
        // Close cart
        if (this.cartClose) {
            this.cartClose.addEventListener('click', () => this.closeCart());
        }
        
        // Overlay click
        if (this.cartOverlay) {
            this.cartOverlay.addEventListener('click', () => this.closeCart());
        }
        
        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
        
        // Update display
        this.updateCartDisplay();
    }
    
    addToCart(product) {
        // Check if product already exists in cart
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showAddedNotification(product.name);
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }
    
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }
    
    updateCartDisplay() {
        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartCount) {
            this.cartCount.textContent = totalItems;
        }
        
        // Update cart items display
        if (this.cartItems) {
            if (this.cart.length === 0) {
                this.cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            } else {
                this.cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">$${item.price}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="cart.removeFromCart('${item.id}')" aria-label="Remove item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                `).join('');
            }
        }
        
        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (this.totalAmount) {
            this.totalAmount.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    openCart() {
        if (this.cartSidebar) {
            this.cartSidebar.classList.add('active');
        }
        if (this.cartOverlay) {
            this.cartOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
    
    closeCart() {
        if (this.cartSidebar) {
            this.cartSidebar.classList.remove('active');
        }
        if (this.cartOverlay) {
            this.cartOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    showAddedNotification(productName) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${productName} added to cart!`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: var(--color-accent);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    saveCart() {
        localStorage.setItem('stellarMeritCart', JSON.stringify(this.cart));
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('stellarMeritCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
    
    async checkout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Check if Stripe is loaded
        if (typeof Stripe === 'undefined') {
            alert('Payment system is loading. Please try again in a moment.');
            return;
        }
        
        // Prepare line items for Stripe using Price IDs
        const lineItems = this.cart.map(item => ({
            price: item.priceId, // Use the Stripe Price ID
            quantity: item.quantity,
        }));
        
        // Collect all unique shipping rate IDs from the cart
        const shippingRates = [...new Set(this.cart.map(item => item.shippingId).filter(id => id))];
        
        try {
            // Show loading state
            const checkoutBtn = document.querySelector('.checkout-btn');
            const originalText = checkoutBtn.textContent;
            checkoutBtn.textContent = 'Processing...';
            checkoutBtn.disabled = true;
            
            // Call backend to create checkout session
            const response = await fetch('https://stellar-merit-production.up.railway.app/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lineItems: lineItems,
                    shippingRates: shippingRates,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }
            
            const session = await response.json();
            
            // Initialize Stripe with your publishable key (LIVE MODE)
            // IMPORTANT: Replace with your actual LIVE publishable key
            const stripe = Stripe('pk_live_51SQFq4PJjyPRgJadtCEvuedWawUZDiB1mdmZTJQDM4U3c4OnF2NFf2DYAUSf7o4WVep4hzUwhw1Hd17KEaHltsMH00vVEDuCM3');
            
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            
            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('There was an error processing your checkout. Please make sure the server is running and try again.\n\nError: ' + error.message);
            
            // Restore button state
            const checkoutBtn = document.querySelector('.checkout-btn');
            checkoutBtn.textContent = 'Checkout';
            checkoutBtn.disabled = false;
        }
    }
}

// Initialize shopping cart and make it globally accessible
let cart;
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
});
