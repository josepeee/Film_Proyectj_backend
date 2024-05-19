const nodemailer = require ("nodemailer");

const transporter= nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ivancodespace@gmail.com",
        pass:"leaz kksn lbfn qlpl",
    },
});

const sendEmail = async (to, subject ,text) => {
    try {
          const mailOptions = {
            from: "ivancodespace@gmail.com",
            to: to ,
            subject: subject,
            text: text ,
          };

     await transporter.sendMail(mailOptions);
    } catch (error){
      console.log("Error al enviar el mensaje", error.message) 
    }
};

module.exports = sendEmail;