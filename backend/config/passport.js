const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/api/vendor/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let vendor = await Vendor.findOne({ email: profile.emails[0].value });

      if (!vendor) {
        vendor = await Vendor.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
      }

      const token = jwt.sign(
        { id: vendor._id, role: vendor.role },
        process.env.JWT_SECRET
      );

      done(null, { token });
    }
  )
);

module.exports = passport;
