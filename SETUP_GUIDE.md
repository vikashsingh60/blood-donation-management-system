# 🩸 Blood Donation System - Setup Guide

## ✅ What's Been Implemented

### 1. **OTP Authentication** ✓
- Patient login with ABHA number
- OTP sent to registered mobile via Twilio
- Email fallback for OTP delivery
- OTP verification endpoints
- Resend OTP functionality

### 2. **OAuth 2.0 Integration** ✓
- Google, LinkedIn, Facebook authentication
- Social buttons in Login & Register pages
- Auto user creation on first social login
- Token generation and redirect

### 3. **Enhanced Backend** ✓
- Token verification middleware with better error handling
- Role-based access control improvements
- Session management with cookies
- CORS configuration for OAuth

### 4. **Updated Frontend** ✓
- Conditional login form (ABHA for patients, email/password for others)
- OAuth button handlers
- OTP verification page integration
- Better error messages

---

## 🚀 Quick Start

### Step 1: Install New Dependencies
```bash
cd server
npm install
# This installs cookie-parser and updates all packages
```

### Step 2: Configure Environment Variables

#### For Server (`server/.env`)
Use `server/.env.example` as a template and add these:

```env
# Required
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_min_32_chars
PORT=5000
CLIENT_URL=http://localhost:5173

# SMS (Twilio) - Optional for development
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+your_twilio_number

# Email - Optional, fallback for OTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# OAuth - Add only what you want to use
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
LINKEDIN_CLIENT_ID=your_linkedin_id
LINKEDIN_CLIENT_SECRET=your_linkedin_secret
FACEBOOK_APP_ID=your_facebook_id
FACEBOOK_APP_SECRET=your_facebook_secret
```

#### For Client (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API=your_google_maps_key
```

### Step 3: (Optional) Setup OAuth Providers

#### Google OAuth
1. Go to https://console.developers.google.com
2. Create OAuth 2.0 Web credentials
3. Add redirect URI: `http://localhost:5000/api/auth/google/callback`
4. Copy Client ID and Secret to `.env`

#### LinkedIn OAuth
1. Go to https://www.linkedin.com/developers/apps
2. Create new app, get credentials
3. Add redirect URI: `http://localhost:5000/api/auth/linkedin/callback`

#### Facebook OAuth
1. Go to https://developers.facebook.com/apps
2. Create app, get ID and Secret
3. Add redirect URI: `http://localhost:5000/api/auth/facebook/callback`

#### Twilio SMS (Optional)
1. Go to https://www.twilio.com/console
2. Get Account SID, Auth Token, and a phone number
3. Add to `.env`

**Note:** If Twilio is not configured, OTP will be mocked and returned in API response for testing.

### Step 4: Run the Application

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## 📱 How It Works

### Patient Login (ABHA + OTP)
```
1. Patient selects "Patient" role
2. System shows ABHA number field
3. Patient enters ABHA number → Clicks "Get OTP"
4. Backend sends OTP to registered mobile
5. Patient enters OTP → Clicks "Verify OTP"
6. Patient logged in with JWT token
```

### Social Login (Google/LinkedIn/Facebook)
```
1. Patient/Donor/Hospital clicks "Google" (or LinkedIn/Facebook)
2. Redirected to provider's login
3. Provider redirects back with auth code
4. Backend creates user (if new) or finds existing
5. JWT token generated
6. User logged in to dashboard
```

### Donor/Hospital Login (Email + Password)
```
1. Selects "Donor" or "Hospital" role
2. Enters email and password
3. Backend validates credentials
4. JWT token generated
5. User logged in to dashboard
```

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register         - Create new account
POST   /api/auth/login            - Login (ABHA/email+password)
POST   /api/auth/verify-otp       - Verify OTP code
POST   /api/auth/request-otp      - Send OTP to phone
POST   /api/auth/resend-otp       - Resend OTP
GET    /api/auth/google           - Start Google login
GET    /api/auth/google/callback  - Google callback
GET    /api/auth/linkedin         - Start LinkedIn login
GET    /api/auth/linkedin/callback - LinkedIn callback
GET    /api/auth/facebook         - Start Facebook login
GET    /api/auth/facebook/callback - Facebook callback
```

---

## 🧪 Testing Without Real Services

### Test OTP Without Twilio
```
1. Leave TWILIO_ACCOUNT_SID blank in .env
2. Request OTP via API
3. Response includes mock OTP: { otp: "123456", method: "mock" }
4. Use returned OTP to verify
```

### Test OAuth Without Configuration
```
1. Button click redirects to login?error=social_not_configured
2. User can still login with email/password
```

### Test Patient Login Without ABHA in Database
```
1. Create patient user first via registration
2. Use their ABHA number to login
3. System sends OTP to registered phone
```

---

## ⚠️ Common Issues

### "OTP could not be sent"
- **Cause:** Twilio not configured
- **Solution:** Leave blank for mock mode, or add real Twilio credentials

### "OAuth provider not configured"
- **Cause:** Missing CLIENT_ID/SECRET in .env
- **Solution:** Either configure provider or use email/password login

### "Cannot find module 'cookie-parser'"
- **Cause:** Dependencies not installed
- **Solution:** Run `npm install` in server directory

### "CORS error on OAuth redirect"
- **Cause:** Wrong CLIENT_URL in .env
- **Solution:** Ensure `CLIENT_URL=http://localhost:5173` (or your actual frontend URL)

### Token verification fails
- **Cause:** JWT_SECRET different between sessions
- **Solution:** Use same JWT_SECRET across restarts

---

## 📊 Database Requirements

Patient must have:
```json
{
  "abhaNumber": "123456789012",
  "phone": "+919876543210",
  "email": "patient@example.com",
  "role": "patient"
}
```

---

## 🔐 Security Notes

- JWT expires in 7 days
- OTP expires in 10 minutes
- Passwords hashed with bcryptjs
- Rate limited: 100 requests/15 minutes
- CORS enabled only for configured domains
- Sensitive fields excluded from responses

---

## 📞 Support API Responses

### Success Response (OTP Sent)
```json
{
  "message": "OTP sent",
  "userId": "user_id_here",
  "otp": "123456"  // Only in mock mode
}
```

### Success Response (Login)
```json
{
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "role": "patient"
  },
  "token": "jwt_token_here"
}
```

### Error Response
```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

---

## 📝 Next Steps

1. ✅ Configure at least one OAuth provider
2. ✅ Configure Twilio or use mock OTP
3. ✅ Test patient ABHA login
4. ✅ Test OAuth flows
5. ⏳ Setup Firebase (optional)
6. ⏳ Configure email service for better OTP UX
7. ⏳ Setup monitoring/logging

---

**Last Updated:** May 2026
**Status:** All core features implemented and ready for testing
