const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passRecoverySchema = new Schema({
  token: String,
  createdAt: {type: Date, default: Date.now()}
});
passRecoverySchema.index({ createdAt: 1 }, { expireAfterSeconds : 1800 });
const PasswordRecovery = mongoose.model('PasswordRecovery', passRecoverySchema);
module.exports = PasswordRecovery;
