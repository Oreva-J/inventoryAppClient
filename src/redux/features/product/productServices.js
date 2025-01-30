import axios from "axios"

// const product_url = import.meta.env.VITE_API_URL
const url = "http://localhost:3333/api"

// Create Product

const createProduct = async (formData) => {
    console.log(formData);
    const response = await axios.post(`${url}/products`, formData, {withCredentials:true})
    console.log(response.data);
    return response.data
}

// Fetch All Products

const getProducts = async () => {    
    const response = await axios.get(`${url}/products`, {withCredentials:true})
    return response.data
}

// Get Single Product
const getProduct = async (id) => {
    const response = await axios.get(`${url}/products/${id}`, {withCredentials:true})
    return response.data
 }

// delete Product
 const deleteProduct = async (id) => {
    await axios.delete(`${url}/products/${id}`, {withCredentials:true})
    
 }

//  Update Product
 const updateProduct = async (productData, id) => {
    console.log(productData, id);
    
    const response = await axios.patch(`${url}/products/${id}`, productData, {withCredentials:true})
    return response.data
    
 }

 const productServices = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}

export default productServices