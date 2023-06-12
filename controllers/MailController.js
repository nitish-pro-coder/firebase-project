const nodemailer = require('nodemailer');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../firebasecreds.json');

// Create a transporter object
async function sendmail(req, res) {
  try {
    const db = getFirestore();
    const transporter = await nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 465,
      auth: {
        user: 'nitish@warblerit.com',
        pass: 'AD14B58D5681ACC5DB1E557551FE79E3E2CB'
      }
    });

    console.log(transporter);

    function generateRandomSixDigitNumber() {
        const min = 100000; // Minimum 6-digit number (inclusive)
        const max = 999999; // Maximum 6-digit number (inclusive)
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
      // Usage
      const randomSixDigitNumber = generateRandomSixDigitNumber();
      console.log(randomSixDigitNumber);
      
    const mailOptions = {
      from: 'nitish@warblerit.com',
      to: req.body.mailid,
      subject: `${randomSixDigitNumber} is your OTP for TravelPlus App`,
    //   text: 'This is a test email sent from Node.js using Nodemailer.'
    html: `<p>Hi there!</p><p>${randomSixDigitNumber} is your OTP to verify your email ID and login to TravelPlus App.</p><br/><p>Thanks,</p><p>Team TravelPlus</p>`
    };
    

   
  

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error occurred while sending email:', error);
    res.status(500).send('Error occurred while sending email');
  } else {
    console.log('Email sent successfully:', info.response);
    // res.status(200).send('Email sent successfully');
     // ...
 const loginRef = db.collection('userinformation').where('User_id', '==', 1);
   
 let userInformation=[];
 
 loginRef.get()
   .then((querySnapshot) => {
    userInformation= querySnapshot.docs.map((doc) => ({id:doc.id,...doc.data()}));
     console.log(userInformation[0].id);
    const loginRefup = db.collection('userinformation').doc(userInformation[0].id)
    const updated_at_timestamp = FieldValue.serverTimestamp()
     loginRefup.update({
      CreatedDate: updated_at_timestamp,
      MOdifiedDate: updated_at_timestamp,
      login_otp: randomSixDigitNumber
    })
   
  })
   
   .catch((error) => {
     console.error('Error getting user information:', error);
   });
  }
});
} catch (error) {
console.error('Error occurred:', error);
res.status(500).send('Error occurred while sending email');
}
}

async function Otpverification(req, res) {

  const db = getFirestore();
  const loginref = db.collection('userinformation').where('User_id', '==',req.body.Userid);
  let userInformation=[];
  console.log(req.body);
  loginref.get()
   .then((querySnapshot) => {
    userInformation= querySnapshot.docs.map((doc) => ({id:doc.id,...doc.data()}));
    console.log(userInformation[0].login_otp); 
  if(req.body.otp == userInformation[0].login_otp){
    
    res.status(200).send('Valid OTP');
  }
  else{
    res.status(500).send('Invalid OTP');
  }
   }).catch((error) => {
    console.log(error);
   })
 
}

module.exports.sendmail = sendmail;
module.exports.Otpverification = Otpverification;


