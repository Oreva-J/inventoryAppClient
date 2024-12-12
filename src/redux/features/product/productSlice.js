import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const product_Backend_url = "http://localhost:3333/api/products/" 

 const initialState = {
    name: "",
    isLoading: false,
    error: "",
    product: {
        name: "", 
        category: "", 
        quantity: "", 
        price: "",
        description: "",
        image: ""
    }
 }

 const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createProduct.pending, (state)=>{
            state.isLoading = true
            state.product = []
            state.name = ""
            state.error = ""
        })
        builder.addCase(createProduct.fulfilled, (state, action)=>{
            state.isLoading = false
            //state.name = name
            state.product = action.payload
            state.error = ""
        })
        builder.addCase(createProduct.rejected, (state, action)=>{
            state.isLoading = false
            state.name = ""
            state.product = []
            state.error = action.error.message
        })
    }
 })


 

 export const createProduct = createAsyncThunk(
    "create/product",
    async ()=>{
       try {
        const response = await axios.post(`${product_Backend_url}`, {withCredentials: true})
        return response.data
       } catch (error) {
        const message = 
        (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
        console.error(message);
        
       }

    }
 )

 export default productSlice.reducer

 export const isLoading = (state)=> state.product.isLoading