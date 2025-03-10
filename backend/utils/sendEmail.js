const nodemailer = require('nodemailer');

const sendEmail = async (toString,subject,html) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.PASSWORD_PASS,
        },
    });

    const mainOptions = {
        from:process.env.EMAIL_USER,
        to,
        subject,
        html,
    };
    await transporter.sendMaill(mailOptions);

};
module.exports = sendEmail;