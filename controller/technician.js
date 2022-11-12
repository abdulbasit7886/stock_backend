const Technician = require("../models/technician");
const User=require('../models/users')


exports.techcreate = async (req, res) => {
      try {

            await Technician.create({
              image_no: req.body.image_no,
              technician_image: req.body.technician_image,
              cnic_no: req.body.cnic_no,
              profilename: req.body.profilename,
              charges: req.body.charges,
              category: req.body.category,
              type:req.body.type,
              location:req.body.location,
              contact_no:req.body.phone,
              long:req.body.long,
              lat:req.body.lat,
              status:req.body.status,
              user_id:req.userid
            });
            return res.json({ message: "added " });
          }

       catch (error) {
        console.error(error.message);
        return res.status(401).json({ error });
      }
    };

    exports.viewTechnician = async function (req, res) {
        try {
            const data = await Technician.find({type:'Normal'})
      
              .sort({
                $natural: -1,
              });
            return res.status(200).json({
                message:"data found",
              data
            });
          }

      
         catch (error) {
          return res.status(401).json({
            message: "not found",
          });
        }
      };
      exports.viewTechnicianquick = async function (req, res) {
        try {
            const data = await Technician.find({type:'Quick'})
      
              .sort({
                $natural: -1,
              });
            return res.status(200).json({
                message:"data found",
              data
            });
          }

      
         catch (error) {
          return res.status(401).json({
            message: "not found",
          });
        }
      };
      exports.viewTechniciancategory = async function (req, res) {
        console.log(req.query);
        try {
            const data = await Technician.find({category:req.query.obj})
      
              .sort({
                $natural: -1,
              });
            return res.status(200).json({
                message:"data found",
              data
            });
          }

      
         catch (error) {
          return res.status(401).json({
            message: "not found",
          });
        }
      };

      exports.techonline = async function (req, res) {
        console.log(req.query.id)
        try {
            const data = await Technician.findById(req.query.id,{
              'status' : "true",
            })
            return res.status(200).json({
                message:"data found",
              data
            });
          }

      
         catch (error) {
          return res.status(401).json({
            message: "not found",
          });
        }
      };

      exports.techoffline = async function (req, res) {
        try {
            const data = await User.findById(req.userid,{
              'userverfication' : "false",
            })
            return res.status(200).json({
                message:"data found",
              data
            });
          }

      
         catch (error) {
          return res.status(401).json({
            message: "not found",
          });
        }
      };