const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  phone: String,
  avatar: String,
  dob: String,
  gender: String,
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  // expires: {type: Date, default: Date.now()+5000},
});
// adminSchema.index({ expires: 1 }, { expireAfterSeconds : 0 });
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
