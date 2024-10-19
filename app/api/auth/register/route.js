import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from 'bcrypt'

export async function POST(req) {
 try {
  const data = await req.json()
  console.log("data", data)
  const userFound = await db.user.findUnique({
   where: {
    email: data.email
   }
  })

  if (userFound) {
   return NextResponse.json({
    message: "Email already exists"
   }, {
    status: 400
   })
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10)

  const newUser = await db.user.create({
   data: {
    name: data.username,
    email: data.email,
    password: hashedPassword
   }
  })

  const { password: _, ...user } = newUser
  console.log("user register", user)
  return NextResponse.json(user)
 } catch (error) {
  return NextResponse.json(
   {
    message: error.message
   },
   {
    status: 500
   }
  )
 }
}