'use client'
import React from "react"
import { HiOutlineTrash } from 'react-icons/hi'
import { useCartContext } from "@/context/cartcontext"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import getStripe from "@/utils/getStripe";
import { toast } from "react-hot-toast";

type Props = {
  product: Product
}
export default function CartPage() {

  const { cartItems, removeFromCart, totalPrice, totalQty, toggleCartItemQuantity } = useCartContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const res = await fetch('api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    console.log(res)

    if (res.status === 500) return;

    const data = await res.json();

    toast.loading('Redirecting...');

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: data.id });
    }
  }

  return (
    <div className=" max-w-5xl mx-auto px-8 xl:px-10 mt-48 mb-8 ">
      <h2 className="font-bold text-[1.5rem]">Shopping Cart</h2>
      <div className=" flex lg:flex-row justify-between gap-16">
        <div className="mt-8 gap-16 flex flex-col">
          {cartItems.length > 0 && (
            cartItems.map((item, index) => (
              <div className="flex gap-8" key={index}>

                <div className="h-[140px] rounded-lg">

                  <img src={item.image} alt={item.title} className="w-full h-full " />
                </div>
                <div className="flex flex-col justify-between w-3/4 gap-6">
                  <div className="flex justify-between items-start gap-16">
                    <h3 className="font-light text-xl">{item.title}</h3>
                    <button type='button' onClick={() => removeFromCart(item)} className='bg-transparent border-none'>
                      <HiOutlineTrash size={28} />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-xl">${(item.price * item.amount).toFixed(2)}</span>
                    <div className="flex items-center">
                      <span className='mr-2 border-2 bg-[#f1f1f1] rounded-full py-[7px] px-2 hover:cursor-pointer' onClick={() => toggleCartItemQuantity(item.id, 'dec')} ><AiOutlineMinus /></span>
                      <span >{item.amount}</span>
                      <span className='ml-2 border-2 bg-[#f1f1f1] rounded-full py-[7px] px-2 hover:cursor-pointer' onClick={() => toggleCartItemQuantity(item.id, 'inc')} ><AiOutlinePlus /></span>
                    </div>
                  </div>
                </div>


              </div>
            )))}
          {
            cartItems.length < 1 && (
              <div className='flex flex-col justify-center items-center '>
                <AiOutlineShopping size={150} />
                <h1 className="text-[2em] font-bold">Your shopping bag is empty</h1>
              </div>
            )
          }

        </div>
        {
          cartItems.length > 0 && (
            <div className='p-8 bg-[#fbfcff] flex flex-col gap-8'>
              <h3 className="text-[1.5em] font-bold ">Order Summary</h3>
              <div className='flex justify-between gap-16'>
                <p>Quantity</p>
                <span>{totalQty} Product</span>
              </div>
              <div className='flex justify-between gap-16'>
                <p>Sub Total</p>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div>
                <button className='flex py-[10px] font-bold leading-[18px] bg-[#212121] items-center text-white justify-center gap-2 w-full' type='button' onClick={handleCheckout}>Process to Checkout</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

