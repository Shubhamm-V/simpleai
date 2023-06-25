const nodemailer = require('nodemailer');

const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  const trnasporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Shubham Vyavhare <shubhammv1@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await trnasporter.sendMail(mailOptions);
};

export default sendEmail;
