import nodemailer from "nodemailer";



  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "Nnoboa35@gmail.com",
      pass: "mies uesu pyye qinu",
    },
  });

  export const sendEmail = async(to, subject) =>{
    const send = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2e6c80;">Welcome to Nnoboa HR Platform</h2>
        <p>Dear Valued User,</p>
        <p>We're excited to welcome you to the Nnoboa HR platform—a trusted space where opportunities meet talent. Your registration is the first step towards accessing tailored job listings, insightful career resources, and a supportive professional community.</p>
        <p>We look forward to helping you connect, grow, and thrive in your career journey. If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Thank you for choosing Nnoboa.</p>
        <br/>
        <p>Best regards,<br/>
        The Nnoboa HR Team</p>
      </div>
    `
  });





  console.log('Email sent successfully to:', send)
};

