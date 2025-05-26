import React, { useState } from 'react';

const PostBuyRequest = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product || !quantity) {
      alert('Please fill in all fields.');
      return;
    }
    // For now just log the data
    console.log('Buy request posted:', { product, quantity });
    alert('Your buy request has been submitted!');
    setProduct('');
    setQuantity('');
  };

  return (
    <div className="post-buy-request">
      <h2>Post a Buy Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter product name"
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
          />
        </label>
        <br />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default PostBuyRequest;
