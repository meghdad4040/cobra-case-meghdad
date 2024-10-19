"use client"

import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"


const page = () => {

 const session = useSession()
 const { status } = session;

 if (status === "unauthenticated") {
  redirect("/login")
 }


 return (
  <section className=' min-h-screen' >
   <div className=" h-[calc(100vh-7rem)] flex flex-col gap-4 justify-center items-center">
    <div>
     <h1 className=" text-gray-800 text-5xl">
      Dashboard
     </h1>
    </div>
    <div>
     {
      status === "authenticated" && (
       <button onClick={() => signOut()} className=" btn btn-wide">
        Logout
       </button>
      )
     }
    </div>
    <div>
     {
      status === "loading" ? <p>loading...</p> : (
       <>

        <p className=" text-lg font-bold">
         <span className=" text-base font-extrabold text-green-600">Hi </span>
         {session?.data?.user?.name}
        </p>
        <p>
         role: {session?.data?.user?.role}
        </p>
       </>
      )
     }
    </div>

   </div>
  </section>
 )
}

export default page
