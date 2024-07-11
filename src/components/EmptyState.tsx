import { XCircle } from 'lucide-react'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='relative col-span-full h-80 bg-gray-50 w-full p-12 flex flex-col items-center justify-center'>
        <XCircle className='h-10 w-10 text-red-500'/>
        <h3 className='font-semibold text-xl'>No Watches found </h3>
        <p className='text-zinc-500 text-sm'>we found no Search results for these filters</p>
    </div>
  )
}

export default EmptyState