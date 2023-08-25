'use client';

import {useState,useEffect} from 'react'
import PromptTable from './tables/PromptTable';
import PromptPagination from './pagination/PromptPagination';
import Modal from './modal/Modal';

const PromptDetail = ({data,total}) => {
  const [post, setPost] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
 const [fromPage, setFromPage] = useState(1);
 const [toPage, setToPage] = useState(10);
 const [pages, setPages] = useState(null);
 const [modal, setModal] = useState(false);
 const [promptId, setPromptId] = useState(null);
 const [submitting, setsubmitting] = useState(false);
 const [editPost, setEditPost] = useState({
  title: '',
  teasor: '',
  sample: '',
  accessLevel: '',
  status: '',
  // prompt4: '',
  // prompt5: '',
  tag : ''
})

  useEffect(() => {
    const pageSize = 10;
    const queryParam = `page=${currentPage}&pageSize=${pageSize}`;
    fetch(`/api/prompt?${queryParam}`)
        .then(response => response.json())
        .then(data => {
            setPost(data);
        });
    const from = ((currentPage - 1) * pageSize) + 1;
    const to = Math.min(currentPage * pageSize, total);
    setFromPage(from);
    setToPage(to);

    const pages = Array.from({ length: 5 }, (_, i) => {
        const pageNumber = Number(currentPage);
        return i - (pageNumber === 1 ? 0 : 1) + pageNumber;
    });
    setPages(pages)
    
}, [currentPage]);
useEffect(() => {
  // console.log(postId)
  const getPromptDetails = async () => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    setEditPost({
        title: data.title,
        teasor: data.teasor,
        sample: data.sample,
        accessLevel: data.accessLevel,
        status: data.status,
        // prompt4: data.prompt4,
        // prompt5: data.prompt5,
        tag: data.tag
    })

  }
  if(promptId) getPromptDetails();
}, [promptId])

const updatePrompt = async (e) => {
  e.preventDefault();
  setsubmitting(true);

  if(!promptId) return alert('Prompt ID Not Found');
  try {
      const respose = await fetch(`/api/prompt/${promptId}`,{
          method :'PATCH',
          body : JSON.stringify({
              title: editPost.title,
              teasor: editPost.teasor,
              sample: editPost.sample,
              accessLevel: editPost.accessLevel,
              status: editPost.status,
              // prompt4: editPost.prompt4,
              // prompt5: editPost.prompt5,
              tag : editPost.tag
          })
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
          updatePrompt(promptId, {
            title: editPost.title,
            teasor: editPost.teasor,
            sample: editPost.sample,
            accessLevel: editPost.accessLevel,
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
const onPageChange = () => {
    setModal((prev) => !prev)
  };
  return (
    <div>
      <div className='py-2'>
        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 ">
        <svg viewBox="0 0 448 512"  className="w-4 h-4 fill-white text-white mr-1" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
          Add Prompt
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
                    Access
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
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
        <PromptTable 
          key={post._id}
          post={post}
          onPageChange={onPageChange}
          setPromptId = {setPromptId}
        />
        ))}
        </tbody>
    </table>
    <nav className="flex items-center justify-between px-2 py-4" aria-label="Table navigation">
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{fromPage} - {toPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span></span>
    
    <PromptPagination
    currentPage={currentPage} // 10
    setCurrentPage={setCurrentPage}
    totalItems={total}
    toPage={toPage}
    pages={pages}
    />
   </nav>
    {modal && 
        <Modal 
        type = "Edit"
        handleSubmit={updatePrompt}
        submitting={submitting}
        post={editPost}
        setModal={onPageChange}
        setPost={setEditPost}
          />
    }
  </div>
  </div>
  )
}

export default PromptDetail