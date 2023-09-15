'use client';

import {useState,useEffect} from 'react'
import ToolsTable from './tables/ToolsTable';
import ToolPagination from './pagination/ToolPagination';
import ToolModal from './modal/ToolModal';
import { useSession } from 'next-auth/react';

const ToolDetail = ({data,total}) => {
  const [post, setPost] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
 const [fromPage, setFromPage] = useState(1);
 const [toPage, setToPage] = useState(10);
 const [pages, setPages] = useState(null);
 const [modal, setModal] = useState(false);
 const [toolId, setToolId] = useState(null);
 const [submitting, setsubmitting] = useState(false);
 const [action, setAction] = useState("");
 const [validation, setValidation] = useState(false);
 const [formerror, setFormerror] = useState("");
 const [image, setImage] = useState(null);
 const [imageInput, setImageInput] = useState(null)
///

const [selectedImage, setSelectedImage] = useState("");
const [selectedFile, setSelectedFile] = useState(null);

///
 const [editPost, setEditPost] = useState({
  title: '',
  url: '',
  description: '',
  confirmation: '',
  status: '',
  // prompt4: '',
  // prompt5: '',
  tag : ''
})
 
const {data : session} = useSession();
  useEffect(() => {
    const pageSize = 10;
    const queryParam = `page=${currentPage}&pageSize=${pageSize}`;
    fetch(`/api/tool/admin?${queryParam}`)
        .then(response => response.json())
        .then(data => {
            setPost(data);
        });
    const from = ((currentPage - 1) * pageSize) + 1;
    const to = Math.min(currentPage * pageSize, total);
    setFromPage(from);
    setToPage(to);
    // const pagesCount = Math.ceil(total / 10); // 100/10
    // if (pagesCount === 1) return null;
    // const page = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const pages = Array.from({ length: 5 }, (_, i) => {
        const pageNumber = Number(currentPage);
        return i - (pageNumber === 1 ? 0 : 1) + pageNumber;
    });
    setPages(pages)
    
}, [currentPage]);

useEffect(() => {
  // console.log(postId)
  
  const checkId = isString(toolId);

  const getPromptDetails = async () => {
    const response = await fetch(`/api/tool/${toolId}`);
    const data = await response.json();
    //console.log(data)
    data.image != "image" && setSelectedImage(`/assets/tools/${data.image}`);
    setEditPost({
        title: data.title,
        url: data.url,
        description: data.description,
        confirmation: data.confirmation,
        status: data.status,
        // prompt4: data.prompt4,
        // prompt5: data.prompt5,
        tag: data.tag
    })

  }
  if(checkId) getPromptDetails();
}, [toolId])

function isString(data) {
  if (typeof data === 'string') {
    return true;
  } else if (typeof data === 'object') {
    return false;
  }
}

