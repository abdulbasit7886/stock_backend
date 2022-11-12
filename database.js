const mongoose = require('mongoose');
const mongodb = require("mongodb").MongoClient;
const mongoURI = "mongodb+srv://abdulbasit7886:basit123@cluster0.mgw5ewr.mongodb.net/test";
const connectToMongo = (req,res)=>{
    try{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");

    })
}catch(error){
    return res.status(404).json({
        message:"Check your internet connection"
    })
}
}
module.exports = connectToMongo;