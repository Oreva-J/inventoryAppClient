import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/features/product/productSlice';
import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography, CircularProgress } from '@mui/material';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Destructure state from Redux store
  const { product, isLoading, isError, errorMessage } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Show loading spinner if product is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Show error message if product fetch failed
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <Typography variant="h6">{errorMessage || 'Failed to load product.'}</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen border">
      <Paper className="flex justify-center mx-[10%] min-h-96">
        <Card sx={{ maxWidth: 345, margin: 5 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={product?.image?.filePath || 'fff.png'} // Use a fallback image if product image is unavailable
            title={product?.name || 'Product Image'}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              SKU: {product?.sku}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Category: {product?.category}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Price: ${product?.price}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              QTY in Stock: {product?.quantity}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Total Value in Stock: ${(product?.price * product?.quantity).toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product?.description || 'No description available'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
};

export default SingleProduct;
