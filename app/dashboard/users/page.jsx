import UserDetail from '@components/dashboard/UserDetail'
import React from 'react'

export const revalidate = 0;

const fetchFirstPosts = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
    const posts = await response.json();
    return posts;
  }
const UserList = async() => {
    const data =  await fetchFirstPosts();
  return (
    <div className='p-4 sm:ml-64 w-full'>
        <div className=' mt-20'>
           <UserDetail data={data} />
        </div>
    </div>
  )
}

export default UserList