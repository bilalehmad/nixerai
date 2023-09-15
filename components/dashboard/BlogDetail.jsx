'use client';

import {useEffect, useState} from 'react'
import BlogTable from './tables/BlogTable';
import BlogModal from './modal/BlogModal';
import { useSession } from 'next-auth/react';


const BlogDetail = ({data}) => {
    const [post, setPost] = useState(data); 
    const [validation, setValidation] = useState(false);
    const [formerror, setFormerror] = useState("");
    const [action, setAction] = useState("");
    const [modal, setModal] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [submitting, setsubmitting] = useState(false);
    const [editPost, setEditPost] = useState({
      subject: "",
      title: "",
      article: "",
      auther: "",
      tags: ""
    });

    
  const {data : session} = useSession();
  const onPageChange = (id) => {
    setBlogId(id)
    const checkId = isString(id);
    checkId ? setAction("Edit") : setAction("Add");
    
    setValidation(false)
    setFormerror("")
    setEditPost({
      subject: "",
      title: "",
      article: "",
      auther: "",
      tags: ""
    })
  
    setModal((prev) => !prev)
  };
  useEffect(() => {
    const checkId = isString(blogId);
    const getBlogDetails = async () => {
      const response = await fetch(`/api/blogs/${blogId}`);
      const data = await response.json();
      setEditPost((prevState) => ({
        ...prevState,
          auther: data.auther,
          subject: data.subject,
          title: data.title,
          article: data.article,
          tags: data.tags
      }))
  
    }
    if(checkId) getBlogDetails();
  }, [blogId])
  const updateUser = async (e) => {
    e.preventDefault();
    setValidation(false)
    setFormerror("")
    const checkId = isString(blogId);

    if(editPost.subject == '')
    {
      
      setValidation(true)
      setFormerror("Please Select the Subject Dropdown")

    }
    else if(editPost.title == '')
    {
      setValidation(true)
      setFormerror("Please Write down the Title")
    }
    else if(editPost.article == '')
    {
      setValidation(true)
      setFormerror("Please Write down the Aricle")
    }
    else if(editPost.tags == '')
    {
      setValidation(true)
      setFormerror("Please Write down the Tags")
    }
    else
    {
      
      setsubmitting(true);
      setValidation(false)
      setFormerror("")
      if(checkId)
      {
        try {
          const respose = await fetch(`/api/blogs/update`,{
              method :'PATCH',
              body : JSON.stringify({
                id: blogId,
                userId: session?.user.id,
                auther: editPost.auther,
                title: editPost.title,
                subject: editPost.subject,
                article: editPost.article,
                tags: editPost.tags,
              })
          })

          if (respose.ok) {
              setModal((prev) => !prev);
              const updatedValues = {
                _id: blogId,
                auther: editPost.auther,
                subject: editPost.subject,
                title: editPost.title,
                article: editPost.article,
                tags: editPost.tags
              };

              // Usage
              const newState = post.map(obj => {
                // 👇️ if id equals 2, update country property
                if (obj._id === blogId) {
                  return {...obj, ...updatedValues};
                }
          
                // 👇️ otherwise return the object as is
                return obj;
              });
              setPost(newState);
              

          }
      } catch (error) {
          console.log(error)
      }
      finally{
          setsubmitting(false)
      }
      
      
    }
    else
    {
      try {
        const respose = await fetch(`/api/blogs/new`,{
            method :'POST',
            body : JSON.stringify({
              userId: session?.user.id,
              auther: editPost.auther,
              title: editPost.title,
              subject: editPost.subject,
              article: editPost.article,
              tags: editPost.tags,
            })
        })

        if (respose.ok) {
            setModal((prev) => !prev);
            const data = await respose.json();
            setPost(prevUsers => [...prevUsers, data]);
            // const updatePrompt = (id, newValues) => {
            //   setPost(prev => 
            //     prev.map(prompt => 
            //       prompt._id === id ? { ...prompt, ...newValues } : prompt
            //     )
            //   );
            // }
            
            // // Usage
            // updatePrompt(promptId, {
            //   title: editPost.title,
            //   teasor: editPost.teasor,
            //   sample: editPost.sample,
            //   accessLevel: editPost.accessLevel,
            //   status: editPost.status,
            //   tag : editPost.tag
            // });

        }
    } catch (error) {
        console.log(error)
    }
    finally{
        setsubmitting(false)
    }
    }
  }
}
 
  function isString(data) {
    if (typeof data === 'string') {
      return true;
    } else if (typeof data === 'object') {
      return false;
    }
  }
  return (
    <div>
    <div className='py-2'>
      <button onClick={onPageChange} type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 ">
      <svg viewBox="0 0 448 512"  className="w-4 h-4 fill-white text-white mr-1" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        Add Blogs
      </button>
    </div>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                      <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
              </th> */}
              <th scope="col" className="px-6 py-3">
                  Subject
              </th>
              <th scope="col" className="px-6 py-3">
              Title
              </th>
              <th scope="col" className="px-6 py-3">
                  Tags
              </th>
              <th scope="col" className="px-6 py-3">
                  Action
              </th>
          </tr>
      </thead>
      
  <tbody>
  {post.map((post) => (
      <BlogTable 
        key={post._id}
        post={post}
        onPageChange={onPageChange}
      />
      ))}
      </tbody>
  </table>
  {modal && 
        <BlogModal 
          type = {action}
          handleSubmit={updateUser}
          submitting={submitting}
          post={editPost}
          setModal={onPageChange}
          setPost={setEditPost}
          validation = {validation}
          formerror = {formerror}
          />
    }
</div>
</div>
  )
}

export default BlogDetail