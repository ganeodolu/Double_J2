const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
};

const Account = new Schema({
  profile: {
    username: String,
    thumbnail: {
      type: String,
      default: '/static/images/default_thumbnail.png'
    }
  },
  email: {
    type: String
  },
  password: String,
  thoughtCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Account.statics.findByEmail = function(email) {
  return this.findOne({ email }).exec();
};

Account.statics.findByUsername = function(username) {
  return this.findOne({ 'profile.username': username }).exec();
};

Account.statics.findByEmailOrUsername = function({ username, email}) {
  return this.findOne({
    $or: [
      { 'profile.username': username },
      { email }
    ]
  }).exec();
};

Account.statics.localRegister = function({ username, email, password }) {
  const account = new this({
    profile: {
      username
    },
    email,
    password: hash(password)
  });

  return account.save();
};

Account.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

Account.methods.generateToken = function() {
  const payload = {
    _id: this._id,
    profile: this.profile
  };

  return generateToken(payload, 'account');
};

module.exports = mongoose.model('Account', Account);
