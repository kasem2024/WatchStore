"use client";

import { TProduct } from '@/db'
import React from 'react'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const Product = ({product }:{product :TProduct}) => {
  return (
    <CardContainer className="inter-var">
    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[24rem] sm:w-[18rem] md:w-[15rem] h-auto  rounded-xl p-4 border  ">
     

      <CardItem translateZ="100" className="w-full mt-2">
        <Image
          src={product.imageId}
          height="1000"
          width="1000"
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem>
      <div className="flex justify-between items-center mt-10">
        <CardItem
          translateZ={20}
        
          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
        >
          {product.name}
        </CardItem>
        <CardItem
          translateZ={20}
          className="px-4 py-2 rounded-xl bg-violet-700 dark:bg-white dark:text-black text-white text-xs font-bold"
        >
           Size {product.size.toUpperCase()} , {product.color}
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
   
  )
}

export default Product


{/* <div className='group relative'>
<div className='aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-auto group-hover:opacity-75 lg:h-80'>
    <img src={product.imageId} alt='product image' className='h-full w-full object-cover object-center'/>
</div>
<div className='mt-4 flex justify-between '>
  <div>
      <h3 className='text-sm text-gray-700'>{product.name}</h3>
      <p className='mt-1 text-sm text-gray-500'>
          Size {product.size.toUpperCase()} , {product.color}
      </p>
  </div>
  <p className='text-sm font-medium text-gray-900'>{product.price}{" "}$</p>
</div>
</div> */}