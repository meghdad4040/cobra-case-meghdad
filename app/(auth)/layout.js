import Image from "next/image"
import Link from "next/link"

const layout = ({ children }) => {
 return (
  <div className="bg-gray-200 relative w-full flex items-center flex-col min-h-screen gap-y-2">
   <div className="absolute top-[15%] left-[25%] w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70  "></div>
   <div className="absolute top-[15%] right-[25%] w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 "></div>
   <div className="absolute bottom-0 left-[35%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 "></div>
   <div className="tooltip tooltip-bottom my-3" data-tip="home">
    <Link href={"/"}>
     <Image src="/market.png" alt="Logo" width={80} height={80} />
    </Link>
   </div>
   {children}
  </div>
 )
}

export default layout
