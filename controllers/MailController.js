const nodemailer = require('nodemailer');

// Create a transporter object
async function sendmail(req, res) {
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 465,
      auth: {
        user: 'nitish@warblerit.com',
        pass: 'AD14B58D5681ACC5DB1E557551FE79E3E2CB'
      }
    });

    console.log(transporter)

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
    

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while sending email');
  }
}

module.exports.sendmail = sendmail;
