# Resend Email Integration Guide

This guide will walk you through setting up Resend to send downloadable files via email.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Once logged in, go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "KeyDietSecrets Production")
4. Copy the API key (it starts with `re_`)
5. **Important**: Save this key securely - you won't be able to see it again!

## Step 3: Set Up Your Domain (For Production)

### Option A: Use Resend's Test Domain (For Development/Testing)

- You can use `onboarding@resend.dev` for testing
- This is already configured in the code
- No domain setup required

### Option B: Verify Your Own Domain (For Production)

1. Go to [Domains](https://resend.com/domains) in Resend
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain's DNS settings
5. Wait for verification (usually a few minutes)
6. Once verified, you can use emails like `downloads@yourdomain.com`

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
# Resend API Key (from Step 2)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# From Email Address
# For testing (no domain setup needed):
RESEND_FROM_EMAIL=KeyDietSecrets <onboarding@resend.dev>

# For production (after domain verification):
# RESEND_FROM_EMAIL=KeyDietSecrets <downloads@yourdomain.com>
```

3. Replace `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your actual API key
4. **Important**: Never commit `.env.local` to git (it should already be in `.gitignore`)

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to an article page that has a download box
3. Enter your email address
4. Click "Send Me the File"
5. Check your email inbox (and spam folder) for the file

## Step 6: Verify It's Working

### Check the Console

- In your terminal where the dev server is running, you should see:
  ```
  Email sent successfully: { email: '...', messageId: '...', ... }
  ```

### Check Resend Dashboard

1. Go to [Resend Dashboard](https://resend.com/emails)
2. You should see your sent emails with delivery status
3. Click on an email to see delivery details

## Troubleshooting

### Error: "RESEND_API_KEY is not configured"
- Make sure `.env.local` exists and contains `RESEND_API_KEY`
- Restart your dev server after adding environment variables
- Check that the variable name is exactly `RESEND_API_KEY`

### Error: "Failed to send email"
- Check your API key is correct
- Verify your domain is verified (if using custom domain)
- Check Resend dashboard for error details
- Make sure you haven't exceeded Resend's rate limits

### Email Not Received
- Check spam/junk folder
- Verify the email address is correct
- Check Resend dashboard for delivery status
- For test domain (`onboarding@resend.dev`), emails may be delayed

### File Not Attached
- Check that the file URL from Sanity is accessible
- Verify the file exists and is publicly accessible
- Check browser console for any fetch errors

## Production Checklist

Before going live:

- [ ] Domain is verified in Resend
- [ ] `RESEND_FROM_EMAIL` uses your verified domain
- [ ] API key is set in production environment variables
- [ ] Tested sending emails with file attachments
- [ ] Monitored Resend dashboard for delivery rates
- [ ] Set up email delivery monitoring/alerts (optional)

## Resend Limits (Free Tier)

- 3,000 emails/month
- 100 emails/day
- Unlimited API requests
- Email size limit: 25MB (including attachments)

For higher limits, upgrade to a paid plan at [resend.com/pricing](https://resend.com/pricing)

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Resend React Email](https://resend.com/docs/send-with-react) (for advanced email templates)

