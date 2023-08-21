import UserDetail from '@components/dashboard/UserDetail'
import React from 'react'

const fetchFirstPosts = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
    const posts = await response.json();
    return posts;
  }
const UserList = async() => {
    const data =  await fetchFirstPosts();
  return (
    <div className='h-screen p-4 sm:ml-64 w-full'>
        <div className=' mt-20'>
           <UserDetail data={data} />
        </div>
    </div>
  )
}

export default UserList