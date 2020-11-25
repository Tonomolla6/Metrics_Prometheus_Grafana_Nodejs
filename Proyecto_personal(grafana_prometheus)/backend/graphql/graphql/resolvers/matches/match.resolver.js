const mongoose = require('mongoose');
const Match = mongoose.model('Match');
const request = require("../../../routes/api/requests");

const resolvers = {
    Query: {
        match: (root, { slug }) => {
            // // example for authentication
            // if (!context.user) throw new context.AuthenticationError('You must be logged in');

            return Match.findOne({ slug: slug }).exec();
        },
        matches: async (root, { username }) => {
            console.log(username);
            if (username) {
                console.log("entra");
                let usuario = await request.getUser(username);
                console.log(usuario);
                return Match.find({ 'author': usuario._id }).exec();
            }
        },
    },
    Mutation: {
        createMatch: (root, { input }, context) => {
            let user = context.user.user;

            console.log(user);
            input.author = user._id;
            console.log(input);
            const match = new Match(input);

            match.save();

            console.log(match);
            return match;
        },
        getMatches: async (root, { input }) => {
            console.log(input)
            if (input.username) {
                let usuario = await request.getUser(input.username);
                return Match.find({ 'author': usuario.profile.username }).exec();
                return usuario;
                console.log(usuario)
                return Match.find({ 'author': usuario.username }).exec();
            }
        }
    },
    Match: {
        author: async (parent) => {
            let user = await request.getUserById(parent.author);
            return user;
            // return User.findOne({_id: parent.user}).exec();
        }
      }
};
// 
export default resolvers;