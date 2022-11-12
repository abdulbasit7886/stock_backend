const users = require('../models/users');

const Email = require('../controller/email');

exports.getData=async function(req,res) {
console.log('callleddd')
      try{
        let { page, size } = req.query;
        if (!page) {
          page = 1;
        }
        if (!size) {
          size = 10;
        }
    
        const limit = parseInt(size);
        const skip = (page - 1) * size;
        let x=null;

        const Data=await users.find({role_id:'seller'});
        const count = await users.count();
        res.status(200).json({
          message: "List shown",
          Data,
          count
       })
      } catch (error) {
        res.status(401).json({
        error: "error appeared",
      });
    }
  }
  
exports.update = async function (req, res) {
  try {
    let user = await users.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not Found ");
    }
    // console.log(user);
    Email.onAccept(user, (info) => {
      console.log(`the mail has been sent and id is: ${info.messageId}`);
    });
    user = await users.findByIdAndUpdate(user, {
      status: "active",
    });
    return res.json({ user });
  } catch (error) {
    console.error(error.message);
    return res.status(401).send("Internal Server Error");
  }
};

exports.decline = async function (req, res) {
  try {
    let user = await users.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not Found ");
    }

    console.log(user);

    Email.onReject(user, info =>{
      console.log(`the mail has been sent and id is: ${info.messageId}`);

      //  return res.send(info);
    });


    user = await users.findByIdAndUpdate(user,{
      'status' : "decline",
    })
    Email.onReject(user, info =>{
      console.log(`the mail has been sent and id is: ${info.messageId}`);
    });
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(401).send("Internal Server Error");
  }
};

exports.sorting=async function (req, res){
  let user = await users.find({role_id:"seller"});
  console.log(user);
  if(user){
  var status=req.body.status;
  console.log('Status ',status);
  try{
    const userdata=await users.findOne(req.params.id,{role_id:"seller"});
    // console.log(userdata._id)
    users.find({role_id:seller, status}).exec((err, docs) => {
      if(err) {
          responseObj = {
              "status": "error",
              "msg": "Error occured.",
              "body": err
          }
          res.status(401).send(responseObj);
      }else{
          responseObj = {
              "status": "success",
              "msg": "Fetch record",
              "body": docs
          }
          res.status(200).send(responseObj);
          console.log(responseObj);
      }
  })
}catch(error) {
  console.log('Error', error);
}
}
else{
  console.log("admin users not found")
}
}

exports.search= async (req,res) => {
  try {
      const query = req.query.search;
      const objs = await users.find({role_id:"seller"
       , $or: [
        {firstName: query },
        { lastName: query },
          { email : query },
      ],
    })
     return res.status(200).json({objs});
  } catch (error) {
      res.json({message: error});        
  }
}




