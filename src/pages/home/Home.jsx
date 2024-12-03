import React from 'react'
import Layout from './Layout'
import Section1 from './containers/Section1'
import Section2 from './containers/Section2'
import BventSection from './containers/BventSection'
import Section9 from './containers/Section9'
import { Box } from '@mui/material'
import Section4 from './containers/Section4'

const Home = () => {
  return (
    <div className=''>
      <Section1 />
      <Section2 />
      <Box sx={{ bgcolor: "background.default", position: "relative" }}>
        <BventSection />
        <Section9 />
        <Section4 />

      </Box>
    </div>
  )
}

export default Home
