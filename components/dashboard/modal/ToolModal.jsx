import React from 'react'

const ToolModal = ({setModal,type,post,setPost,submitting,handleSubmit}) => {
  return (
    
    <div className="modal z-50" >
    <div id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center p-4  w-full flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {type} Prompt
                    </h3>
                <button type="button" onClick={setModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label for="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input 
                             value={post.title}
                             onChange={(e) => setPost({
                                ...post,
                                title: e.target.value
                              })}
                             type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="accessLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                            <input 
                             value={post.url}
                             onChange={(e) => setPost({
                                ...post,
                                url: e.target.value
                              })}
                             type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                             value={post.description}
                             onChange={(e) => setPost({
                               ...post,
                               description: e.target.value
                             })}
                            type="text" name="last-name" id="last-name" className="form_textarea shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Green" required="" ></textarea>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verified</label>
                            <select
                             value={post.verified}
                             onChange={(e) => setPost({
                               ...post,
                               verified: e.target.value
                             })}
                              name="verified" id="verified" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                <option value="FALSE">False</option>
                                <option value="TRUE">True</option>
                            </select>
                            </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <select
                             value={post.status}
                             onChange={(e) => setPost({
                               ...post,
                               status: e.target.value
                             })}
                             name="status" id="status" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        {/* <div className="col-span-6 sm:col-span-3">
                            <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234567" required="" />
                        </div> */}
                        <div className="col-span-6 sm:col-span-3">
                            <label for="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                            <input 
                            value={post.tag}
                            onChange={(e) => setPost({
                              ...post,
                              tag: e.target.value
                            })}
                            type="text" name="tag" id="tag" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Sale" required="" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button  
                    disabled = {submitting} 
                    type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default ToolModal