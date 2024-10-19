import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const page = async () => {

 const session = await getServerSession(authOptions);

 console.log("serverComponentSession: ", session)



 return (
  <section className=' min-h-screen'>
   <div className=" h-[calc(100vh-7rem)] flex flex-col gap-4 justify-center items-center">
    <div>
     <h1 className=" text-gray-800 text-5xl">
      Dashboard
     </h1>
    </div>
    <div>
     <p className=" text-lg font-bold">
      <span className=" text-base font-extrabold text-green-600">Hi </span>
      {session?.user?.name}
     </p>
     <p>
      role: {session?.user?.role}
     </p>
    </div>
   </div>
  </section>
 )
}

export default page
