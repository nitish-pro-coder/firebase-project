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
      subject: `${randomSixDigitNumber} is your OTP for self-booking App`,
      html: `<p>Hi there!</p><p>${randomSixDigitNumber} is your OTP to verify your email ID and login to self-booking.</p><br/><p>Thanks,</p><p>Team TravelPlus</p>`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred while sending email:', error);
        res.status(500).send('Error occurred while sending email');
      } else {
        console.log('Email sent successfully:', info.response);
        res.status(200).send('Email sent successfully');
  
        const empref = db.collection('Client_Management').doc('Ev2gk6FTlDO2DeDttl6F').collection('Employee_details').doc(req.body.id);
  
        // Specify the fields to update
        const updateData = {
          MOdifiedDate: FieldValue.serverTimestamp(),
          login_otp: randomSixDigitNumber
          // Add more fields to update as needed
        };
  
        // Update the document
        empref.update(updateData)
          .then(() => {
            console.log('Document updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating document:', error);
          });
      }
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Error occurred');
  }
  
 
}

async function Otpverification(req, res) {

  const db = getFirestore();
  const loginref =db.collection('Client_Management').doc('Ev2gk6FTlDO2DeDttl6F').collection('Employee_details').doc(req.body.id);
  loginref.get()
  .then((doc) => {
    if (doc.exists) {
      const userInformation = doc.data();
      console.log(userInformation)
      if (req.body.otp == userInformation.login_otp) {
        res.status(200).send('Valid OTP');
      } else {
        res.status(500).send('Invalid OTP');
      }
    } else {
      res.status(404).send('User not found');
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('Error occurred');
  });
}

module.exports.sendmail = sendmail;
module.exports.Otpverification = Otpverification;


