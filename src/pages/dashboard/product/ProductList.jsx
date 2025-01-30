import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaCheckDouble, FaRegEdit, FaRegEye } from 'react-icons/fa';
import Search from '../../../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/Filter/filterSlice';

const ProductList = ({ products, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpen = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedProductId);
    handleClose();
  };

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filteredProduct = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [dispatch, search, products]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;  // Number of items per page

  // Calculate the start and end indices for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Slice the products to display only those on the current page
  const currentProducts = filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="p-5 flex justify-end">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="p-10 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="leading-none opacity-70">s/n</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="opacity-70">Name</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="opacity-70">Category</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="opacity-70">Price</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="opacity-70">Quantity</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="opacity-70">Value</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="opacity-70">Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product._id} className="even:bg-gray-100 hover:bg-blue-50">
                <td className="p-4">{indexOfFirstProduct + index + 1}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">{product.quantity}</td>
                <td className="p-4">{product.quantity * product.price}</td>
                <td className="p-4">
                  <div className="flex space-x-5">
                    <Link to={`singleproduct/${product._id}`}>
                      <FaRegEye className="text-green-500 hover:scale-125" />
                    </Link>
                    <Link to={`updateproduct/${product._id}`}>
                      <FaRegEdit className="text-purple-700 hover:scale-125" />
                    </Link>
                    <RiDeleteBin6Line
                      onClick={() => handleOpen(product._id)}
                      className="text-red-500 hover:scale-125"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view (stack data vertically) */}
      <div className="md:hidden">
        {currentProducts.map((product, index) => (
          <div key={product._id} className="border-b p-4 flex flex-col">
            <div className="flex justify-between">
              <p className="font-semibold">Name:</p>
              <p>{product.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Category:</p>
              <p>{product.category}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Price:</p>
              <p>{product.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Quantity:</p>
              <p>{product.quantity}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Value:</p>
              <p>{product.quantity * product.price}</p>
            </div>
            <div className="flex space-x-3 mt-2">
              <Link to={`singleproduct/${product._id}`}>
                <FaRegEye className="text-green-500 hover:scale-125" />
              </Link>
              <Link to={`updateproduct/${product._id}`}>
                <FaRegEdit className="text-purple-700 hover:scale-125" />
              </Link>
              <RiDeleteBin6Line
                onClick={() => handleOpen(product._id)}
                className="text-red-500 hover:scale-125"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-4">{`Page ${currentPage}`}</span>
        <Button
          variant="outlined"
          disabled={indexOfLastProduct >= filteredProduct.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Modal for confirmation */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Are you sure you want to delete this product?
          </Typography>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleClose}
              color="secondary"
              variant="outlined"
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
            >
              Confirm Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;
