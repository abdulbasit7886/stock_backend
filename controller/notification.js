const notification = require('../models/notification');
const users = require('../models/users');

exports.savenotification = async function (req,res){
  try {
    let notificat = await new notification({
      Title: req.Title,
      Description: req.Description,
      product_id: req.product_id,
      user_id: req.user_id,
      store_id:req.store_id,
    });
    notificat.save();

  } catch (err) {
    console.log(err);
  }
};


exports.productnotification = async function (req, res) {

        try {
            const data = await notification.find({ store_id:req.store }).sort({$natural:-1});
            // console.log('notification data',data)
            return res.status(200).json({
              data,
            });
          } catch (error) {
            return res.status(401).json({
              message: "not found",
            });
          }
  };
  


exports.checknotification = async function (req, res) {
  let _id = req.params.id;
  console.log('role',req.role)
  console.log('_id',_id)

  try {

      const data = await notification.findByIdAndUpdate(_id,{
        'Status_admin' : true,
      })
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not found this",
      });
    }
  };
 
exports.markallnotification = async function (req, res) {
  try {
      const data = await notification.updateMany({store_id:req.store},{
        'Status_admin' : true,
      })
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not found this",
      });
    }

};