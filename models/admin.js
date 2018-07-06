const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  fullName: String,
  email: {type: String, unique: true},
  phone: String,
  password: String,
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
