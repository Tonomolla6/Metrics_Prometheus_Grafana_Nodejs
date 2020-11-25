var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var credentials = require('../credentials/credentials.json');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function (email, password, done) {
  User.findOne({ email: email }).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }

    return done(null, user);
  }).catch(done);
}));

passport.use(new GitHubStrategy({
  clientID: credentials.GITHUB_CLIENT_ID,
  clientSecret: credentials.GITHUB_CLIENT_SECRET,
  callbackURL: credentials.GITHUB_CALLBACK
},
  function (accessToken, refreshToken, profile, done) {

    User.findOne({ idsocial: profile.id.toString() }, function (err, user) {
      if (user) {
        return done(null, user);
      } else {
        var user = new User({
          idsocial: profile.id,
          username: profile.username.toLowerCase(),
          email: profile.username.toLowerCase() + "@gmail.com",
          image: profile.photos[0].value,
          type: "client",
          provider: "github"
        });
        console.log(user);
        user.save(function (err) {
          return done(null, user);
        });
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {

  User.findById(id)
    .then(user => {
      console.log(user);
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });

});

passport.use(new GoogleStrategy({
  clientID: credentials.GOOGLE_CLIENT_ID,
  clientSecret: credentials.GOOGLE_CLIENT_SECRET,
  callbackURL: credentials.GOOGLE_CALLBACK,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    User.findOne({ idsocial: profile.id.toString() }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        console.log("created");
        return done(null, user);
      } else {
        var user = new User({
          idsocial: profile.id,
          username: profile.email.split("@")[0].toString(36).replace(/\./g, '') + (Math.floor(Math.random() * 999)),
          email: profile.email,
          image: profile.photos[0].value,
          type: "client",
          provider: "google"
        });
        user.save(function (err) {
          if (err) {
            console.log(err);
          }
          return done(null, user);
        });
      } 
    });
  }
));