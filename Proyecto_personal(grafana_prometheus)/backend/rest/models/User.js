var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    bio: String,
    image: String,
    idsocial: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    hash: String,
    salt: String,
    karma: { type: Number, default: 0 },
    email: String,
    bio: String,
    type: String,
    provider: String,
    won: Number,
    losses: Number,
    tickets: Number
}, { timestamps: true, usePushEach: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

UserSchema.methods.followers = function () {
    let return_data = [];

    this.following.forEach(element => {
        return_data.push({
            username: element.username,
            image: element.image
        });
    });

    return return_data;
};

UserSchema.methods.toProfileJSONFor = function (user) {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: user ? user.isFollowing(this._id) : false
    };
};

UserSchema.methods.favorite = function (id) {
    if (this.favorites.indexOf(id) === -1) {
        this.favorites = this.favorites.concat(id);
    }

    return this.save();
};

UserSchema.methods.unfavorite = function (id) {
    this.favorites.remove(id);
    return this.save();
};

UserSchema.methods.isFavorite = function (id) {
    return this.favorites.some(function (favoriteId) {
        return favoriteId.toString() === id.toString();
    });
};

UserSchema.methods.follow = function (id) {
    if (this.following.indexOf(id) === -1) {
        this.following = this.following.concat(id);
    }

    return this.save();
};

UserSchema.methods.unfollow = function (id) {
    this.following.remove(id);
    return this.save();
};

UserSchema.methods.isFollowing = function (id) {
    return this.following.some(function (followId) {
        return followId.toString() === id.toString();
    });
};

// Para añadir o restar karma a los usuarios
UserSchema.methods.Karma = function (cantidad) {
    this.karma = this.karma + cantidad;
    if (this.karma < 0){
        this.karma = 0;
    }

    return this.save();
};

mongoose.model('User', UserSchema);