import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import theme from '../../utils/theme'
import { ThemeProvider } from '@emotion/react'

const Layout = () => {
  return (

    <ThemeProvider theme={theme}>
        <Header />
        <main className='mt-20 relative'>
            <Outlet /> 
        </main>
        
        <Footer />
      
      </ThemeProvider>
  )
}

export default Layout
