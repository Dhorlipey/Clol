'use client'
import { createContext, useState, ReactNode, useContext } from 'react';
import { toast } from 'react-hot-toast';

type CartContextProps = {
  cartItems: Product[];
  qty: number,
  totalPrice: number;
  totalQty: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  increaseAmount: (productId: number) => void;
  decreaseAmount: (productId: number) => void;
  incQty: () => void;
  decQty: () => void;
  toggleCartItemQuantity: (id: number, value: string) => void
};

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  qty: 1,
  totalPrice: 0,
  totalQty: 0,
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  increaseAmount: () => { },
  decreaseAmount: () => { },
  incQty: () => { },
  decQty: () => { },
  toggleCartItemQuantity: () => { }
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [qty, setQty] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQty, setTotalQty] = useState<number>(0);


  let foundProduct: any;
  let index;

  const addToCart = (product: Product) => {

    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((item) => item.id === product.id);

      if (existingCartItem) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + qty } : item
        );
      } else {
        return [...prevCartItems, { ...product, amount: qty }];
      }
    });
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
    setTotalQty((prevTotalQty) => prevTotalQty + qty);
    toast.success(`${qty} ${product.title} added to the cart.`);
  };


  const removeFromCart = (product: Product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.amount);
    setTotalQty((prevTotalQty) => prevTotalQty - foundProduct.amount);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseAmount = (productId: number) => {
    const cartItem = cartItems.find(item => item.id === productId);
    if (cartItem) {
      addToCart(cartItem)
    }

  }
  const decreaseAmount = (productId: number) => {
    const cartItem = cartItems.find(item => item.id === productId);
    if (cartItem) {
      const newCart = cartItems.map(item => {
        if (item.id === productId) {
          return { ...item, amount: cartItem.amount - 1 }
        } else {
          return item
        }
      })
      setCartItems(newCart)
    }

  }
  const incQty = () => {

    setQty(qty + 1);

  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty <= 1) {
        return 1; // Prevent quantity from going below 1
      } else {
        return prevQty - 1;
      }
    });
  };

  const toggleCartItemQuantity = (id: number, value: string) => {
    foundProduct = cartItems.find((item) => item.id === id)
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = cartItems.filter((item) => item.id !== id)

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, amount: foundProduct.amount + 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQty(prevTotalQty => prevTotalQty + 1)
    } else if (value === 'dec') {
      if (foundProduct.amount > 1) {
        setCartItems([...newCartItems, { ...foundProduct, amount: foundProduct.amount - 1 }]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQty(prevTotalQty => prevTotalQty - 1)
      }
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, qty, incQty, decQty, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, totalPrice, totalQty, toggleCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => useContext(CartContext)