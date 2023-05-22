const express = require("express");
const router = express.Router();
// const axios = require("axios");
// const bcrypt = require("bcrypt");
const config = require("../config");
const jwt = require("jsonwebtoken");


// const propertycontactins = require("../controllers/PropertyContact")
const crudcontroller=require("../controllers/firebasecrud")
const sendmail=require("../controllers/MailController")


router.post('/create',crudcontroller.insert)
router.post('/select',crudcontroller.select)
router.post('/Update',crudcontroller.Update)
router.post('/hbstateselect',crudcontroller.stateselect)
router.post('/sendmail',sendmail.sendmail)



// router.post("/editsearch",editsearch.edit);





// router.get("/BSEMonthlyAvgSharePrice",cmotsapi.BSEMonthlyAvgSharePrices);

/* JWT token Middleware */
router.use(function (req, res, next) {
    /* Check header/url parameters/post parameters for token */
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    /* Decode token using secretkey */
    if (token) {
      jwt.verify(token, config, function (err, decoded) {
        if (err) {
          // return res.json({
          //   success: false,
          //   message: "Failed to authenticate token."
          // });
          // res.status(500).send({ message: "Failed to authenticate token." }); 
          // res.writeHead(301,{ Location:"http://localhost:3000/add" });
          // res.end();
          return res.redirect('http://localhost:8000/');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      /* return an error if no token found */
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  }); 
module.exports = router;

