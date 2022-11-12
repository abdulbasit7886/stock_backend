const { validationResult } = require("express-validator");
const users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
const Email = require("../controller/email");
const countryModel = require("../models/countries");

exports.login = async function (req, res) {
  const { email, password } = req.body;
  let user = await users
    .findOne({ email })

  console.log(user);
  if (!user) {
    return res.status(404).json({
      message: "Please enter valid email",
    });
  }
  if (user.status == "pending" || user.status == "decline") {
    return res.status(401).json({
      message: `user is in ${user.status} state`,
    });
  }
  if (email !== user.email) {
    return res.status(401).json({
      message: "Please enter valid Email ",
    });
  }
  let pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    return res.status(401).json({
      message: "Please enter valid Password",
    });
  }

  const token = await jwtoken.sign(
    {
      _id: `${user._id}`,
      email: `${email}`,
      status: `${user.status}`,
    },
    "authentication-token"
  );
  return res.status(200).json({
    id: user._id,
    token,
    role:user.role_id
  });
};


exports.users = async function (req, res) {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {



      let country = await countryModel.findOne({
        countryName: req.body.country,
      });
      if (!country) {
        return res.status(404).json({
          error: "country not found",
        });
      }

      const { password, confirmPassword } = req.body;

      let userData = await users.findOne({ email: req.body.email });
      if (userData) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exist",
        });
      }
      if (password !== confirmPassword) {
        return res
          .status(422)
          .json({ success, error: "Passwords do not match" });
      }
      let user = req.body;
      // // console.log(user);
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      userData = await users.create({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: secPass,
        phoneNumber: req.body.phoneNumber,
        country_id: country._id,
        Address: req.body.address,
        role_id: req.body.role,
        status: req.body.status,
      });
      const data = {
        userData: {
          id: userData.id,
        },
      };
      Email.forUser(user, (info) => {
        console.log(`the mail has been sent and id is: ${info.messageId}`);
      });
      success = true;
      return res.json({ success, data });
    }
   
   catch (error) {
    console.error(error.message);

    return res.status(401).json("Some error occured in users in controller.js");
  }
};

