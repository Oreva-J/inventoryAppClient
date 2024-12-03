import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { bventSection } from '../../../utils/content'

const {Items} = bventSection
const BventSection = () => {
  return (
    <Box color="text.primary" sx={{ mt:{ xs:5, md: 10, lg: 15, }, bgcolor: '#030b6b', position: "relative" }}>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#06070A" fill-opacity="1" d="M0,64L0,32L62.6,32L62.6,96L125.2,96L125.2,192L187.8,192L187.8,192L250.4,192L250.4,320L313,320L313,96L375.7,96L375.7,64L438.3,64L438.3,32L500.9,32L500.9,32L563.5,32L563.5,96L626.1,96L626.1,96L688.7,96L688.7,128L751.3,128L751.3,64L813.9,64L813.9,256L876.5,256L876.5,288L939.1,288L939.1,64L1001.7,64L1001.7,32L1064.3,32L1064.3,64L1127,64L1127,288L1189.6,288L1189.6,96L1252.2,96L1252.2,288L1314.8,288L1314.8,32L1377.4,32L1377.4,160L1440,160L1440,0L1377.4,0L1377.4,0L1314.8,0L1314.8,0L1252.2,0L1252.2,0L1189.6,0L1189.6,0L1127,0L1127,0L1064.3,0L1064.3,0L1001.7,0L1001.7,0L939.1,0L939.1,0L876.5,0L876.5,0L813.9,0L813.9,0L751.3,0L751.3,0L688.7,0L688.7,0L626.1,0L626.1,0L563.5,0L563.5,0L500.9,0L500.9,0L438.3,0L438.3,0L375.7,0L375.7,0L313,0L313,0L250.4,0L250.4,0L187.8,0L187.8,0L125.2,0L125.2,0L62.6,0L62.6,0L0,0L0,0Z"></path></svg>
      <Container>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-around", alignItems: "center" }}>
            <div className='md:w-1/2'>
                <Typography variant='h3' sx={{ textAlign:{xs: "center", md: "start"} }} >{Items.title}</Typography>
                <Typography variant='body2' sx={{ mt:3, textAlign:{xs: "center", md: "start"} }}>{Items.subtitle}</Typography>
            </div>
            <div>
                <img src={Items.stockImg} alt="" />
            </div>
        </Stack>
      </Container>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M649.97 0L599.91 54.12 550.03 0 0 0 0 120 1200 120 1200 0 649.97 0z" class="shape-fill"></path>
    </svg>
    </Box>
  )
}

export default BventSection
