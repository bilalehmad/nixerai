'use client';

import Link from 'next/link';
import React, { useState } from 'react'

const PromptCategoryList = ({data}) => {
    const [posts, setPosts] = useState(data)
  return (
    <div className='flex flex-col'>
        <h1 className="category_text mb-4">Categories</h1>
        <div className='grid grid-cols-2 justify-center'> 
            {data.map((value) => (
            <div key={value._id} className='inline-flex w-full px-5 py-1 justify-start'>
                   <Link href={`/?include=${value.name}`} className='hover:underline'>{value.name}</Link> 
            </div>
            ))}
        </div>
    </div>
  )
}

export default PromptCategoryList