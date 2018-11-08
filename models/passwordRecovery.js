const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passRecoverySchema = new Schema({
  email: String,
  token: String,
  createdAt: {type: Date, default: Date.now()}
});
passRecoverySchema.index({ createdAt: 1 }, { expireAfterSeconds : 1800 });
const PasswordRecovery = mongoose.model('PasswordRecovery', passRecoverySchema);
PasswordRecovery.createIndexes({email: 1});
module.exports = PasswordRecovery;
