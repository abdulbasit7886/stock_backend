const mongoose = require("mongoose");

const { Schema } = mongoose;
const notificationschema = new Schema({
  Title: {
    type: String,
    require: true,
  },
  
  Description: {
    type: String, 
    require: true
  },
  product_id:{
    type: String, 
    require: true
  },
  Status_admin: {
    type: Boolean,
    default:false
  },
  Status_manager: {
    type: Boolean,
    default:false
  },
  user_id: {
    type: String,
    require: true,
  },
  store_id:{
    type:String,
    require:true,

  },
  Date: {
    type: Date,
    default: Date.now,
  }

});
const stores = mongoose.model("notification", notificationschema);

module.exports = stores;
