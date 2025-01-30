import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BsCart4 } from "react-icons/bs";
import { CAL_CATEGORY, CALC_OUTOFSTOCK, deleteProduct, getProduct, getProducts, TOTAL_STORE_VALUE } from '../../redux/features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './product/ProductList';
import ProductChart from './product/ProductChart';

const trans = "transition ease-in-out delay-75 duration-500"
const Dashboard = () => {

  const dispatch = useDispatch()
  const { products, message, isError, isLoading, totalStoreValue, category, outOfStock, }
    = useSelector((state) => state.product)

  // Product Delete
  const handleDelete = async (id) => {

    await dispatch(deleteProduct(id));
    await dispatch(getProducts())

  }


  // Fetch products only once when the component is mounted or when `isSuccess` is true (after successful deletion)
  useEffect(() => {

    dispatch(getProducts()); // Fetch products if deletion was successful

  }, [isError, message, dispatch]); // Only run when deletion is successful

  useEffect(() => {

    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(TOTAL_STORE_VALUE(products))
    dispatch(CAL_CATEGORY(products))

  }, [dispatch, products])



  return (
    <div className=' pr-10'>

      <div className='text-white md:flex space-y-2 md:space-y-0 md:gap-1 transition ease-in-out delay-150 '>
        {/*Total product Box */}
        <div className={`w-64 h-24 bg-purple-500 flex justify-center items-center gap-x-6 ${trans} hover:-translate-y-3`}>
          <BsCart4 size={40} color='white' />
          <div>
            <p>Total Products:</p>
            <p>{products.length}</p>
          </div>
        </div>
        {/* Total Store Value Box */}
        <div className={`w-64 h-24 bg-green-500 flex justify-center items-center gap-x-6 ${trans} hover:-translate-y-3`}>
          <BsCart4 size={40} color='white' />
          <div>
            <p>Total Store Value</p>
            <p>{totalStoreValue}</p>
          </div>
        </div>
        {/* Out of Stock Box */}
        <div className={`w-64 h-24 bg-red-500 flex justify-center items-center gap-x-6 ${trans} hover:-translate-y-3`}>
          <BsCart4 size={40} color='white' />
          <div>
            <p>Out of Stock: </p>
            <p>{outOfStock}</p>
          </div>
        </div>
        {/* All Categories Box */}
        <div className={`w-64 h-24 bg-purple-500 flex justify-center items-center gap-x-6 ${trans} hover:-translate-y-3`}>
          <BsCart4 size={40} color='white' />
          <div>
            <p>All Categories:</p>
            <p>{category.length}</p>
          </div>
        </div>

      </div>
      <hr />

      <ProductList products={products} handleDelete={handleDelete} />

      <hr />
      
        <ProductChart />
      

    </div>
  )
}

export default Dashboard
