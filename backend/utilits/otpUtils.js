const transporter = require('../connect/Email');
const otpTemplate=require('../utilits/otpTemplate')


exports.generateotp=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOtpEmail = async (email, otp) => {
    const html = otpTemplate(otp);
  await transporter.sendMail({
    from: '"MediLink" <your@email.com>',
    to: email,
    subject: 'Verify your Email - OTP',
    html: html,
  });
};



