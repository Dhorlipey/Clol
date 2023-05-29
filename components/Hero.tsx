import React from 'react'
import { CgShoppingCart } from 'react-icons/cg'

export default function () {
  return (
    <div className='flex justify-between gap-16 mb-16 relative'>
      <div className='flex'>
        <div className='flex flex-col gap-[2.5rem] '>
          <h1 className='font-bold leading-[55px] text-[3.5em] text-[#212121] '>Industrial Wear</h1>
          <p className='font-light text-[1em] text-[#666] w-[70%] leading-[24px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis dignissimos consequatur ratione facere optio autem numquam error quia doloribus, temporibus molestias quisquam laboriosam eum non, culpa aperiam maxime dolorum. Maiores.</p>
          <div className="pt-0">
            <button className="font-bold bg-[#212121] py-2.5 px-8 gap-2 flex items-center justify-center text-white leading-4">
              <CgShoppingCart size={20} /> Start Shopping
            </button>
          </div>
        </div>

      </div>
      <div className='flex'>
        <div className='w-[500px] h-[500px] bg-[#adb5df] rounded-[50%]'>

        </div>
      </div>
    </div>
  )
}
