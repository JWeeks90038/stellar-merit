# Stripe Product IDs Configuration Guide

This guide shows you exactly where to add your Stripe Price IDs and Shipping Rate IDs for each product.

## ⚠️ Important: Get Your IDs from Stripe Dashboard

1. **Price IDs**: Go to https://dashboard.stripe.com/products
   - Each product has a Price ID that looks like: `price_1AbCdEfGhIjKlMnO`
   
2. **Shipping Rate IDs**: Go to https://dashboard.stripe.com/shipping-rates
   - Each shipping rate has an ID that looks like: `shr_1AbCdEfGhIjKlMnO`

---

## Product 1: Majestic Guardian Lion

**Your Stripe Price ID:** `price_YOUR_PRICE_ID_HERE_1`  
**Your Shipping Rate ID:** `shr_YOUR_SHIPPING_RATE_ID_HERE_1`

### Files to Update:

**index.html** (around line 123-130):
```html
<button class="btn btn-primary add-to-cart-btn" 
        data-id="1" 
        data-name="Majestic Guardian Lion" 
        data-price="125"
        data-price-id="price_YOUR_PRICE_ID_HERE_1"
        data-shipping-id="shr_YOUR_SHIPPING_RATE_ID_HERE_1"
        data-image="images/products/lion-2.jpg">
```

**shop.html** (around line 85-91):
```html
<button class="btn btn-primary add-to-cart-btn" 
        data-id="1" 
        data-name="Majestic Guardian Lion" 
        data-price="125"
        data-price-id="price_YOUR_PRICE_ID_HERE_1"
        data-shipping-id="shr_YOUR_SHIPPING_RATE_ID_HERE_1"
        data-image="images/products/lion-2.jpg">
```

---

## Product 2: Zen Meditating Dog

**Your Stripe Price ID:** `price_YOUR_PRICE_ID_HERE_2`  
**Your Shipping Rate ID:** `shr_YOUR_SHIPPING_RATE_ID_HERE_2`

### Files to Update:

**index.html** (around line 146-153):
```html
<button class="btn btn-primary add-to-cart-btn" 
        data-id="2" 
        data-name="Zen Meditating Dog" 
        data-price="19"
        data-price-id="price_YOUR_PRICE_ID_HERE_2"
        data-shipping-id="shr_YOUR_SHIPPING_RATE_ID_HERE_2"
        data-image="images/products/meditating-dog-1.jpg">
```

**shop.html** (around line 109-116):
```html
<button class="btn btn-primary add-to-cart-btn" 
        data-id="1" 
        data-name="Zen Meditating Dog" 
        data-price="19"
        data-price-id="price_YOUR_PRICE_ID_HERE_2"
        data-shipping-id="shr_YOUR_SHIPPING_RATE_ID_HERE_2"
        data-image="images/products/meditating-dog-1.jpg">
```

---

## Product 3: Wise Owl Guardian

**Your Stripe Price ID:** `price_YOUR_PRICE_ID_HERE_3`  
**Your Shipping Rate ID:** `shr_YOUR_SHIPPING_RATE_ID_HERE_3`

### Files to Update:

**index.html** (around line 169-176):
```html
<button class="btn btn-primary add-to-cart-btn" 
        data-id="3" 
        data-name="Wise Owl Guardian" 
        data-price="22"
        data-price-id="price_YOUR_PRICE_ID_HERE_3"
        data-shipping-id="shr_YOUR_SHIPPING_RATE_ID_HERE_3"
        data-image="images/products/owls-1.jpg">
```

**shop.html** (around line 133-140):
```html
<button class="btn btn-primary add-to-cart-btn" 
        data-id="2" 
        data-name="Wise Owl Guardian" 
        data-price="22"
        data-price-id="price_YOUR_PRICE_ID_HERE_3"
        data-shipping-id="shr_YOUR_SHIPPING_RATE_ID_HERE_3"
        data-image="images/products/owls-1.jpg">
```

---

## Quick Find & Replace Instructions

### Using VS Code Search & Replace:

1. Press `Ctrl+H` to open Find & Replace
2. Enable "Use Regular Expression" (the `.*` icon)
3. For each product, replace the placeholder with your actual ID:

**Product 1 Price ID:**
- Find: `price_YOUR_PRICE_ID_HERE_1`
- Replace: `price_1AbCdEfGhIjKlMnO` (your actual Price ID)
- Click "Replace All"

**Product 1 Shipping ID:**
- Find: `shr_YOUR_SHIPPING_RATE_ID_HERE_1`
- Replace: `shr_1AbCdEfGhIjKlMnO` (your actual Shipping Rate ID)
- Click "Replace All"

Repeat for Product 2 and Product 3.

---

## Verification Checklist

After adding your IDs, verify:

- [ ] All `price_YOUR_PRICE_ID_HERE_X` placeholders are replaced
- [ ] All `shr_YOUR_SHIPPING_RATE_ID_HERE_X` placeholders are replaced
- [ ] Price IDs start with `price_`
- [ ] Shipping Rate IDs start with `shr_`
- [ ] Each product has unique IDs (don't reuse the same ID for different products)
- [ ] IDs are updated in both `index.html` AND `shop.html`

---

## Testing Your Setup

1. Make sure your `.env` file has your secret key
2. Run `npm install` (if you haven't already)
3. Start the server: `npm start`
4. Open your website in a browser
5. Add a product to cart
6. Click checkout
7. You should see the Stripe Checkout page with your product

---

## Troubleshooting

**Error: "No such price"**
- Double-check your Price ID in Stripe Dashboard
- Make sure you copied the entire ID including `price_`
- Ensure you're using LIVE mode Price IDs (not test mode)

**Error: "Invalid shipping rate"**
- Verify the Shipping Rate ID in Stripe Dashboard
- Make sure you copied the entire ID including `shr_`
- Ensure the shipping rate is active in Stripe

**Products show but checkout fails**
- Check browser console for errors (F12)
- Verify server is running (`npm start`)
- Check that `.env` has your secret key

---

## Need Help?

- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Products: https://dashboard.stripe.com/products
- Stripe Shipping Rates: https://dashboard.stripe.com/shipping-rates
- Stripe API Keys: https://dashboard.stripe.com/apikeys
