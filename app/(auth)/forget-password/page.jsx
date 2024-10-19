"use client"


import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
 const { data: session } = useSession()
 const router = useRouter()
 const [error, setError] = useState("")
 const [email, setEmail] = useState("")
 const [loading, setLoading] = useState(false)


 const handleSubmit = async (event) => {
  event.preventDefault()
  setLoading(true)

  try {
   await axios.post("/api/forgot-password", { email: email })
    .then(res => {
     setLoading(false)
     const response = res.data
     if (response.status === 200) {
      // email sent
      toast.success(response.message)
     } else if (response.status === 400) {

     }
    })
  } catch (error) {
   setLoading(true)
   console.error(error)
  }
 }

 // if (session) {
 //  return (
 //   <div>
 //    شما قبلاً وارد سیستم شده اید. <Link href="/">به خانه بروید</Link>
 //   </div>
 //  )
 // }

 return (
  <div className="relative p-4 bg-white/40 flex flex-col gap-4 rounded-lg shadow-2xl  justify-center items-center">
   <h1 className=' text-xl font-bold'>Forget Password</h1>
   <form className=' flex flex-col gap-2' onSubmit={handleSubmit}>
    <label className=' text-sm' htmlFor="email">Email: </label>
    <input className=' text-sm w-full border outline-offset-2  border-gray-800 rounded-md px-3 py-1 bg-transparent'
     type="email"
     id="email"
     name="email"
     placeholder='email@exampel.com'
     onChange={(e) => setEmail(e.target.value)} />
    <span className=' text-red-600'>{error?.email}</span>
    <button className=' btn btn-sm btn-neutral' type="submit" disabled={loading}>{loading ? "Processing" : "Submit"}</button>
   </form>
  </div>
 )
}

export default ForgotPassword