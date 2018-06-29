const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  name: {type: String, unique: true},
  info: String,
  location: String,
  type: String,
  email: {type: String, unique: true},
  phone: String,
  password: String,
  admin: [],
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
