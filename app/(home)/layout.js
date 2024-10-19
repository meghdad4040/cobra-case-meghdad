import Header from "../_components/Header"


const layout = ({ children }) => {
 return (
  <div className=" min-h-screen">
   <Header />
   {children}
  </div>
 )
}

export default layout
