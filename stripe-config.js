// ============================================
// STRIPE PAYMENT INTEGRATION
// Configuration and checkout handling
// ============================================

// IMPORTANT: Replace this with your actual Stripe publishable key (LIVE MODE)
// Get this from: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLISHABLE_KEY = 'pk_live_YOUR_PUBLISHABLE_KEY_HERE';

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// Stripe Checkout Handler
class StripeCheckout {
    constructor(cart) {
        this.cart = cart;
    }
    
    async createCheckoutSession() {
        // Prepare line items for Stripe
        const lineItems = this.cart.cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image.startsWith('http') ? item.image : `${window.location.origin}/${item.image}`],
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
        }));
        
        try {
            // Call your backend to create a checkout session
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lineItems: lineItems,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const session = await response.json();
            
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            
            if (result.error) {
                // Display error to user
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('There was an error processing your checkout. Please try again.');
        }
    }
    
    // Alternative: Use Stripe Payment Element for embedded checkout
    async createPaymentIntent() {
        const total = this.cart.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        try {
            const response = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(total * 100), // Convert to cents
                    items: this.cart.cart,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            return data.clientSecret;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StripeCheckout, STRIPE_PUBLISHABLE_KEY };
}
