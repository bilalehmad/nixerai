import PostArticle from '@components/blogs/PostArticle';
import React from 'react'

export const revalidate = 0;

const fetchBlogs = async (id) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs/${id}`);
    const blogs = await response.json();
    return blogs;
  }
const Article = async ({params}) => {
    const {id} = params;
    const data =  await fetchBlogs(id);
    //console.log(data)

  return (
    <section className='mx-auto max-w-screen-xl '>
    
    <PostArticle content={data} />
    </section>
  )
}

export default Article