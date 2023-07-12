import React from 'react'
import { RiCloseLine } from "react-icons/ri";

const ChatModal = ({setIsOpen,prompt,setPrompt,handleGPTaction}) => {
  return (
    <div className="modal z-20 " >
      <div className="modal-content w-[780px] rounded-none border dark:border-gray-400">
            <div className='modalHeader flex justify-between px-5 dark:bg-[#1A202c] '>
                <h5 className='heading dark:text-white'>Sample Prompt</h5>
                
                <RiCloseLine className='mt-4 cursor-pointer text-gray-900 dark:text-white' onClick={() => setIsOpen(false)} />
            </div>
            
            <div className='modalContent h-60 bg-white dark:bg-[#1A202c] border dark:border-gray-400'>
                <div>
                    <form>
                    <label>
                        {/* <span className='font-staoshi font-semibold text-base text-white'>
                        Output 2
                        </span> */}
                        
                        <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Write your prompt Here...'
                        required
                        className='form_textarea dark:bg-[#2B3A55] dark:text-white border dark:border-gray-400 dark:focus:border-gray-50'
                        >

                        </textarea>
                    </label>

                    </form>
                </div>
            </div>

            <div className='modalContent bg-white dark:bg-[#1A202c] '>
                <div className='flex justify-end items-center'>
                    <button onClick={handleGPTaction} className='deleteBtn text-[#2B3A55] group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none rounded-md' >
                    Go!
                    </button>
                    {/* <button
                        className='cancelBtn'
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatModal