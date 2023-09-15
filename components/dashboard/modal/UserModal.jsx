import React from 'react'

const UserModal = ({setModal,type,validation,post,setPost,submitting,handleSubmit,formerror}) => {

  return ( <div className="modal z-50" >
  <div id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center p-4  w-full flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
          <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {type} Users
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
                          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                          <input 
                           value={post.username}
                           readOnly
                           onChange={(e) => setPost({
                              ...post,
                              username: e.target.value
                            })}
                           type="text" name="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input 
                           value={post.email}
                           readOnly
                           onChange={(e) => setPost({
                              ...post,
                              email: e.target.value
                            })}
                           type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <label for="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                              <select
                              value={post.role}
                              onChange={(e) => setPost({
                              ...post,
                              role: e.target.value
                              })}
                              name="role" id="role" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                  <option value="">Select..</option>
                                  <option value="client">Client</option>
                                  <option value="admin">Admin</option>
                              </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <label for="subscriptionStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subscription</label>
                              <select
                              value={post.subscriptionStatus}
                              onChange={(e) => setPost({
                              ...post,
                              subscriptionStatus: e.target.value
                              })}
                              name="subscriptionStatus" id="subscriptionStatus" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                  <option value="">Select..</option>
                                  <option value="Free">Free</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Yearly">Yearly</option>
                              </select>
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

export default UserModal