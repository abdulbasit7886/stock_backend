const mongoose = require("mongoose");

const { Schema } = mongoose;
const adminRegisterSchema = new Schema({
  firstName: {
    type: String, 
    require: true
  },
  lastName: {
    type: String, require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
    
  },
  phoneNumber: {
    type: String,
    require: true
    
  },

  country_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'countries',
    require: true,

  },
  status: {
    type: String,
    require: false,

  },
  userverfication: {
    type: String,
    require: false,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Schema.Types.Boolean,
    index: true,
    default: false,
  },

});
const admins = mongoose.model("users", adminRegisterSchema);

module.exports = admins;
