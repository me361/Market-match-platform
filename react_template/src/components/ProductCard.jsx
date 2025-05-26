import React from 'react';
import { Card, CardContent, Typography, Button, Box, Rating } from '@mui/material';
import { formatDistance } from 'date-fns';

const ProductCard = ({ product, onViewDetails }) => {
  const {
    product_name,
    description,
    price,
    unit,
    category,
    location,
    rating,
    created_at,
    image
  } = product;

  const timeAgo = created_at 
    ? formatDistance(new Date(created_at), new Date(), { addSuffix: true })
    : '';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {image && (
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${price} {unit && `/ ${unit}`}
        </Typography>
        {category && (
          <Typography variant="body2" color="text.secondary">
            Category: {category}
          </Typography>
        )}
        {location && (
          <Typography variant="body2" color="text.secondary">
            Location: {location}
          </Typography>
        )}
        {rating !== null && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({rating})
            </Typography>
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          Listed {timeAgo}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onViewDetails(product)}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard; 