import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "./productServices";
import { toast } from "react-toastify";

const initialState = {
    product: null,
    isLoading: false,
    isSuccess: false,
    message: "",
    isError: false,
    products: [],
    total: "",
    outOfStock : '' ,
    category : [],
    totalStoreValue: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
       CALC_OUTOFSTOCK : (state, action)=>{
        const array = []
        const products = action.payload
        products.map(item => {
            const {quantity, name} = item
            if (quantity === 0 || quantity === "0") {
                return array.push(name)
            }
        });
        state.outOfStock = array.length
       },

       TOTAL_STORE_VALUE : (state, action) => {
        const products = action.payload;
        const array = products.map(item => {
        const { quantity, price } = item;
        if (quantity && price) {
            return quantity * price;
        }
        return 0;
    });
        const totalStoreValue = array.reduce((acc, current) => acc + current, 0);
        state.totalStoreValue = totalStoreValue;
    },

    CAL_CATEGORY : (state, action) => {
        const products = action.payload;
        const array = [];
        products.map((product) => {
            const {category} = product
            return array.push(category)
        })
        const uniqueCategory = [...new Set(array) ]
        state.category = uniqueCategory
    },


    },
    extraReducers: (builder) => {
        builder
            // CREATE PRODUCT
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products.push(action.payload);
                toast.success("Product created!");
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // GET PRODUCTS
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
                
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // DELETE PRODUCT
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false
                toast.success("Product deleted!");
                
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error("Could not delete the product");
            })

            // GET SINGLE PRODUCT
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error("Could not fetch the product");
            })

            // UPDATE PRODUCT
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = true;
                state.product = action.payload;
                toast.success("Product updated successfully!");
                
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error("Could not update the product");
            });
    },
});

export const createProduct = createAsyncThunk(
    "product/create",
    async (formData, thunkAPI) => {
        try {
            return productServices.createProduct(formData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async (_, thunkAPI) => {
        try {
            return productServices.getProducts();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (id, thunkAPI) => {
        try {
            return productServices.getProduct(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, thunkAPI) => {
        try {
            return productServices.deleteProduct(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ productData, id }, thunkAPI) => {
        try {
            return productServices.updateProduct(productData, id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export default productSlice.reducer;

export const { CALC_OUTOFSTOCK, TOTAL_STORE_VALUE, CAL_CATEGORY, } = productSlice.actions

 export const selectIsLoading = (state) => state.product.isLoading;
// export const selectOutOfStock = (state) => state.product.outOfStock
// export const selectTotalStoreValue = (state) => state.product.totalStoreValue
