"use client";
import { useState ,useEffect} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';

const ToolCard = ({post, handleEdit, handleDelete, handleTagClick, onModalStateChange,onShareModalStateChane}) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const promptView = () => {
    router.push(`/view-prompt?id=${post._id}`)
  }

  const openModal = () => {
    onModalStateChange(post.youtubeUrl);
  } 

  const shareModal = () => {
    onShareModalStateChane(post.url)
  }
  const isShareSupported = navigator.share !== undefined;
  return (
    <div className="container px-5 py-4 mx-auto  ">
          <div className="flex flex-wrap -m-5 ">
            <div className=" py-2 ">
              <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r overflow-hidden shadow-md  border border-gray-200 dark:border-none">
                <div className="bg-white dark:bg-[#2B3A55] group text-gray-800 dark:text-white w-full relative pr-3   flex flex-col justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                  <div className=" overflow-hidden">
                    <div>
                      
                        <div className="flex items-center rounded-lg shadow md:max-w-xl " >
                            <Image width={50} height={50} className="object-cover w-48 rounded-t-lg h-36  md:w-48 md:rounded-none md:rounded-l-lg " src="https://flow-prompt-covers.s3.us-west-1.amazonaws.com/icon/illustrative/illus_5.png" alt="" />
                            <div className="w-full flex flex-col h-[130px] gap-1 pl-3 overflow-hidden css-0">
                                <div className="flex-row justify-between">
                                    <p className="text-lg font-semibold tracking-wide line-clamp-1 break-words css-0">{post.title}</p>
                                </div>
                                <div className="css-k008qs h-[40px]">
                                    <p className="w-full text-sm text-gray-500 dark:text-gray-400 2xl:text-md sm:mb-2 line-clamp-2 font-medium break-words css-0">{post.description}</p>
                                </div>
                                <div className="flex flex-row justify-between text-xs m-[1px]">
                                    <p className="chakra-text css-0 cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p> 

                                    
                                </div>
                                <div className="w-full flex justify-between text-sm ">
                                    <div className="relative inline-flex w-full items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium transition-all rounded-sm  ease-in duration-75  ">
                                        <span onClick={openModal} target="_blank" className="relative px-3 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-gray-800 dark:fill-white" ><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z"/></svg>                      
                                        </span>
                                        <span className="relative px-3 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-gray-800 dark:stroke-white" width="18" height="18" viewBox="0 0 24 24" fill="none"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
                                        </span>
                                        {isShareSupported && <span onClick={shareModal} className="relative px-3 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg"  width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-800 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>                                            
                                        </span>}
                                    </div>
                                    <button className="relative inline-flex w-full items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-sm group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white  focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                        <Link href={post.url} target="_blank" className="relative px-5 py-0.5 transition-all ease-in duration-75 bg-none text-white  rounded-md group-hover:bg-opacity-0">
                                        <   svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-800 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
                                        </Link>
                                    </button>  
                                </div>
                            </div>
                        </div>

                        {/* <div className="w-full mt-3 text-gray-400 text-xs flex flex-row justify-between css-k008qs">
                            <div className="flex flex-row gap-2   ">
                            <div className="flex flex-row  mt-[1px]">
                                <p className="chakra-text ml-1 css-0" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p> 
                            </div>
                            </div>
                        </div> */}
                        {session?.user.id === post.creator._id && pathName === '/profile' && (
                          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                            <p
                            className="font-inter text-sm green_gradient cursor-pointer"
                            onClick={handleEdit}
                            >
                              Edit
                            </p>
                            <p
                            className="font-inter text-sm orange_gradient cursor-pointer"
                            onClick={handleDelete}
                            >
                              Delete
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
  )
}

export default ToolCard