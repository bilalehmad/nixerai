import React from 'react'

const Modal = ({setModal,type,post,setPost,submitting,handleSubmit}) => {
  return (
    
    <div className="modal z-50" >
    <div id="editUserModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 items-center justify-center p-4  w-full flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <form onSubmit={handleSubmit} class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {type} Prompt
                    </h3>
                <button type="button" onClick={setModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                </div>
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input 
                             value={post.title}
                             onChange={(e) => setPost({
                                ...post,
                                title: e.target.value
                              })}
                             type="text" name="first-name" id="first-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="accessLevel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Access</label>
                            <select
                             value={post.accessLevel}
                             onChange={(e) => setPost({
                               ...post,
                               accessLevel: e.target.value
                             })}
                             type="text" name="accessLevel" id="accessLevel" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teasor</label>
                            <textarea
                             value={post.teasor}
                             onChange={(e) => setPost({
                               ...post,
                               teasor: e.target.value
                             })}
                            type="text" name="last-name" id="last-name" class="form_textarea shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Green" required="" ></textarea>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sample</label>
                            <textarea 
                             value={post.sample}
                             onChange={(e) => setPost({
                               ...post,
                               sample: e.target.value
                             })}
                             name="email" id="email" class="form_textarea shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@company.com" required="" ></textarea>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <input 
                            value={post.status}
                            onChange={(e) => setPost({
                              ...post,
                              status: e.target.value
                            })}
                            type="text" name="status" id="status" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Development" required="" />
                        </div>
                        {/* <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" name="category" id="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required="" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234567" required="" />
                        </div> */}
                        <div class="col-span-6 sm:col-span-3">
                            <label for="tag" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                            <input 
                            value={post.tag}
                            onChange={(e) => setPost({
                              ...post,
                              tag: e.target.value
                            })}
                            type="text" name="tag" id="tag" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Sale" required="" />
                        </div>
                    </div>
                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button  
                    disabled = {submitting} 
                    type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Modal