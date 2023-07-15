import React, { useState } from 'react'
import Image from "next/image";
import ChatModal from "./ChatModal"

function PromptView({post,isPageLoading,setPageIsLoading}) {
    const [isOpen, setIsOpen] = useState(false)
    const [prompt, setPrompt] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [heading, setHeading] = useState('')

    const handleModalButton = () => {
        setIsOpen((prev) => !prev);
        setPrompt(post.sample);
        setHeading(post.title);
        if(isOpen == false)
        {
            setChatLog([]);
        }
    }
    
    const handleGPTaction = (e) => {
        e.preventDefault();
        setChatLog((prev) => [...prev, {type: 'user', message: prompt}]);
        setPrompt('');
        sendMessage(prompt);
        
        
    }
    const sendMessage = async (message) => {
        // Construct the query parameter using names
        const url = '/api/chatgpt';
        const headers = {
            'Content-type': 'application/json'
        }
        const data = {
            model: 'gpt-3.5-turbo-0613',
            messages: [{"role":"user","content": message}]
        }

        setIsLoading(true);
        const response = await fetch(url, {
            method: 'POST', 
            headers: headers, 
            body: JSON.stringify(data), 
          })
        .then(response => response.json())
        .then(data => {
            // Handle response data
            //setChatResponce(data.choices[0].message.content);
            console.log(data.choices[0].message.content)
            console.log(chatLog)
            setChatLog((prev) => [...prev, {type: 'bot', message: data.choices[0].message.content}]);
            setIsLoading(false);
        })
        .catch(error => {
            // Handle error
            setIsLoading(false);
            console.error(error);
        });
  
  
    }

  return (
    <section className='w-full max-w-full flex justify-between mt-20'>
        <div className="container px-5 py-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                 {isPageLoading ? (
                    
                    <div role="status" className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                            </svg>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <hr className='m-5' />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="flex items-center mt-4 space-x-3">
                            
                            <div className='w-full'>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            </div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>

                 ) :(
                    <div className='col-span-1 p-5'>
                    <div className='flex flex-wrap'>
                        <Image alt="prompt image" height={200} width={100} src="https://flow-prompt-covers.s3.us-west-1.amazonaws.com/icon/illustrative/illus_5.png" className="rounded-md opacity-90 transition-all h-60 w-full group-hover:opacity-100  object-cover" />
                    </div>
                    <h1 className='font-staoshi font-semibold text-2xl mt-2'>
                        <span className='text-gray-900 dark:text-white  text-left'>{post.title}</span>
                    </h1>
                    <hr className='my-4'/>
                    <p className='text-gray-900 dark:text-white font-semibold text-sm'>{post.teasor}</p>
                    <div className='py-5'>
                            <h5 className='font-staoshi font-bold text-sm py-5'>
                                <span className=' text-gray-900 dark:text-white  text-left'>Example</span>
                            </h5>
                            <p className='text-gray-900 dark:text-white font-semibold text-sm pb-5'>{post.example}</p>
                        </div>
                 </div>
                 )}
                 {isPageLoading ? (
                    
                    <div role="status" className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                        
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-8"></div>
                        <div className="flex items-center mt-4 space-x-3">
                            
                            <div className='w-full'>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            </div>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mt-8"></div>
                        <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-8 mt-2.5 mb-8"></div>
                        <span className="sr-only">Loading...</span>
                    </div>

                 ) :(
                 <div className='col-span-1 py-5 w-full '>
                    <div className=' text-gray-900 dark:text-white border-2 w-full rounded-md'>
                        <div className='px-5 pt-5'>
                            <h1 className='font-staoshi font-semibold text-xl '>
                                <span className=' text-gray-900 dark:text-white text-left'>Prompt Detail</span>
                            </h1>
                        </div>
                        <div className=' px-5 py-2 scroll-m-2 '>
                            <h5 className='font-staoshi font-semibold text-sm py-5'>
                                <span className=' text-gray-900 dark:text-white  text-left'>Sample</span>
                            </h5>
                            <div className='h-250px] overflow-x-auto'>
                                <p className='text-gray-900 dark:text-white font-semibold text-sm pb-5'>{post.sample}</p>
                            </div>
                        </div>
                        <div className='px-5'>
                            <h5 className='text-gray-700 py-2  dark:text-white font-staoshi font-semibold text-sm'>
                                Play It on Chat GPT
                            </h5>
                            
                            <button className='cursor-pointer' onClick={handleModalButton}>
                                <Image alt="chatgpt image" src='/assets/images/chatgpt.png' width={30} height={30} />
                                {/* <svg className=' fill-white mt-1 ml-1.5' width='18' version="1.1" viewBox="0 0 24 24" ><g id="info"/><g id="icons"><path d="M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z" id="play"/></g></svg> */}
                            </button>
                        </div>
                        {isOpen && 
                            <ChatModal 
                            setIsOpen = {setIsOpen}
                            prompt = {prompt}
                            setPrompt={setPrompt}
                            handleGPTaction = {handleGPTaction}
                            isLoading={isLoading}
                            chatLog={chatLog}
                            isOpen={isOpen}
                            heading={heading}
                            />
                        }
                    </div>
                 </div>
                 )}
            </div>
        </div>
    </section>
  )
}

export default PromptView