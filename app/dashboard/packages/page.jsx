import PackageDetail from '@components/dashboard/PackageDetail';
import React from 'react'

const fetchFirstPosts = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pakages`);
    const posts = await response.json();
    return posts;
  }
const PackageList = async () => {
    const data =  await fetchFirstPosts();
  return (
    <div className='h-screen p-4 sm:ml-64 w-full'>
        <div className='mt-20'>
            
        <PackageDetail data= {data} />

        </div>
    </div>
  )
}

export default PackageList