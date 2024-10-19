import { NextResponse } from "next/server"
import db from "@/lib/db"
import cryptoRandomString from 'crypto-random-string';
import Cryptr from "cryptr";
import { render } from '@react-email/render'
import forgotPasswordEmail from "@/emails/forgotPasswordEmail";
import { sendEmail } from "@/config/mail";

export async function POST(req) {
 const data = await req.json()

 // check user email
 const user = await db.user.findUnique({
  where: {
   email: data.email
  }
 })
 if (user === null) {
  return NextResponse.json({
   status: 400,
   errors: {
    email: "no user found with this email"
   }
  })
 }

 // generate random string
 const randomStr = cryptoRandomString({
  length: 64,
  type: "alphanumeric"
 })


 const updateUser = await prisma.user.update({
  where: {
   email: data.email,
  },
  data: {
   password_reset_token: randomStr,
  },
 })

 // Encrypt user email
 const crypt = new Cryptr(process.env.NEXTAUTH_SECRET)
 const encryptedEmail = crypt.encrypt(updateUser.email)

 const url = `${process.env.APP - URL}/reset-password/${encryptedEmail}?${randomStr}`
 try {
  const html = render(forgotPasswordEmail({
   params: {
    name: user.name,
    url: url,
   }
  }))

  //send email to user
  await sendEmail

 } catch (error) {

 }


}