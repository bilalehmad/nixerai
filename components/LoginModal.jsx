import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const LoginModal = ({setLoginModal}) => {
  return (
    
    <div className="modal z-50" >
    <div id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center p-4  w-full flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-4xl max-h-full bg-gray-100 dark:bg-gray-700 overflow-y-hidden">
        {/* <div className="flex items-start justify-end p-2 border-b rounded-t dark:border-gray-600">
                   
                <button type="button" onClick={() => setLoginModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div> */}
                <div class="w-full flex ">
                    <button type="button" onClick={() => setLoginModal(false)} className="absolute right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div class="bg-white text-gray-700  px-4 py-8 flex flex-col  w-full h-screen md:w-6/12 shadow-lg">
                        <p className='font-semibold py-8'>Just Login and Explore, Totaly Free! </p>
                        <button
                        onClick={() => signIn()}
                            class="px-4 py-2 border flex  items-center gap-2 bg-slate-100 border-slate-200 rounded-lg  text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                            <svg viewBox="0 0 533.5 544.3" className='w-5 h-5' xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>                            
                            <span>Login with Google</span>
                        </button>
                        <p className='text-xs py-8 relative bottom-0'>By continuing, you agree to NixerAI <Link href='/terms-conditions' className='underline'> Terms and Conditions</Link>.<br /> Read our <Link href='/privacy-policy' className='underline'> Privacy Policy </Link>.</p>

                    </div>
                    <img src="/assets/images/login-bulb.jpg" alt="background" class="object-cover object-center hidden sm:block  md:h-screen w-6/12  md:w-6/12" />
                    
                </div>
            {/* <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {type} Prompt
                    </h3>
                <button type="button" onClick={() => setLoginModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
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
                            <label for="accessLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Access</label>
                            <select
                             value={post.accessLevel}
                             onChange={(e) => setPost({
                               ...post,
                               accessLevel: e.target.value
                             })}
                             type="text" name="accessLevel" id="accessLevel" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teasor</label>
                            <textarea
                             value={post.teasor}
                             onChange={(e) => setPost({
                               ...post,
                               teasor: e.target.value
                             })}
                            type="text" name="last-name" id="last-name" className="form_textarea shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Green" required="" ></textarea>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sample</label>
                            <textarea 
                             value={post.sample}
                             onChange={(e) => setPost({
                               ...post,
                               sample: e.target.value
                             })}
                             name="email" id="email" className="form_textarea shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@company.com" required="" ></textarea>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <input 
                            value={post.status}
                            onChange={(e) => setPost({
                              ...post,
                              status: e.target.value
                            })}
                            type="text" name="status" id="status" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Development" required="" />
                        </div>
                        {/* <div className="col-span-6 sm:col-span-3">
                            <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234567" required="" />
                        </div> 
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
            </form>*/}
        </div>
    </div>
    </div>
  )
}

export default LoginModal