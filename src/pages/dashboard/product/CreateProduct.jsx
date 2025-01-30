import { Button, Card, CardActions, CardContent, CardHeader, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { createProduct } from '../../../redux/features/product/productSlice'
import { useDispatch } from 'react-redux'


const initialData = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
}
const CreateProduct = () => {
    const [formData, setFormData] = useState(initialData)
    const [productImage, setProductImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")

    const {name, category, price, quantity, description} = formData

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImageChange = (e)=>{

        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))

    }

    const generateSKU = ()=>{
        const initial = category.slice(0, 3).toLocaleUpperCase()
        const num = Date.now()
        const sku = initial + num
        return sku
    }



    const formSubmit = async (e) => {
        e.preventDefault()

        const productData = new FormData();
        productData.append('name', name);
        productData.append('category', category);
        productData.append('quantity', quantity)
        productData.append('price', price)
        productData.append('sku', generateSKU())
        productData.append('description', description)
        productData.append('image', productImage)

        await dispatch(createProduct(productData))

        
        
    }

    return (
        <div className="container mx-auto p-5">
            <Paper elevation={5} sx={{ padding: "20px", margin: "10px", borderRadius: "8px" }}>
                <Card>
                    <CardHeader title="Add Product" sx={{ fontWeight: 'bold' }} />
                    <CardContent>
                        <form onSubmit={formSubmit}>
                            <Grid container spacing={2}>
                                {/* Name Input */}
                                <Grid item xs={12} sm={8} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* Image Input */}
                                <Grid item xs={12} sm={8} md={6}>
                                    <Card>
                                    <input type='file' name='productImage' onChange={(e)=>handleImageChange(e)} />
                                    {/* <TextField
                                        fullWidth
                                        margin="dense"
                                        label="Image URL"
                                        variant="outlined"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                    /> */}
                                    <div>
                                        <img src={imagePreview} alt="product image" />
                                    </div>
                                    </Card>
                                </Grid>

                                {/* Category Input */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        label="Category"
                                        variant="outlined"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* Price Input */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        label="Price"
                                        variant="outlined"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                </Grid>

                                {/* Quantity Input */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        label="Quantity"
                                        variant="outlined"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                </Grid>

                                {/* Description Input */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        label="Description"
                                        variant="outlined"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ padding: "10px 20px", fontSize: "16px" }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            </Paper>
        </div>
    )
}

export default CreateProduct
