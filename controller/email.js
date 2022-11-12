var nodemailer = require("nodemailer");

const email = require("../config");
const SMTPConnection = require('nodemailer/lib/smtp-connection');

 exports.forUser =async function (user, callback){
    // create reusable transporter object using the default SMTP transport
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure : false, // true for 465, false for other ports
      auth:{
        user : email.user,
        pass : email.pass
      }
    });
  
    let mailOptions ={
      from : '"abdulbasit99786@gmail.com"' ,// sender address
      to : user.email,
      subject : "Welcome To stock analysis",
      html : `<h1> We have receive your account request with the  Email: ${user.email}.</h1>
      <h2> Our management team will contact you for further verification within a week</h2>
      <h2> Your Account Name: ${user.name}</h2>
      <h3>If you have any query, please contact on the below number</h3>
      <h2>Thank You!</h2>
      <br>
      <h4>Regards: stockanalysis Management</h4>
      
      <h4>Phone no: 042-12345676</h4>
      
      `
    };
    // send email with defined transport object
    let info = await transport.sendMail(mailOptions);
    callback(info);
  }
  exports.forManager =async function (user, pass, callback){
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure : false, // true for 465, false for other ports
      auth:{
        user : email.user,
        pass : email.pass
      }
    });
  
    let mailOptions ={
      from : '"abdulbasit99786@gmail.com"' ,// sender address
      to : user.email,
      subject : "Welcome",
      html : `<h1>Hello ${user.firstName} ${user.lastName} we welcome you in stock analysis.</h1>
      <h2>Your Login Credentials for our portal given below: (Please do not share with anyone!!)</h2>
      <h3> Email: ${user.email} | Password: ${pass}</h3>
      <h3>If you have any query, please contact on the below number</h3>
      <h2>Thank You!</h2>
      <br>
      <h4>Regards: Account Owner</h4>
      
      <h4>Phone no: 042-00000000</h4>
      
      `
    };
    let info = await transport.sendMail(mailOptions);
    callback(info);
  }
  
  exports.forSuperAdmin =async function (user, callback){

    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure : false, 
      auth:{
        user : email.user,
        pass : email.pass
      }
    });
  
    let mailOptions ={
      
      from : '"abdulbasit99786@gmail.com"' ,// sender address
      to : "abdulbasit99786@gmail.com",
      subject : "Account Registration Request",
      html : `<h1> ${user.firstName} wants to create Account.</h1>
      <h3>See below the user details</h3>
      <h4> Email: ${user.email}</h4>
      <h4> Account Name: ${user.name}</h4>
      <h4> Cell No: ${user.phoneNUmber}</h4>
      <h5>Contact him to verify</h5>
      <h2>Thank You!</h2>
      <br>
      <h4>Regards: stock analysis</h4>
      <h4>Phone no: 042-583911234</h4>
      
      `
    };
    // send email with defined transport object
    let info = await transport.sendMail(mailOptions);
    callback(info);
  }

  exports.onAccept =async function (user, callback){

    // create reusable transporter object using the default SMTP transport
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure : false, // true for 465, false for other ports
      auth:{
        user : email.user,
        pass : email.pass
      }
    });
    
    let mailOptions ={
      
      from : '"abdulbasit99786@gmail.com"' ,// sender address
      to : user.email,
      subject : "Account Request Accepted",
      html : `<h2> Your request for create account has been accepted by our management team on Email: ${user.email}.</h2>
      <h4>Now you can create your Account and increase your sales</h4>
      <h3>Thank You!</h3>
      <br>
      <h4>Regards: stock analysis</h4>
      <h4>Phone no: 042-583911234</h4>
      
      `
    };
    // send email with defined transport object
    let info = await transport.sendMail(mailOptions);
    callback(info);
  }

  exports.onReject =async function (user, callback){

    // create reusable transporter object using the default SMTP transport
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure : false, // true for 465, false for other ports
      auth:{
        user : email.user,
        pass : email.pass
      }
    });
    
    let mailOptions ={
      
      from : '"abdulbasit99786@gmail.com"' ,// sender address
      to : user.email,
      subject : "Account Request Rejected",
      html : `<h2> Your request for create Account has been Rejected by our management team on Email: ${user.email}.</h2>
      <h4>Because, you are not a verified</h4>
      <h3>Thank You!</h3>
      <br>
      <h4>Regards: stock analysis</h4>
      <h4>Phone no: 042-583911234</h4>
      
      `
    };
    let info = await transport.sendMail(mailOptions);
    callback(info);
  }