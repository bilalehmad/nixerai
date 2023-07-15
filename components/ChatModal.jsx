import {useEffect} from 'react'
import Image from "next/image";
import { RiCloseLine } from "react-icons/ri";
import TypingAnimation from './TypingAnimation';

const ChatModal = ({setIsOpen,prompt,setPrompt,handleGPTaction,isLoading,chatLog,isOpen,heading}) => {
    
    useEffect(() => {
        autoSize();
        if(isLoading === true)
        {
            const loader = document.getElementById('loader');
            loader.focus();

        }
    }, [isOpen,prompt,isLoading]);

    const autoSize = () => {
        const textarea = document.getElementById('myTextarea');
            textarea.style.height = '26px'; // Reset the height to auto

            // Set the height based on the scroll height of the content
            if(textarea.scrollHeight > 100)
            {
                textarea.style.height = '100px';
                textarea.style.overflowY = 'scroll';
            }
            else
            {  
                textarea.style.height = `${textarea.scrollHeight}px`;
                textarea.style.overflowY = 'hidden';
            }

            if (textarea.value === '') {
                textarea.style.height = '26px'; // Reset to default height when content is cleared
            }
    }
  return (
    <div className="modal z-50 " >
      <div className="modal-content w-[780px] rounded-lg overflow-hidden border dark:border-gray-400">
            <div className='modalHeader flex justify-between px-5 dark:bg-[#1A202c] '>
                <h5 className='heading dark:text-white'>{heading}</h5>
                
                <RiCloseLine className='mt-4 cursor-pointer text-gray-900 dark:text-gray-50' onClick={() => setIsOpen(false)} />
            </div>
            
            <div className='modalContent  bg-white dark:bg-[#1A202c] border dark:border-gray-400'>
                
                <div className='container mx-auto  '>
                    <div className='flex flex-col h-[500px] '>
                        <div className='flex flex-grow p-6 overflow-y-scroll'>
                            <div className='w-full flex flex-col space-y-4'>
                            {chatLog.map((message,index) => (
                                <div key={index} 
                                className={`flex ${message.type == 'user' ? 'justify-end': 'justify-start'}`}>
                                    <div className={`${
                                        message.type == 'user' ? 'bg-blue-900' : 'bg-gray-800'
                                    } rounded-lg p-4 text-white max-w-sm`}>
                                    {message.message}
                                    </div>
                                </div>
                            ))
                            }
                            
                            {isLoading && (
                                <div key={chatLog.length} id='loader' className="flex justify-start">
                                    <div className='bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-lg p-2 text-gray-600 dark:text-gray-50 max-w-sm'>
                                        <TypingAnimation />
                                    </div>
                                </div>
                            )} 
                            </div>
                        </div>
                             
                            
                        <form className='flex-none p-6 '>
                            <div className="flex items-center max-w-[800px] mx-auto mb-2 w-full relative text-white border border-gray-300 rounded-lg">
                                <textarea 
                                id='myTextarea'
                                value={prompt}
                                onChange={(e) => {
                                    setPrompt(e.target.value); 
                                    autoSize();
                                    
                                }}
                                required
                                className="m-0 w-full p-1.5 pr-6 pl-2 md:pl-4 dark-scroll-bar-y css-yk88j6 h-[26px] text-gray-700 dark:text-gray-50 overflow-y-hidden resize-none outline-0" >

                                </textarea>
                                <button aria-label="Send" onClick={handleGPTaction} className="z-50 p-1 absolute rounded-md text-gray-500 enabled:hover:text-gray-400 bg-green-600  transition disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40">
                                    <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path></svg>
                                </button>
                            </div>
                            {/* <label>
                                <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder='Write your prompt Here...'
                                required
                                className='chat_textarea dark:bg-[#2B3A55] dark:text-white border dark:border-gray-400 dark:focus:outline-none'
                                >

                                </textarea>
                            </label>
                                <button onClick={handleGPTaction} className='deleteBtn text-[#2B3A55] group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none rounded-md' >
                                Go!
                                </button> */}
                        </form>
                    </div>
                </div> 
            </div>

            
        </div>
    </div>
  )
}

export default ChatModal