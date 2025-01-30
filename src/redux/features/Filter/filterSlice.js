import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_PRODUCTS: (state, action) => {
      const { products, search } = action.payload;
      const searchLowerCase = search.toLowerCase();  // Convert the search term to lowercase once
      const searchResult = products.filter((product) =>
        product.name.toLowerCase().includes(searchLowerCase) || 
        product.category.toLowerCase().includes(searchLowerCase)
      );
      state.filteredProducts = searchResult;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer;
