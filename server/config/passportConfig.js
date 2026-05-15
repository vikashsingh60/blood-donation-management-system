import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "../models/User.js";

dotenv.config();

const serverPort = process.env.PORT || 5000;
const defaultServerUrl = `http://localhost:${serverPort}`;
const serverUrl = process.env.SERVER_URL || defaultServerUrl;

// Helper function: find or create user
const findOrCreateSocialUser = async (profile, provider) => {
  const email = profile.emails?.[0]?.value;
  let user = email ? await User.findOne({ email }) : null;

  if (!user) {
    user = await User.findOne({ provider, providerId: profile.id });
  }

  if (user) return user;

  const newUser = await User.create({
    name: profile.displayName || "Social User",
    email,
    role: "donor",
    provider,
    providerId: profile.id,
    isVerified: true
  });

  return newUser;
};

// Common callback
const socialCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(`✅ ${profile.provider} login success for:`, profile.displayName);
    const user = await findOrCreateSocialUser(profile, profile.provider);
    done(null, user);
  } catch (error) {
    console.error(`❌ ${profile.provider} login error:`, error);
    done(error, null);
  }
};

// --- GOOGLE Strategy ---
const googleId = (process.env.GOOGLE_CLIENT_ID || "").trim();
const googleSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
const googleCallback = (process.env.GOOGLE_CALLBACK_URL || `${serverUrl}/api/auth/google/callback`).trim();

console.log("PassportConfig Google ID:", `"${googleId}"`);
console.log("PassportConfig Google Secret:", `"${googleSecret}"`);
console.log("PassportConfig Google Callback:", `"${googleCallback}"`);

if (googleId && googleSecret) {
  console.log("✅ Google OAuth strategy configured");
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleId,
        clientSecret: googleSecret,
        callbackURL: googleCallback
      },
      socialCallback
    )
  );
} else {
  console.warn("❌ Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env");
}

// --- FACEBOOK Strategy ---
const fbId = (process.env.FACEBOOK_APP_ID || "").trim();
const fbSecret = (process.env.FACEBOOK_APP_SECRET || "").trim();

if (fbId && fbSecret) {
  console.log("✅ Facebook OAuth strategy configured");
  passport.use(
    new FacebookStrategy(
      {
        clientID: fbId,
        clientSecret: fbSecret,
        callbackURL: `${serverUrl}/api/auth/facebook/callback`,
        profileFields: ["id", "displayName", "emails"]
      },
      socialCallback
    )
  );
} else {
  console.warn("❌ Facebook OAuth not configured. Set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET in .env");
}

// --- LINKEDIN Strategy ---
const linkedinId = (process.env.LINKEDIN_CLIENT_ID || "").trim();
const linkedinSecret = (process.env.LINKEDIN_CLIENT_SECRET || "").trim();

if (linkedinId && linkedinSecret) {
  console.log("✅ LinkedIn OAuth strategy configured");
  passport.use(
    new LinkedInStrategy(
      {
        clientID: linkedinId,
        clientSecret: linkedinSecret,
        callbackURL: `${serverUrl}/api/auth/linkedin/callback`,
        scope: ["r_emailaddress", "r_liteprofile"],
        state: true
      },
      socialCallback
    )
  );
} else {
  console.warn("❌ LinkedIn OAuth not configured. Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in .env");
}

export default passport;
