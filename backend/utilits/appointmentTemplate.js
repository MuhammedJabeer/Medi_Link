// module.exports = function appointmentTemplate({ patient, doctor, dateTime, status, notes, token }) {
//   const formattedDate = new Date(dateTime).toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const formattedTime = new Date(dateTime).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <title>MediLink Appointment Confirmation</title>
//   </head>
//   <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">

//     <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
//       <tr style="background-color: #0f766e;">
//         <td style="text-align: center; padding: 20px;">
//           <img src="https://i.ibb.co/zNmwDPg/medilink-logo.png" alt="MediLink Logo" style="height: 60px;" />
//           <h1 style="color: #ffffff; margin: 10px 0 0;">MediLink</h1>
//         </td>
//       </tr>
//       <tr>
//         <td style="padding: 30px 20px; text-align: center;">
//           <h2 style="color: #0f766e; font-size: 22px;">Appointment Confirmed ✅</h2>
//           <p style="font-size: 16px; color: #333;">Dear ${patient.name},</p>
//           <p style="font-size: 16px; color: #333;">
//             Your appointment with <b>${doctor.name}</b> (<b>${doctor.specialization}</b>) has been confirmed.
//           </p>

//           <div style="font-size: 16px; background-color: #f0fdfa; color: #0f766e; padding: 15px 25px; margin: 20px auto; display: inline-block; border-radius: 8px; text-align: left; line-height: 1.6;">
//             <p><b>Date:</b> ${formattedDate}</p>
//             <p><b>Time:</b> ${formattedTime}</p>
//             <p><b>Token Number:</b> #${token}</p>
//             <p><b>Status:</b> ${status}</p>
//             ${notes ? `<p><b>Notes:</b> ${notes}</p>` : ""}
//           </div>

//           <p style="color: #444; font-size: 14px; margin-top: 20px;">
//             Please arrive at the clinic 10–15 minutes before your appointment time.
//           </p>
//           <p style="color: #888; font-size: 13px;">
//             Thank you for choosing <b>MediLink</b>. We look forward to seeing you!
//           </p>
//         </td>
//       </tr>
//       <tr>
//         <td style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
//           If you didn’t request this appointment, please contact our support.<br/>
//           &copy; 2025 MediLink. All rights reserved.
//         </td>
//       </tr>
//     </table>

//   </body>
//   </html>
//   `;
// };


module.exports = function appointmentTemplate({ patient, doctor, dateTime, status, notes, token }) {
  const dt = new Date(dateTime);
  const formattedDate = dt.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const formattedTime = dt.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MediLink Appointment E-Ticket</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f3f6f6;
        font-family: "Segoe UI", Arial, sans-serif;
      }
      .ticket {
        max-width: 600px;
        background: #fff;
        margin: 20px auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      }
      .header {
        background: #0f766e;
        color: #fff;
        text-align: center;
        padding: 20px;
      }
      .header img {
        height: 60px;
        margin-bottom: 6px;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
        letter-spacing: 0.5px;
      }
      .details {
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 16px;
      }
      .info {
        flex: 1 1 260px;
      }
      .info p {
        margin: 6px 0;
        font-size: 15px;
        color: #333;
      }
      .token-box {
        flex: 0 0 180px;
        text-align: center;
        background: #f0fdfa;
        border: 2px dashed #0f766e;
        border-radius: 10px;
        padding: 12px;
      }
      .token-label {
        color: #0f766e;
        font-size: 13px;
      }
      .token-number {
        font-size: 42px;
        font-weight: 800;
        color: #065f46;
        margin: 6px 0;
      }
      .status {
        font-size: 13px;
        color: #0f766e;
      }
      .qr {
        margin-top: 14px;
      }
      .qr img {
        width: 90px;
        height: 90px;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
      }
      .footer {
        background: #fafafa;
        padding: 15px 20px;
        font-size: 13px;
        color: #555;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      }
      @media (max-width: 480px) {
        .details {
          flex-direction: column;
          align-items: center;
        }
        .token-box {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="ticket">
      <div class="header">
        <img src="https://i.ibb.co/zNmwDPg/medilink-logo.png" alt="MediLink Logo" />
        <h1>Appointment Confirmation</h1>
      </div>

      <div class="details">
        <div class="info">
          <p><strong>Patient:</strong> ${patient.name}</p>
          ${patient.age ? `<p><strong>Age:</strong> ${patient.age}</p>` : ""}
          ${patient.gender ? `<p><strong>Gender:</strong> ${patient.gender}</p>` : ""}
          <p><strong>Doctor:</strong> Dr. ${doctor.name} (${doctor.specialization})</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime} (IST)</p>
          <p><strong>Status:</strong> ${status}</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        </div>

        <div class="token-box">
          <div class="token-label">Token No.</div>
          <div class="token-number">#${token}</div>
          <div class="status">${status}</div>
          <div class="qr">
            <img src="https://i.ibb.co/2k7K6yT/qr-placeholder.png" alt="QR Code" />
            <div style="font-size:11px;color:#666;margin-top:4px;">Scan at counter</div>
          </div>
        </div>
      </div>

      <div class="footer">
        Please arrive 10–15 minutes early and carry your ID.<br />
        For changes, contact <strong>MediLink Support</strong>.<br /><br />
        © 2025 MediLink Clinic • All Rights Reserved
      </div>
    </div>
  </body>
  </html>
  `;
};
