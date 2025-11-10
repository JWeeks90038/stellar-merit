# Deploying Stellar Merit Statuary Backend to Railway

This guide walks you through deploying your Stripe backend server to Railway.

## Prerequisites

- GitHub account (you already have this)
- Railway account (free tier available)
- Your Stripe Live API keys

## Step 1: Create Railway Account

1. Go to https://railway.app/
2. Click "Login" and sign in with your GitHub account
3. Authorize Railway to access your repositories

## Step 2: Deploy from GitHub

1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: `JWeeks90038/stellar-merit`
4. Railway will automatically detect it's a Node.js project

## Step 3: Configure Environment Variables

In your Railway project settings:

1. Click on your service (should be named after your repo)
2. Go to the "Variables" tab
3. Add the following environment variables:

```
STRIPE_SECRET_KEY=your_stripe_live_secret_key_here
PORT=3000
NODE_ENV=production
```

**Get your Stripe Secret Key from:** https://dashboard.stripe.com/apikeys
- Use your **Live mode** secret key (starts with `sk_live_`)
- Copy the entire key including the `sk_live_` prefix

**Optional (for webhooks later):**
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 4: Get Your Railway URL

1. After deployment completes, go to "Settings" tab
2. Find "Domains" section
3. Click "Generate Domain"
4. You'll get a URL like: `https://stellar-merit-production.up.railway.app`
5. **Copy this URL** - you'll need it for Step 5

## Step 5: Update Your Frontend

You need to update `script.js` to use your Railway URL instead of `localhost:3000`:

**Find this line (around line 854):**
```javascript
const response = await fetch('http://localhost:3000/create-checkout-session', {
```

**Replace with your Railway URL:**
```javascript
const response = await fetch('https://YOUR-RAILWAY-URL.up.railway.app/create-checkout-session', {
```

Example:
```javascript
const response = await fetch('https://stellar-merit-production.up.railway.app/create-checkout-session', {
```

## Step 6: Commit and Push

```bash
git add script.js
git commit -m "Update API endpoint to Railway production URL"
git push origin main
```

Railway will automatically redeploy when you push to GitHub.

## Step 7: Test Your Checkout

1. Open your live website
2. Add a product to cart
3. Click "Checkout"
4. You should now be redirected to Stripe Checkout!

## Troubleshooting

### Error: "Failed to fetch"
- Check that your Railway service is running (green status in dashboard)
- Verify the URL in script.js matches your Railway domain exactly
- Check Railway logs for errors

### Error: "No such price"
- Make sure you've updated all `data-price-id` attributes in your HTML files
- Verify Price IDs in Stripe Dashboard match what's in your HTML

### CORS Errors
The server is already configured with CORS. If you still get CORS errors:
1. Check Railway logs
2. Verify your domain is correct in the fetch URL

## Cost

Railway offers:
- **Free Tier**: $5 credit/month (should cover a small e-commerce site)
- **Pro Plan**: $20/month for unlimited usage

Your server will sleep after 30 minutes of inactivity (free tier) but wakes up on first request.

## Security Notes

✅ Your `.env` file is already in `.gitignore` - secrets are safe
✅ Environment variables in Railway are encrypted
✅ Never commit API keys to GitHub
✅ Use separate test/live API keys for development/production

## Alternative Options

If you prefer other platforms:

- **Render**: https://render.com (similar to Railway)
- **Heroku**: https://heroku.com (requires credit card even for free tier)
- **Vercel**: https://vercel.com (requires serverless functions)
- **Netlify Functions**: https://netlify.com (serverless option)

Railway is recommended for its simplicity with Node.js/Express apps.

## Next Steps After Deployment

1. Set up Stripe webhooks (see STRIPE_SETUP.md)
2. Test checkout flow with a real payment
3. Monitor Railway logs for any errors
4. Consider upgrading to Railway Pro if traffic increases

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Stripe Support: https://support.stripe.com
