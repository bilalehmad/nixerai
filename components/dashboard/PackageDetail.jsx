'use client';

import {useEffect, useState} from 'react'
import PromptTable from './tables/PromptTable';
import PackageTable from './tables/PackageTable';
import PackagesModal from './modal/PackagesModal';


const PackageDetail = ({data}) => {
    const [post, setPost] = useState(data)
    const [validation, setValidation] = useState(false);
    const [formerror, setFormerror] = useState("");
    const [action, setAction] = useState("");
    const [modal, setModal] = useState(false);
    const [packageId, setPackageId] = useState(null);
    const [submitting, setsubmitting] = useState(false);
    const [editPost, setEditPost] = useState({
      title: "",
      discription: "",
      detail: "",
      amount: "",
      duration: "",
      highlight: "",
    });
    const onPageChange = (id) => {
      setPackageId(id)
      const checkId = isString(id);
      checkId ? setAction("Edit") : setAction("Add");
      
      setValidation(false)
      setFormerror("")
      setEditPost({
          title: "",
          detail: "",
          discription: "",
          amount: "",
          duration: "",
          highlight: "",
      })
    
      setModal((prev) => !prev)
    };
    useEffect(() => {
      // console.log(postId)
      const checkId = isString(packageId);
      const getPackageDetails = async () => {
        const response = await fetch(`/api/pakages/${packageId}`);
        const data = await response.json();
        setEditPost((prevState) => ({
          ...prevState,
            title: data[0].title,
            detail: data[0].detail,
            discription: data[0].discription.join('. '),
            amount: data[0].amount,
            duration: data[0].duration,
            highlight: data[0].highlight,
        }))
    
      }
      if(checkId) getPackageDetails();
    }, [packageId])

  const updatePackage = async (e) => {
      e.preventDefault();
      setValidation(false)
      setFormerror("")
      const checkId = isString(packageId);
      const date = new Date();

      if(editPost.title == '')
      {
        setValidation(true)
        setFormerror("Please Write down the Title")
      }
      else if(editPost.detail == '')
      {
        
        setValidation(true)
        setFormerror("Please Write down the Detail")
    
      }
       else if(editPost.highlight == '')
      {
        
        setValidation(true)
        setFormerror("Please Select the Highlight Dropdown")

      }
      else if(editPost.duration == '')
      {
        setValidation(true)
        setFormerror("Please Select the Duration Dropdown")
      }
      else if(editPost.discription == '')
      {
        
        setValidation(true)
        setFormerror("Please Write down the Discription")
    
      }
      else if(editPost.amount == '')
      {
        
        setValidation(true)
        setFormerror("Please Write down the Amount")
    
      }
      else
      {
        
        setsubmitting(true);
        setValidation(false)
        setFormerror("")
        if(!checkId)
        {
          try {
            const respose = await fetch(`/api/pakages/new`,{
                method :'POST',
                body : JSON.stringify({
                    title: editPost.title,
                    detail: editPost.detail,
                    discription: editPost.discription,
                    amount: Number(editPost.amount),
                    duration: editPost.duration,
                    highlight: editPost.highlight,
                })
            })
    
            if (respose.ok) {
                setModal((prev) => !prev);
    
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
        else
        {
          try {
              const respose = await fetch(`/api/pakages/update`,{
                  method :'PATCH',
                  body : JSON.stringify({
                    id: packageId,
                    title: editPost.title,
                    detail: editPost.detail,
                    discription: editPost.discription,
                    amount: editPost.amount,
                    duration: editPost.duration,
                    highlight: editPost.highlight,
                  })
              })
    
              if (respose.ok) {
                  setModal((prev) => !prev);
    
                  const updatePackage = (id, newValues) => {
                    setPost(prev => 
                      prev.map(prompt => 
                        prompt._id === id ? { ...prompt, ...newValues } : prompt
                      )
                    );
                  }
                  
                  // Usage
                  updatePackage(packageId, {
                    title: editPost.title,
                    detail: editPost.detail,
                    discription: editPost.discription,
                    amount: editPost.amount,
                    duration: editPost.duration,
                    highlight: editPost.highlight,
                  });
    
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
      <button type="button" onClick={onPageChange} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 ">
      <svg viewBox="0 0 448 512"  className="w-4 h-4 fill-white text-white mr-1" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        Add Package
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
                  Title
              </th>
              <th scope="col" className="px-6 py-3">
                  Detail
              </th>
              <th scope="col" className="px-6 py-3">
                  Amount
              </th>
              <th scope="col" className="px-6 py-3">
                  Action
              </th>
          </tr>
      </thead>
      
  <tbody>
  {data.map((post) => (
      <PackageTable 
        key={post._id}
        post={post}
        onPageChange={onPageChange}
      />
      ))}
      </tbody>
  </table>
</div>
{modal && 
        <PackagesModal 
          type = {action}
          handleSubmit={updatePackage}
          submitting={submitting}
          post={editPost}
          setModal={onPageChange}
          setPost={setEditPost}
          validation = {validation}
          formerror = {formerror}
          />
    }
</div>
  )
}

export default PackageDetail