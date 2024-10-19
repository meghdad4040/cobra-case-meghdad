"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"


const ProviderSession = ({ children, session }) => {
 return (
  <SessionProvider session={session}>
   {children}
   <Toaster />
  </SessionProvider>
 )
}

export default ProviderSession
