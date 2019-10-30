import passport from 'passport';

export default function userRoutes(app) {
  app.get('/api/v1/users/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate(
    'facebook', {
      successRedirect: '/user/profile',
      failureRedirect: '/login'
    }
  ));
  app.get('/user/profile', (req, res) => {
    res.send('welcome to your profile');
  });
  app.get('/login', (req, res) => {
    res.send('Sorry, we could not log you in');
  });
}
