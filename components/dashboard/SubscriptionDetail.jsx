'use client';

import {useEffect, useState} from 'react';
import SubscriptionTable from './tables/SubscriptionTable';
import { usePathname, useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import SubscriptionModal from './modal/SubscriptionModal';

const SubscriptionDetail = ({data}) => {
    const [post, setPost] = useState(data)
    const pathName = usePathname();
    const router = useRouter();
    
    const [validation, setValidation] = useState(false);
    const [formerror, setFormerror] = useState("");
    const [action, setAction] = useState("");
    const [modal, setModal] = useState(false);
    const [subId, setSubId] = useState(null);
    const [submitting, setsubmitting] = useState(false);
    const [editPost, setEditPost] = useState({
      user: "",
      status: "",
      package: "",
      expireAt: "",
      createdAt: "",
      updatedAt: ""
    });

    
  const {data : session} = useSession();
  const onPageChange = (id) => {
    setSubId(id)
    const checkId = isString(id);
    checkId ? setAction("Edit") : setAction("Add");
    
    setValidation(false)
    setFormerror("")
    setEditPost({
        user: "",
        status: "",
        package: "",
        expireAt: "",
        createdAt: "",
        updatedAt: ""
    })
  
    setModal((prev) => !prev)
  };
  useEffect(() => {
    const checkId = isString(subId);
    const getBlogDetails = async () => {
      const response = await fetch(`/api/subscription/get?id=${subId}`);
      const data = await response.json();
      console.log(data)
      setEditPost((prevState) => ({
        ...prevState,
        user: data.user.username,
        status: data.status,
        package: data.package.title,
        expireAt: data.package,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }))
  
    }
    if(checkId) getBlogDetails();
  }, [subId])
  const updateUser = async (e) => {
    e.preventDefault();
    setValidation(false)
    setFormerror("")
    const checkId = isString(subId);

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
                id: subId,
                user: editPost.user,
                status: editPost.status,
                package: editPost.package,
                expireAt: editPost.package,
                createdAt: editPost.createdAt,
                updatedAt: editPost.updatedAt
              })
          })

          if (respose.ok) {
              setModal((prev) => !prev);
              const updatedValues = {
                _id: subId,
                user: editPost.user,
                status: editPost.status,
                package: editPost.package,
                expireAt: editPost.package,
                createdAt: editPost.createdAt,
                updatedAt: editPost.updatedAt
              };

              // Usage
              const newState = post.map(obj => {
                // 👇️ if id equals 2, update country property
                if (obj._id === subId) {
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
            user: editPost.user,
            status: editPost.status,
            package: editPost.package,
            expireAt: editPost.package,
            createdAt: editPost.createdAt,
            updatedAt: editPost.updatedAt
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
    //{console.log(post)}
  return (
    <div><div className='py-2'>
    <button onClick={onPageChange} type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 ">
    <svg viewBox="0 0 448 512"  className="w-4 h-4 fill-white text-white mr-1" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
      Add Subscription
    </button>
  </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Detail
                </th> */}
                <th scope="col" className="px-6 py-3">
                    Duration
                </th>
                <th scope="col" className="px-6 py-3">
                    Expire
                </th>
                {pathName !== '/profile/subscription' && (
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                )}
            </tr>
        </thead>
        <tbody>
        {data && data.map((post) => (
      <SubscriptionTable 
        key={post._id}
        post={post}
        onPageChange={onPageChange}
      />
      ))}
        </tbody>
    </table>
    {modal && 
        <SubscriptionModal 
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

export default SubscriptionDetail