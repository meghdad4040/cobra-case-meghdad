import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
 host: process.env.SMTP_HOST,
 port: process.env.SMTP_PORT,
 secure: false, // Use `true` for port 465, `false` for all other ports
 auth: {
  user: process.env.SMTP_USERNAME,
  pass: process.env.SMTP_PASSWORD
 },
});

export const sendEmail = async (to, subject, html) => {
 const info = await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: to,
  subject: subject,
  html: html
 })
 return info?.messageId
}