# Environment Variables Setup

This document describes the required environment variables for the KeyDietSecrets website.

## Required Variables

### Resend Email Service

The `/api/subscribe` endpoint requires these environment variables to send emails with file attachments:

#### `RESEND_API_KEY` (Required)

- **Description**: Your Resend API key for sending emails
- **Get it from**: [https://resend.com/api-keys](https://resend.com/api-keys)
- **Format**: `re_xxxxxxxxxxxxxxxxxxxxx`
- **Example**: `RESEND_API_KEY=re_abc123xyz456`

#### `RESEND_FROM_EMAIL` (Required)

- **Description**: The sender email address with a verified domain
- **Format**: `"Display Name <email@yourdomain.com>"`
- **Example**: `RESEND_FROM_EMAIL="KeyDietSecrets <hello@keydiet.com>"`
- **Important**:
  - You MUST verify your domain at [https://resend.com/domains](https://resend.com/domains)
  - DO NOT use `onboarding@resend.dev` in production (only for testing)
  - The application will return a 500 error if this is not set

#### `RESEND_SEGMENT_NEWSLETTER` (Optional)

- **Description**: Your Resend Audience ID for adding subscribers to your newsletter list
- **Get it from**: [https://resend.com/audiences](https://resend.com/audiences)
- **Format**: Audience ID string
- **Example**: `RESEND_SEGMENT_NEWSLETTER=aud_xxxxxxxxxxxxx`
- **Note**: If not set, emails will still be sent but users won't be added to your mailing list

## Setup Instructions

1. Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Resend credentials:

   ```env
   RESEND_API_KEY=re_your_actual_api_key
   RESEND_FROM_EMAIL="KeyDietSecrets <hello@yourdomain.com>"
   RESEND_SEGMENT_NEWSLETTER=aud_your_audience_id
   ```

3. Verify your domain in Resend:
   - Go to [https://resend.com/domains](https://resend.com/domains)
   - Add your domain and complete DNS verification
   - Use an email address from that verified domain

## Deployment Checklist

Before deploying to production:

- [ ] Resend API key is configured
- [ ] Domain is verified in Resend dashboard
- [ ] `RESEND_FROM_EMAIL` uses verified domain
- [ ] Test email sending in production environment
- [ ] Both environment variables are set in your hosting provider (Vercel, etc.)

## Troubleshooting

### "Email service is not configured"

- Ensure both `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set
- Check that environment variables are loaded in your deployment

### "Domain not verified" errors

- Verify your domain at [https://resend.com/domains](https://resend.com/domains)
- Ensure `RESEND_FROM_EMAIL` uses an email from the verified domain

### Emails not sending

- Check Resend dashboard for error logs
- Verify API key is valid and not expired
- Ensure sender email domain is verified
