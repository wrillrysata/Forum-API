import { User } from '../models';
import authController from '../controllers/authController';
import configAuth from './auth';

require('dotenv').config();
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
      try {
        const user = await User.lookupUser(profile.displayName);
        if (user) {
          return done(null, user);
        }
        authController.facebookLogin(profile, accessToken);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    });
  }));
};
