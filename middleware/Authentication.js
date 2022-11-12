const jwt_decode = require("jwt-decode");
exports.auth = function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (typeof token !== "undefined" ) {
      const firstToken = token.split(" ");
      const last = firstToken[1];
      var decoded = jwt_decode(last);



      req.user = decoded.email;
      req.userid=decoded._id;
      if(decoded){
        next(); 
      }
    } else {
      return res.status(401).json({
        message: "Token not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "Not Found Token",
    });
  }
};