const updatePrompt = async (e) => {
  e.preventDefault();
  const date = new Date();
  const checkId = isString(toolId);
  if(editPost.title == '')
  {
    setValidation(true)
    setFormerror("Please Write down the Title")
  }
  else if(editPost.url == '')
  {
    
    setValidation(true)
    setFormerror("Please Write down the URL")

  }
  else if(editPost.description == '')
  {
    
    setValidation(true)
    setFormerror("Please Write down the Description")

  }
  else if(editPost.status == '')
  {
    
    setValidation(true)
    setFormerror("Please Select the Status Dropdown")

  }
  else if(editPost.confirmation == '')
  {
    setValidation(true)
    setFormerror("Please Select the Verification Dropdown")
  }
  else if(editPost.tag == '')
  {
    
    setValidation(true)
    setFormerror("Please Write down the Tag")

  }
  else
  {
    setsubmitting(true);
    setValidation(false)
    setFormerror("")
    if(!checkId)
    {
      try {
        const formData = new FormData();
        formData.set('image', selectedFile); 
        formData.set('userId', session?.user.id); 
        formData.set('title', editPost.title); 
        formData.set('url', editPost.url); 
        formData.set('youtubeUrl', "youtube"); 
        formData.set('description', editPost.description); 
        formData.set('status', editPost.status); 
        formData.set('confirmation', editPost.confirmation); 
        formData.set('likes', 0); 
        formData.set('dislikes', 0); 
        formData.set('views', 0); 
        formData.set('wishlisted', 0); 
        formData.set('tag', editPost.tag); 
        formData.set('timestamp', date); 
        const respose = await fetch(`/api/tool/new`,{
            method :'POST',
            body: formData
        })
        if (respose.ok) {
            setModal((prev) => !prev);
            
            // body : JSON.stringify({
            //     userId: session?.user.id,
            //     title: editPost.title,
            //     url: editPost.url,
            //     youtubeUrl: "youtube",
            //     description: editPost.description,
            //     image: selectedFile,
            //     status: editPost.status,
            //     confirmation: editPost.confirmation,
            //     likes: 0,
            //     dislikes: 0,
            //     views:0,
            //     wishlisted: 0,
            //     tag : editPost.tag,
            //     timestamp: date
            // })

            // const updatePrompt = (id, newValues) => {
            //   setPost(prev => 
            //     prev.map(prompt => 
            //       prompt._id === id ? { ...prompt, ...newValues } : prompt
            //     )
            //   );
            // }
            
            // Usage
            // updatePrompt(toolId, {
            //   title: editPost.title,
            //   url: editPost.url,
            //   description: editPost.description,
            //   confirmation: editPost.confirmation,
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
        const formData = new FormData();
        formData.set('id', toolId);
        formData.set('image', selectedFile); 
        formData.set('userId', session?.user.id); 
        formData.set('title', editPost.title); 
        formData.set('url', editPost.url); 
        formData.set('youtubeUrl', "youtube"); 
        formData.set('description', editPost.description); 
        formData.set('status', editPost.status); 
        formData.set('confirmation', editPost.confirmation); 
        formData.set('likes', 0); 
        formData.set('dislikes', 0); 
        formData.set('views', 0); 
        formData.set('wishlisted', 0); 
        formData.set('tag', editPost.tag); 
        formData.set('timestamp', date); 
        const respose = await fetch(`/api/tool/update`,{
            method :'PATCH',
            body: formData
        })
  
        if (respose.ok) {
            setModal((prev) => !prev);
  
            const updatePrompt = (id, newValues) => {
              setPost(prev => 
                prev.map(prompt => 
                  prompt._id === id ? { ...prompt, ...newValues } : prompt
                )
              );
            }
            
            // Usage
            updatePrompt(toolId, {
              title: editPost.title,
              url: editPost.url,
              description: editPost.description,
              confirmation: editPost.confirmation,
              status: editPost.status,
              tag : editPost.tag
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

const handleImage = (e) => {
  const file = e.target.files[0];
  setEditPost({
      ...post,
      image: e.target.value
    })
    const reader = new FileReader();
    const base64Data = reader.readAsDataURL(file);
    console.log(base64Data)
  setImageInput(base64Data);
  setImage(URL.createObjectURL(file));
  // const filereader = new FileReader();
  // filereader.onload = function(e){
  //     setImage(e.target.result)
  // }
  // filereader.readAsDataURL(file);
  //console.log(file)
}

const onPageChange = (id) => {
    setToolId(id)
    const checkId = isString(id);
    checkId ? setAction("Edit") : setAction("Add");
    setSelectedImage("")
    setSelectedFile(null)
    
    setValidation(false)
    setFormerror("")
    
    setEditPost({
      title: "",
      url: "",
      description: "",
      confirmation: "",
      status: "",
      // prompt4: data.prompt4,
      // prompt5: data.prompt5,
      tag: ""
  })
  setImage(null)
  setModal((prev) => !prev)
  };
  return (
    <div>
    <div className='py-2'>
      <button type="button" onClick={onPageChange} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 ">
      <svg viewBox="0 0 448 512"  className="w-4 h-4 fill-white text-white mr-1" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        Add Tool
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
                  Discription
              </th>
              <th scope="col" className="px-6 py-3">
                Confirmation
              </th>
              <th scope="col" className="px-6 py-3">
                  Status
              </th>
              <th scope="col" className="px-6 py-3">
                  Tag
              </th>
              <th scope="col" className="px-6 py-3">
                  Action
              </th>
          </tr>
      </thead>
      
  <tbody>
  {post.map((post) => (
      <ToolsTable 
        key={post._id}
        post={post}
        onPageChange={onPageChange}
      />
    ))}
      </tbody>
  </table>
  <nav className="flex items-center justify-between px-2 py-4" aria-label="Table navigation">
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{fromPage} - {toPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span></span>
      <ToolPagination
        currentPage={currentPage} // 10
        setCurrentPage={setCurrentPage}
        totalItems={total}
        toPage={toPage}
        pages={pages}
      />
  </nav>
  {modal && 
        <ToolModal 
        type = {action}
        handleSubmit={updatePrompt}
        submitting={submitting}
        post={editPost}
        setModal={onPageChange}
        setPost={setEditPost}
        validation = {validation}
        formerror = {formerror}
        handleImage={handleImage}
        image={image}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setSelectedFile={setSelectedFile}

          />
    }
</div>
</div>
  )
}

export default ToolDetail