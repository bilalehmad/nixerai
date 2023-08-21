import SubscriptionDetail from '@components/dashboard/SubscriptionDetail';
import React from 'react'

export const revalidate = 0

const fetchFirstPosts = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/subscription`);
    const posts = await response.json();
    return posts;
  }
const SubscriptionList = async () => {
    const data =  await fetchFirstPosts();
  return (
    <div className='h-screen p-4 sm:ml-64 w-full'>
    <div className='mt-20'>
        
    <SubscriptionDetail data= {data} />

    </div>
</div>
  )
}

export default SubscriptionList