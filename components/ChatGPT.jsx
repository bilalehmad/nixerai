"use client";
import ChatModal from "@components//ChatModal";
import { useState } from 'react'
import Image from 'next/image';

const ChatGPT = ({title,sample}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [prompt, setPrompt] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [heading, setHeading] = useState('');

    const handleModalButton = () => {
        setIsOpen((prev) => !prev);
        setPrompt(sample);
        setHeading(title);
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
    <div className='px-5'>
        <h5 className='text-gray-700 py-2  dark:text-white font-staoshi font-semibold text-sm'>
            Play It on Chat GPT
        </h5>
        
        <button className='cursor-pointer' onClick={handleModalButton}>
            <Image alt="chatgpt image" src='/assets/images/chatgpt.png' width={30} height={30} />
            {/* <svg className=' fill-white mt-1 ml-1.5' width='18' version="1.1" viewBox="0 0 24 24" ><g id="info"/><g id="icons"><path d="M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z" id="play"/></g></svg> */}
        </button>
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
    
  )
}

export default ChatGPT