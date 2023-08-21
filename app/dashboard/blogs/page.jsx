import BlogDetail from '@components/dashboard/BlogDetail';
import React from 'react'

const fetchFirstPosts = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs`);
    const posts = await response.json();
    return posts;
  }
const BlogList = async () => {
    const data =  await fetchFirstPosts();
    return (
      <div className='h-screen p-4 sm:ml-64 w-full'>
          <div className='mt-20'>
              
          <BlogDetail data= {data} />
  
          </div>
      </div>
    )
}

export default BlogList