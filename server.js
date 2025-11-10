// ============================================
// STRIPE BACKEND SERVER
// Node.js/Express server for Stripe integration
// ============================================

// Install dependencies:
// npm install express stripe dotenv cors body-parser

// Load .env file only in local development (Railway uses environment variables directly)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');

// Debug: Log all environment variable names (not values) to verify Railway is injecting them
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set');
console.log('- STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'SET ✓' : 'NOT SET ✗');

// Check if Stripe key is available
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('\n❌ ERROR: STRIPE_SECRET_KEY environment variable is not set!');
    console.log('\nIn Railway dashboard:');
    console.log('1. Go to your project');
    console.log('2. Click "Variables" tab');
    console.log('3. Add variable: STRIPE_SECRET_KEY');
    console.log('4. Redeploy the service\n');
    process.exit(1);
}

console.log('✓ Stripe key loaded successfully');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS Configuration - Must be before other middleware
const allowedOrigins = [
    'http://localhost:5500',
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'https://stellarmeritstatuary.com',
    'https://www.stellarmeritstatuary.com'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            console.log('✓ CORS allowed for origin:', origin);
            callback(null, true);
        } else {
            console.log('✗ CORS blocked origin:', origin);
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());
// Remove static file serving - Railway is API only, static files on main hosting

// Port configuration
const PORT = process.env.PORT || 3000;

// ============================================
// HEALTH CHECK ENDPOINT
// Railway uses this to verify the server is running
// ============================================
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Stellar Merit Statuary API', 
        status: 'running',
        endpoints: ['/create-checkout-session', '/webhook', '/health']
    });
});

// ============================================
// CREATE CHECKOUT SESSION
// Stripe Checkout redirect flow with Price IDs and Shipping Rates
// ============================================
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { lineItems, shippingRates } = req.body;
        
        // Create session configuration
        const sessionConfig = {
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/shop.html`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            billing_address_collection: 'required',
        };
        
        // Add shipping options if shipping rate IDs are provided
        if (shippingRates && shippingRates.length > 0) {
            sessionConfig.shipping_options = shippingRates.map(rateId => ({
                shipping_rate: rateId,
            }));
        }
        
        const session = await stripe.checkout.sessions.create(sessionConfig);
        
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// CREATE PAYMENT INTENT
// For custom payment flows
// ============================================
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, items } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                items: JSON.stringify(items),
            },
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// WEBHOOK HANDLER
// Handle Stripe webhook events
// ============================================
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!', paymentIntent.id);
            // TODO: Fulfill the order, send confirmation email, etc.
            break;
            
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Checkout session completed!', session.id);
            // TODO: Fulfill the order, send confirmation email, etc.
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({received: true});
});

// ============================================
// START SERVER
// ============================================
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Stripe integration ready!');
    console.log('CORS enabled for: stellarmeritstatuary.com and localhost');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
