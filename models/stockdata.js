const mongoose = require("mongoose");

const { Schema } = mongoose;
const stockschema = new Schema({
  Name: {
    type: String,
    require: true,
  },
  
  Date: {
    type: String, 
    require: true
  },
  Open:{
    type: Number, 
    require: true
  },
  Close: {
    type: Number,
    default:false
  },
  High: {
    type: Number,
    default:false
  },
  Low: {
    type: Number,
    require: true,
  },


});
const stores = mongoose.model("Data",stockschema);

module.exports = stores;
