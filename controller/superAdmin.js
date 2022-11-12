const jwt=require("jsonwebtoken");
const superAdminlogin=require("../models/superAdminlogin");
const bcrypt=require("bcryptjs");
const accessTokenSecret = "accessToken";

exports.superAdlogin=async (req, res) => {
const { email, password} = req.body;
  
const data= await superAdminlogin.findOne({});
console.log("email-----",data.email);
const passmatch=await bcrypt.compare(password,data.password);
console.log("password------", passmatch);
const users = [
  {
      email:data.email
  }, 
]
if(passmatch==true){
const user = users.find(u => {return u.email === email});
  if (user) {
      const token = jwt.sign({ email: user.email, password:passmatch}, accessTokenSecret, { expiresIn: '5m' });
      res.json({
          token,
      } )
    }
    else {
    return res.send('plz enter valid email');
  }
}
else{
    res.json("invalid password");
}

};

exports.login=async function(req,res) {
    try{
        superAdminlogin.find({}).exec((err, docs) => {
            if(err) {
                responseObj = {
                    "body": err
                }
                res.status(401).json(responseObj);
            }else{
                responseObj = {
                    "body": docs
                }
                res.status(200).json(responseObj);
                console.log(responseObj);
            }
        })
      }catch(error) {
        console.log('Error', error);
    }
};

exports.create = async (req, res) => {
      try {
        const data = new superAdminlogin({
         user:req.body.user,
         email:req.body.email,
         password:req.body.password
        });
        data.save();
        return res.json("data add successfully");
      } catch (error) {
        console.error(error.message);
        return res.status(401).send(error);
      }
  };

exports.changepassword=async function(req, res) {
   const currentpassword=req.body.currentpassword;
   const data= await superAdminlogin.findOne({});
   const passmatch=await bcrypt.compare(currentpassword,data.password);
   console.log(passmatch);
    if(passmatch==true){
        try{
          const secpassword=await bcrypt.hash(req.body.password,10);
          console.log("hashpassword",secpassword);
          const val=await superAdminlogin.findByIdAndUpdate(req.params.id,{email:req.body.email,password:secpassword}).exec((err, docs) => {
                if(err) {
                    res.status(400).json("not data updatte");
                }else{
                    res.status(200).json({
                        message: "data update successfull",
                        val,
                     });
                }
            })
          }catch(error) {
            console.error(error.message);
            res.status(401).send("Internal Server Error");
        } 
    }
    else{
    console.log("Super Admin current password isn't matched!")
   }
}


