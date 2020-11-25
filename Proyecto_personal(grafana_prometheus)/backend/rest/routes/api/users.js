const { json } = require('body-parser');
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        return res.json({ user: user.toAuthJSON() });
    }).catch(next);
});

router.post('/users', function(req, res, next) {
    var limit = 3;

    if (typeof req.body.limit !== 'undefined') {
        limit = req.body.limit;
    }

    User.find({}).sort([
        ['won', 'desc']
    ]).limit(Number(limit)).select({ 'username': 1, 'won': 1, 'image': 1, 'losses': 1 }).then(function(user) {
        return res.json(user);
    }).catch(next);
});

router.post("/users/register", function(req, res, next) {
    User.find({
        $or: [{ email: req.body.user.email }, { username: req.body.user.username }],
        idsocial: null
    }).then(function(user) {
        if (user[0]) {
            return res.status(422).json("The email or username are already created");
        } else {
            var user = new User();
            user.username = req.body.user.username;
            user.email = req.body.user.email;
            user.type = "client";
            user.setPassword(req.body.user.password);
            user
                .save()
                .then(function() {
                    return res.json({ user: user.toAuthJSON() });
                })
                .catch(next);
        }
    });
});

router.put('/user', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        // only update fields that were actually passed...
        if (typeof req.body.user.username !== 'undefined') {
            user.username = req.body.user.username;
        }
        if (typeof req.body.user.email !== 'undefined') {
            user.email = req.body.user.email;
        }
        if (typeof req.body.user.bio !== 'undefined') {
            user.bio = req.body.user.bio;
        }
        if (typeof req.body.user.image !== 'undefined') {
            user.image = req.body.user.image;
        }
        if (typeof req.body.user.password !== 'undefined') {
            user.setPassword(req.body.user.password);
        }
        if (typeof req.body.user.type !== 'undefined') {
            user.type = req.body.user.type;
        }
        if (typeof req.body.user.won !== 'undefined') {
            user.won = req.body.user.won;
        }
        if (typeof req.body.user.losses !== 'undefined') {
            user.losses = req.body.user.losses;
        }

        return user.save().then(function() {
            return res.json({ user: user.toAuthJSON() });
        });
    }).catch(next);
});

router.post('/users/login', function(req, res, next) {
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) { return next(err); }

        if (user) {
            user.token = user.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

router.post('/users', function(req, res, next) {
    var user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    user.type = req.body.user.type;
    user.won = req.body.user.won;
    user.losses = req.body.user.losses;
    user.image = req.body.user.image;

    user.save().then(function() {
        return res.json({ user: user.toAuthJSON() });
    }).catch(next);
});

router.post("/users/sociallogin", function(req, res, next) {
    let memorystore = req.sessionStore;
    let sessions = memorystore.sessions;
    let sessionUser;
    for (var key in sessions) {
        sessionUser = JSON.parse(sessions[key]).passport.user;
    }

    User.find({ _id: sessionUser }, function(err, user) {
        user = user[0];

        if (err) return done(err);
        // if the user is found then log them in
        if (user) {
            user.token = user.generateJWT();
            return res.json({ user: user.toAuthJSON() }); // user found, return that user
        } else {
            return res.status(422).json(err);
        }
    });
});

// Get user by token.
router.get('/user/token', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
      return res.json({user: user});
    }).catch(next);
  });

router.param('username', function(req, res, next, username){
    User.findOne({username: username}).then(function(user){
      if (!user) { return res.sendStatus(404); }
  
      req.user = user;
  
      return next();
    }).catch(next);
});

router.param('iduser', function(req, res, next, iduser){
    User.findOne({_id: iduser}).then(function(user){
      if (!user) { return res.sendStatus(404); }
  
      req.user = user;
  
      return next();
    }).catch(next);
  });

router.get('/username/:username', function(req, res, next){
    return res.json(req.user);
});

router.get('/iduser/:iduser', function(req, res, next){
    return res.json(req.user);
});

//GITHUB AUTH

router.get("/auth/github", passport.authenticate("github"));

router.get('/auth/github/callback',
    passport.authenticate("github", {
        successRedirect: "http://localhost:3001/#!/auth/sociallogin",
        failureRedirect: "/"
    })
);

//GOOGLE AUTH
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', , 'https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/userinfo.email']
    }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3001/#!/auth/sociallogin',
        failureRedirect: '/'
    }));

module.exports = router;