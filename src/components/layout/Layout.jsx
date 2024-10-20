import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import TestNavbar from '../navbar/testNavbar'


const Layout = ({children}) => {
  return (
    <div>
      {/* <Navbar /> */}
      <TestNavbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
