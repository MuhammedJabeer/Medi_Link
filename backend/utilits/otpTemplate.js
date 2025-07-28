
module.exports = function otpTemplate(otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>MediLink OTP Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">

    <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <tr style="background-color: #0f766e;">
        <td style="text-align: center; padding: 20px;">
          <img src="https://i.ibb.co/zNmwDPg/medilink-logo.png" alt="MediLink Logo" style="height: 60px;" />
          <h1 style="color: #ffffff; margin: 10px 0 0;">MediLink</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px 20px; text-align: center;">
          <h2 style="color: #0f766e; font-size: 22px;">Email Verification OTP</h2>
          <p style="font-size: 16px; color: #333;">Use the following OTP to verify your email address:</p>
          <div style="font-size: 30px; font-weight: bold; background-color: #f0fdfa; color: #0f766e; padding: 15px 25px; margin: 20px auto; display: inline-block; border-radius: 8px; letter-spacing: 5px;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 14px;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
          If you didn’t request this, just ignore this email.<br/>
          &copy; 2025 MediLink. All rights reserved.
        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
