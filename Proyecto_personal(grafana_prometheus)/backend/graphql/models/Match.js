var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var MatchSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  result: Boolean,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true,
  usePushEach: true
});

MatchSchema.plugin(uniqueValidator, {message: 'is already taken'});

MatchSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

MatchSchema.methods.slugify = function() {
  this.slug = (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

// Requires population of author
MatchSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    result:this.result,
    slug: this.slug,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Match', MatchSchema);
