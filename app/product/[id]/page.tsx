'use client'
import ProductImage from "@/components/ProductImage";
import { useEffect, useCallback, useState } from 'react';
import { useCartContext } from "@/context/cartcontext";
import NotFound from "./not-found";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CgShoppingCart } from 'react-icons/cg';

type Props = {
  params: {
    id: string
  }
};

export default function ProductPage({ params: { id } }: Props) {
  const { addToCart, incQty, decQty, qty } = useCartContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const productData: Product = await res.json();

      setProduct(productData);
    } catch (error) {
      NotFound();
    }
  }, [id]);

  const handleDecQty = useCallback(() => {
    decQty();
  }, [decQty]);

  const handleIncQty = useCallback(() => {
    incQty();
  }, [incQty]);

  if (!product) {
    return null; // You can return a loading state or handle the absence of product data
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-8 mt-48 pb-10">
        <ProductImage product={product} />

        <div>
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
          </div>
          <div className="flex gap-8 items-center">
            <h3 className="font-bold">Quantity:</h3>
            <div className="flex items-center">
              <span className='mr-2 border-2 bg-[#f1f1f1] rounded-full py-[7px] px-2 hover:cursor-pointer' onClick={handleDecQty}><AiOutlineMinus /></span>
              <span>{qty}</span>
              <span className='ml-2 border-2 bg-[#f1f1f1] rounded-full py-[7px] px-2  hover:cursor-pointer' onClick={handleIncQty}><AiOutlinePlus /></span>
            </div>
          </div>

          <div className="pt-8">
            <button className="font-bold bg-[#212121] py-2.5 px-8 gap-2 flex items-center justify-center text-white leading-4" onClick={() => addToCart(product)}>
              <CgShoppingCart size={20} /> Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col mt-16 gap-8 pt-8 px-8 pb-24">
        <div className="flex z-2 w-full h-[150] border-b-2 border-[#c4c4c4] relative">
          <div className="flex font-bold text-[60px] sm:text-8xl text-[#f2f3f7] opacity-70 w-full h-full">Overview</div>
          <h2 className="font-bold text-xl tracking-wider color-[#212121] pb-12 z-2 absolute top-[40%]">Product Information</h2>
        </div>
        <div>
          <p className="font-light text-[1rem] leading-7 text-justify color-[#212121] tracking-wider">{product.description.charAt(0).toUpperCase() + product.description.slice(1)}</p>
        </div>
      </div>
    </div>
  );
}
