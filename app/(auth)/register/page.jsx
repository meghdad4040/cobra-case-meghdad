
"use client"

import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';


const RegisterPage = () => {

 const router = useRouter()

 const { watch, register, handleSubmit, formState: { errors, isSubmitting },
  reset, } = useForm();

 const onSubmit = async (data) => {
  if (data.password !== data.confirmPassword) {
   return alert("Password do not match")
  }
  await axios
   .post("/api/auth/register", {
    username: data.username,
    email: data.email,
    password: data.password
   })
   .then(res => {
    if (res.status === 200) {
     router.push("/login")
    }
   })
   .catch(err => {
    console.log(err.response.data.message)
    console.log(err)
    // alert(err.response.data.message)
   });
  reset({
   username: "",
   email: "",
   password: "",
   confirmPassword: ""
  })
 };

 return (
  <div className="relative flex justify-center items-center dark:bg-gray-900">
   <div className="grid gap-8">
    <div
     id="back-div"
     className="bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-[26px] m-4 w-[22rem] h-auto"
    >
     <div
      className=" h-auto border-transparent rounded-[20px] dark:bg-gray-900 bg-gray-200 shadow-lg  md:px-6 md:py-0 p-4 m-2"
     >
      <h1 className=" py-2 font-bold dark:text-gray-400 text-2xl text-center">
       Register
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} action="#" className="space-y-1">
       <div className=' flex flex-col'>
        <label htmlFor="userName" className=" dark:text-gray-400 text-xs">Username</label>
        <input
         id="userName"
         className="border text-xs bg-transparent px-2 py-1 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
         type="text"
         {...register("username", { required: "Username Address is required" })}
        />
        {errors.username && <span className=' text-red-500 text-[0.5rem]'>{errors.username.message}</span>}
       </div>
       <div className=' flex flex-col'>
        <label htmlFor="email" className=" dark:text-gray-400 text-xs">Email</label>
        <input
         id="email"
         className="border text-xs bg-transparent px-2 py-1 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
         type="email"
         {...register("email", { required: "Email Address is required" })}
        />
        {errors.email && <span className=' text-red-500 text-[0.5rem]'>{errors.email.message}</span>}
       </div>
       <div className=' flex flex-col'>
        <label htmlFor="password" className="dark:text-gray-400 text-xs">Password</label>
        <input
         id="password"
         className="border text-xs bg-transparent px-2 py-1 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
         type="password"
         {...register("password", { required: "password Address is required", minLength: 4, maxLength: 8 })}
        />
        {errors.password && <span className=' text-red-500 text-[0.5rem]'>{errors.password.message}</span>}
       </div>
       <div className=' flex flex-col'>
        <label htmlFor="confirmPassword" className="dark:text-gray-400 text-xs">confirmPassword</label>
        <input
         id="confirmPassword"
         className="border text-xs bg-transparent px-2 py-1 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
         type="password"
         {...register("confirmPassword", {
          required: true,
          minLength: 4,
          maxLength: 8,
          validate: value => {
           if (watch("password") !== value) {
            return "password not match"
           }
          }
         })}
        />
        {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className=' text-red-500 text-[0.5rem]'>confirmPassword is required"</span>}
        {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className=' text-red-500 text-[0.5rem]'>{errors.password.message}</span>}
       </div>
       <a
        className="group text-blue-400 transition-all duration-100 ease-in-out"
        href="#"
       >
        <span
         className="bg-left-bottom bg-gradient-to-r text-xs from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
        >
         Forget your password?
        </span>
       </a>
       <button
        className={`${!isSubmitting ? "button" : "btn_disabled"}`}
        type="submit"
       >
        Register
        {isSubmitting && <span className=" mx-1 loading loading-sm loading-dots"></span>}
       </button>
      </form>
      <div className="flex flex-col mt-2 items-center justify-center text-xs">
       <h3 className="dark:text-gray-300">
        Don't have an account?
        <Link
         className="group text-blue-400 transition-all duration-100 ease-in-out"
         href="/login"
        >
         <span
          className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
         >
          Login
         </span>
        </Link>
       </h3>
      </div>
      {/* <!-- Third Party Authentication Options --> */}
      <div
       id="third-party-auth"
       className="flex items-center justify-center flex-wrap"
      >
       <button
        onClick={() => signIn('google', { callbackUrl: "/" })}
        className="hover:scale-105 ease-in-out duration-300 shadow-lg p-1 rounded-lg m-1"
       >
        <img
         className="max-w-[25px]"
         src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
         alt="Google"
        />
       </button>
       <button
        onClick={() => signIn('github', { callbackUrl: "/" })}
        className="hover:scale-105 ease-in-out duration-300 shadow-lg p-1 rounded-lg m-1"
       >
        <img
         className="max-w-[25px] filter dark:invert"
         src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
         alt="Github"
        />
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default RegisterPage
