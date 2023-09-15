import React from 'react'

const BlogModal = ({setModal,type,validation,post,setPost,submitting,handleSubmit,formerror}) => {

  return ( <div className="modal z-50" >
  <div id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center p-4  w-full flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
          <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {type} Blog
                  </h3>
              <button type="button" onClick={setModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
              </button>
              </div>
              <div className="p-6 space-y-6">
                  {validation && (
                      <><p className='text-sm text-red-800 text-center'>{formerror}</p></>
                  )}
                  <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                          <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                          <select
                              value={post.subject}
                              onChange={(e) => setPost({
                              ...post,
                              subject: e.target.value
                              })}
                              name="subject" id="subject" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                  <option value="">Select..</option>
                                  <option value="Article">Article</option>
                                  <option value="Tutorial">Tutorial</option>
                              </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                          <input 
                           value={post.title}
                           onChange={(e) => setPost({
                              ...post,
                              title: e.target.value
                            })}
                           type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <label for="article" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article</label>
                            <textarea
                             value={post.article}
                             onChange={(e) => setPost({
                               ...post,
                               article: e.target.value
                             })}
                            type="text" name="article" id="article" className="form_textarea shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Green" required="" >
                      
                            </textarea>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <label for="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                          <input 
                           value={post.tags}
                           onChange={(e) => setPost({
                              ...post,
                              tags: e.target.value
                            })}
                           type="text" name="tags" id="tags" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                      </div>
                  </div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button  
                  disabled = {submitting} 
                  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {submitting ? `${type}...` : type}
                  </button>
              </div>
          </form>
      </div>
  </div>
  </div>
  )
}

export default BlogModal