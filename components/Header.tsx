'use client'
import Image from "next/image";
import Link from "next/link";
import { CgShoppingCart } from "react-icons/cg";
import { useCartContext } from "@/context/cartcontext";

function Header() {
  const { totalQty } = useCartContext()
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow">
      <Link href="/">
        <Image
          src="/logo.png"
          width={70}
          height={70}
          alt="Logo"
        />
      </Link>

      <div className="flex items-center space-x-2.5 text-sm">
        <Link className="relative " href="/cart">
          <CgShoppingCart size={30} />
          <span className='absolute top-[-5px] right-[-6px] text-[12px] font-bold text-center w-[18px] h-[18px] rounded-lg bg-[#0062f5] text-[#eee]'>{totalQty}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;