const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("../controller/controller");
const forgotPass = require("../controller/forgotpassword");
const control = require("../controller/data");
const adminAuth = require("../controller/superAdmin");
const notify = require("../controller/notification");
const countriesList = require("../controller/countries");
const auth = require("../middleware/Authentication");
const stock = require("../controller/stockName")
const stockdata = require("../controller/stockData") 

router.post(
  "/users",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  controller.users
);

router.get("/getCountriesList", countriesList.country);

router.post("/login", controller.login);
router.post("/verifyEmail", forgotPass.verifyEmail);
router.put("/forgetPassword/:id", forgotPass.newPassword);
router.get("/registrationData", control.getData);
router.put("/update/:id", control.update);
router.put("/decline/:id", control.decline);
router.post("/sorting", control.sorting);
router.post("/Slogin", adminAuth.superAdlogin);
router.get("/Slogin", adminAuth.login);
router.post("/create", adminAuth.create);
router.put("/changepassword/:id", adminAuth.changepassword);

router.get(
  "/productnotifictaion",
  auth.auth,
  notify.productnotification
);
router.put(
  "/productstatus/:id",
  auth.auth,
  notify.checknotification
);
router.get(
  "/markallnotification",
  auth.auth,
  notify.markallnotification
);

router.get("/stockName",stock.stock)

router.get("/getstockdata/:id",stockdata.stockdata)
router.get("/stockdataid/:id",stockdata.stockdataid)
router.get("/stockdatagraph/:id",stockdata.stockdatagraph)



module.exports = router;
