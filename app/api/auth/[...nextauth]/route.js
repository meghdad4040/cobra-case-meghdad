import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import crypto from "crypto";

const prisma = new PrismaClient()

const ADMIN_USER = {
 email: 'admin@gmail.com',
 password: bcrypt.hashSync('admin', 10),
};

export const authOptions = {
 adapter: PrismaAdapter(prisma),
 secret: process.env.NEXTAUTH_SECRET,
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_ID,
   clientSecret: process.env.GITHUB_SECRET,
  }),
  CredentialsProvider({
   name: "Credentials",
   credentials: {
    username: { label: "UserName", type: "text", placeholder: "username" },
    email: { label: "Email", type: "text", placeholder: "test@example.com" },
    password: { label: "Password", type: "password", placeholder: "******" }
   },
   async authorize(credentials, req) {
    const userFound = await db.user.findUnique({
     where: {
      email: credentials.email
     }
    })

    if (userFound) {
     const passwordOk = await bcrypt.compareSync(credentials.password, userFound.password)
     if (!passwordOk) throw new Error("password not Ok")
     return userFound
    } else {
     if (credentials.email === ADMIN_USER.email && await bcrypt.compare(credentials.password, ADMIN_USER.password)) {
      const newUser = await prisma.user.create({
       data: {
        name: "Admin",
        email: credentials.email,
        password: ADMIN_USER.password,
        role: "Admin",
        isAdmin: true
       },
      });
      return newUser;
     }
    }
   }
  })
 ],
 events: {
  async signIn(message) {
   console.log("Signed in!", { message });
  },
  async signOut(message) {
   console.log("Signed out!", { message });
  },
  async createUser(message) {
   console.log("User created!", { message });
  },
  // ... سایر رویدادهای next-auth
  async resetPasswordRequest(user) {
   const token = await crypto.randomBytes(32).toString('hex')
   console.log(token)
   console.log(user)
   await prisma.user.update({
    where: {
     id: user.id,
    },
    data: {
     resetPasswordToken: token,
     resetPasswordTokenExpiresAt: Date.now() + 60 * 60 * 1000, // 1 ساعت
    },
   })

   const url = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${user.email}`
   await sendEmail({
    to: user.email,
    subject: 'بازنشانی رمز عبور',
    text: `برای بازنشانی رمز عبور خود، روی این لینک کلیک کنید: ${url}`,
   })

   return { user }
  },
  async resetPassword(user, data) {
   const isValidToken = await prisma.user.findUnique({
    where: {
     email: data.email,
     resetPasswordToken: data.token,
     resetPasswordTokenExpiresAt: { gt: Date.now() },
    },
   })
   console.log(isValidToken)
   console.log(user)
   if (!isValidToken) {
    throw new Error('توکن بازنشانی رمز عبور نامعتبر است')
   }

   const hashedPassword = await bcrypt.hash(data.password, 10)

   await prisma.user.update({
    where: {
     id: isValidToken.id,
    },
    data: {
     password: hashedPassword,
     resetPasswordToken: null,
     resetPasswordTokenExpiresAt: null,
    },
   })

   return { user }
  },
 },
 session: {
  strategy: "jwt"
 },
 pages: {
  signIn: "/login",
  newUser: '/new-user'
 },
 callbacks: {
  async signIn({ user, account }) {
   if (account.provider === "github") {
    try {
     console.log(user)
     const { name, email } = user
     const ifUserExists = await db.user.findUnique({
      where: {
       email: email
      }
     })
     if (ifUserExists) {
      return user
     }
     const newUser = await db.user.create({
      data: {
       name: name,
       email: email,
      }
     })

     return newUser

    } catch (error) {
     console.log(error)
    }
   }
   return user
  },
  async jwt({ token, user }) {
   // if (user?.id) token.id = user.id;
   // pass in user id to token
   if (user) {
    return {
     ...token,
     id: user.id,
     email: user.email,
     role: user.role,
     isAdmin: user.isAdmin
    }
   }
   return token
  },
  async session({ session, token }) {

   // pas in user id to session
   if (token) {
    return {
     ...session,
     user: {
      ...session.user,
      id: token.id,
      email: token.email,
      name: token.name,
      role: token.role,
      isAdmin: token.isAdmin
     }
    }
   }
   return session;
  }
 },
 // debug: process.env.NODE_ENV === "development"

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }