const mongoose = require("mongoose");

const { Schema } = mongoose;
const stocknameschema = new Schema({
  Name: {
    type: String,
    require: true,
  }
  

});
const nameschema = mongoose.model("stockname",stocknameschema);

module.exports = nameschema;
