# Stripe Integration - Quick Reference (LIVE MODE)

## 🚀 Getting Started (5 Minutes)

⚠️ **WARNING: You are in LIVE MODE - Real payments will be processed!**

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Stripe Keys (LIVE MODE)
Go to: https://dashboard.stripe.com/apikeys

Copy both:
- **Publishable Key** (pk_live_...)
- **Secret Key** (sk_live_...)

### 3. Add Keys to Your Project

**Backend (server-side):**
1. Copy `.env.example` to `.env`
2. Add your LIVE secret key:
   ```
   STRIPE_SECRET_KEY=sk_live_your_secret_key_here
   ```

**Frontend (client-side):**
1. Open `script.js`
2. Find line ~863 in the `checkout()` method
3. Replace this:
   ```javascript
   const stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY_HERE');
   ```
   With your actual LIVE publishable key:
   ```javascript
   const stripe = Stripe('pk_live_51ABC...');
   ```

### 4. Start Server
```bash
npm start
```

### 5. Test It!
⚠️ **LIVE MODE - You will be charged real money!**

1. Open http://localhost:3000
2. Add products to cart
3. Click Checkout
4. Use a REAL credit card (you will be charged)

## 📝 Payment Testing

⚠️ **You are in LIVE MODE**

- Real credit cards will be charged
- Payments will appear in your bank account
- No test cards will work

**To test without charges:**
- Use TEST mode keys (pk_test_ and sk_test_)
- Test cards only work in test mode

## 🔧 Files You Need to Edit

1. **script.js** - Line ~863: Add LIVE publishable key (pk_live_...)
2. **.env** - Add LIVE secret key (sk_live_...)

⚠️ Make sure you're using LIVE keys, not TEST keys!

That's it! Don't edit anything else unless customizing.

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Payment system is loading" | Wait a few seconds or refresh page |
| "Failed to create checkout session" | Make sure server is running: `npm start` |
| Can't find .env file | Copy .env.example to .env |
| Server won't start | Run `npm install` first |

## 📞 Need Help?

- Stripe Docs: https://stripe.com/docs/checkout/quickstart
- Live Mode Dashboard: https://dashboard.stripe.com/payments
- Test Mode Dashboard: https://dashboard.stripe.com/test/payments (if you switch to test mode)
