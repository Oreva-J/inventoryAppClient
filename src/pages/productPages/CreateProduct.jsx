import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid2, Input, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { createProduct } from '../../redux/features/product/productSlice'
import { useDispatch } from 'react-redux'


const initialData = {
    image: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
}
const CreateProduct = () => {
    const [formData, setFormData] = useState(initialData)
    const dispatch = useDispatch
    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
        
    }

    const formSubmit = (e)=>{
        e.preventDefault()

        dispatch(createProduct(formData))
        
    }
  return (
    <div>
        <Paper elevation={5} sx={{padding:"20px", margin:"10px"}}>
            <Card>
                <CardHeader title="Add Product" />
                <CardContent>
            <form action="" onSubmit={formSubmit}>
                <Grid2 container rowSpacing={2} columnSpacing={1} >
                    <Grid2 size={8} offset={2} >
                        <TextField fullWidth required  margin='dense' label="Name" variant="outlined" name='name' value={formData.name} onChange={handleChange} />
                    </Grid2>
                    <Grid2 size={8} offset={2}>
                        <TextField fullWidth   margin='dense' label="Imag4" variant="outlined" name='image' value={formData.image} onChange={handleChange} />
                    </Grid2>
                    <Grid2 size={3} offset={2} >
                        <TextField size="small" type='mumber' fullWidth required  margin='dense' label="Category" variant="outlined" name='category' value={formData.category} onChange={handleChange} />
                    </Grid2>
                    <Grid2 size={3} >
                        <TextField size="small" fullWidth required  margin='dense' label="Price" variant="outlined" name='price' value={formData.price} onChange={handleChange} />
                    </Grid2>
                    <Grid2 size={3} >
                        <TextField size="small" fullWidth required  margin='dense' label="Quantity" variant="outlined" name='quantity' value={formData.quantity} onChange={handleChange} />
                    </Grid2>
                    <Grid2 size={12}  >
                        <TextField fullWidth required  margin='dense' label="description" variant="outlined" name='description' value={formData.description} onChange={handleChange} />
                    </Grid2 >
                    
                        <Button type='submit' variant='outlined'>Submit</Button>
                </Grid2>

            </form>
            </CardContent>
            <CardActions>
                
            </CardActions>
            </Card>
       </Paper>
    </div>
  )
}

export default CreateProduct
