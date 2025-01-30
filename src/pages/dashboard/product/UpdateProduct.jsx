import { Button, Card, CardActions, CardContent, CardHeader, Grid2, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../../../redux/features/product/productSlice';

const initialData = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  description: "",
};

const UpdateProduct = () => {
  const [formData, setFormData] = useState(initialData);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const { name, category, price, quantity, description } = formData;
  const params = useParams();
  const id = params.id;

  const { product, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Fetch product data on mount
  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProduct(id));
    } else {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
        description: product.description || "",
        category: product.category || "",
      });
      setImagePreview(product.image?.filePath || ""); // Set image preview URL if available
    }
  }, [dispatch, id, product]);

  // Handle form input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate SKU
  const generateSKU = () => {
    const initial = category.slice(0, 3).toUpperCase();
    const num = Date.now();
    return initial + num;
  };

  // Handle form submission (update product)
  const formUpdate = async (e) => {
    e.preventDefault();
    
    // Basic validation for required fields
    if (!formData.name || !formData.price || !formData.quantity || !formData.description || !imagePreview) {
      alert('Please fill all required fields');
      return;
    }

    // Create FormData for API call
    const productData = new FormData();
    productData.append('name', name);
    productData.append('category', category);
    productData.append('quantity', quantity);
    productData.append('price', price);
    productData.append('sku', generateSKU());
    productData.append('description', description);
    if (productImage) productData.append('image', productImage);

    await dispatch(updateProduct({ productData, id }));
    console.log("data:::::", productData);
    
    navigate('../');
  };

  return (
    <div>
      <Paper elevation={5} sx={{ padding: "20px", margin: "10px" }}>
        <Card>
          <CardHeader title="Update Product" />
          <CardContent>
            <form onSubmit={formUpdate}>
              <Grid2 container rowSpacing={2} columnSpacing={2}>
                <Grid2 item xs={12} md={8} lg={6} sx={{ margin: 'auto' }}>
                  <TextField
                    fullWidth
                    required
                    margin="dense"
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 item xs={12} md={8} lg={6} sx={{ margin: 'auto' }}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'block', margin: '10px 0' }}
                  />
                  <div>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Product Preview" style={{ width: '100%', height: 'auto' }} />
                    ) : (
                      <p>No image selected</p> // Optional: add a message if no image is selected
                    )}
                  </div>
                </Grid2>

                <Grid2 item xs={12} sm={6} md={4}>
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
                </Grid2>

                <Grid2 item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    margin="dense"
                    label="Price"
                    variant="outlined"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    margin="dense"
                    label="Quantity"
                    variant="outlined"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 item xs={12}>
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
                </Grid2>

                <Grid2 item xs={12}>
                  <Button type="submit" variant="outlined" fullWidth>
                    Update Product
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </CardContent>
          <CardActions />
        </Card>
      </Paper>
    </div>
  );
};

export default UpdateProduct;
