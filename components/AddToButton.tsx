'use client'
import React, { useContext } from 'react';
import { CartContext } from '@/context/cartcontext';

type Props = {
  product: Product;
};

const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button onClick={handleAddToCart} className="add-to-cart-button">
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
