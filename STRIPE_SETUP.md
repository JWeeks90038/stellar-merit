# Stellar Merit Statuary - Stripe Integration Setup (LIVE MODE)

This guide will help you integrate Stripe payments into your Stellar Merit Statuary website.

## Prerequisites

- Node.js installed (v14 or higher)
- A Stripe account with live mode activated (sign up at https://stripe.com)
- Basic knowledge of terminal/command line

## Step-by-Step Setup

### 1. Get Your Stripe API Keys (LIVE MODE)

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_live_`)
3. Copy your **Secret key** (starts with `sk_live_`)

⚠️ **IMPORTANT**: You are using LIVE MODE keys. These will process real payments!

### 2. Configure the Frontend

1. Open `script.js`
2. Find line with `const stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY_HERE');`
3. Replace `pk_live_YOUR_PUBLISHABLE_KEY_HERE` with your actual Stripe LIVE publishable key

### 3. Configure the Backend

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` and add your Stripe LIVE secret key:
   ```
   STRIPE_SECRET_KEY=sk_live_your_actual_secret_key_here
   ```

### 4. Install Dependencies

Open a terminal in your project folder and run:

```bash
npm install
```

This will install:
- express (web server)
- stripe (Stripe SDK)
- dotenv (environment variables)
- cors (cross-origin requests)
- body-parser (request parsing)

### 5. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
Server running on http://localhost:3000
```

### 6. Test the Integration

⚠️ **WARNING**: You are in LIVE MODE. Real cards will be charged!

1. Open your website (http://localhost:3000 or open index.html directly)
2. Add items to your cart
3. Click "Checkout"
4. You'll be redirected to Stripe's checkout page
5. Use a REAL credit card to test (you will be charged)

### 7. Testing Without Real Charges

If you want to test without real charges first:

1. Switch to TEST MODE keys (pk_test_ and sk_test_)
2. Use test card numbers like `4242 4242 4242 4242`
3. Once tested, switch back to LIVE MODE keys

## Important Files

- **script.js**: Contains shopping cart and Stripe checkout logic
- **server.js**: Node.js backend that creates Stripe checkout sessions
- **success.html**: Order confirmation page
- **.env**: Your secret Stripe keys (DO NOT commit to GitHub!)
- **package.json**: Node.js dependencies

## Security Notes

⚠️ **NEVER commit your `.env` file to GitHub!**

The `.gitignore` file should include:
```
.env
node_modules/
```

⚠️ **YOU ARE IN LIVE MODE**: Real credit cards will be charged. Make sure:
- Your pricing is correct
- Shipping/delivery is set up
- Customer support is ready
- Terms & conditions are clear

## Going Live

✅ You are already in LIVE MODE! Your site is ready to accept real payments.

Make sure to:
1. Test the entire checkout flow with a real card (small amount)
2. Verify orders appear in your Stripe Dashboard
3. Set up proper order fulfillment
4. Configure email notifications
5. Have customer support ready

## Webhook Setup (REQUIRED for Live Mode)

Webhooks let you track successful payments server-side:

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Use URL: `https://yourdomain.com/webhook`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy the webhook secret to your `.env` file

⚠️ **Important**: Deploy your server to a public URL (not localhost) for webhooks to work.

## Troubleshooting

**"Payment system is loading" error:**
- Make sure Stripe script is loaded in your HTML
- Check browser console for errors

**"Failed to create checkout session" error:**
- Make sure the server is running (`npm start`)
- Check that your `.env` file has the correct secret key
- Verify server is accessible at http://localhost:3000

**Checkout button doesn't work:**
- Open browser developer console (F12) to see errors
- Verify your publishable key is correct in `script.js`

## Support

For Stripe-specific issues, visit:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

## Additional Features You Can Add

- Email confirmations after purchase
- Order tracking
- Customer accounts
- Subscription products
- Discount codes
- Multiple currencies

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Create .env file with your keys
copy .env.example .env

# Edit .env and add your Stripe secret key

# Edit script.js and add your publishable key (line ~863)

# Start the server
npm start

# Open your browser to http://localhost:3000
```

That's it! You're ready to accept payments! 🎉
