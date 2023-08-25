"use client";

import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Message from "./Message";
import useAutoResizeTextArea from "../others/AutosizeTextArea";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

const ChatBody = (props) => {
  const { toggleComponentVisibility } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState("")
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const bottomOfChatRef = useRef(null);
  const [newChatId, setNewChatId] = useState(null)
  const router = useRouter();
  
  const textAreaRef = useAutoResizeTextArea();
  const selectedModel = "gpt-3.5-turbo";

  useEffect(() => {
    if(!isLoading && newChatId)
    {
      setNewChatId(null)
      router.push(`/chat/${newChatId}`)
    }
  
  }, [newChatId,isLoading,router])
  

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message, textAreaRef]);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const sendMessage = async () => {
    // Don't send empty messages
    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    // trackEvent("send.message", { message: message });
    setIsLoading(true);

    // Add the message to the conversation
    setConversation([
      ...conversation,
      {
        _id: uuidv4(),
        content: message,
        role: "user" 
    }
    ]);

    // Clear the message & remove empty chat
    setMessage("");
    setShowEmptyChat(false);

    try {
        const url = '/api/chatresult';
        const headers = {
            'Content-type': 'application/json'
        }
        const data = {
            model: 'gpt-3.5-turbo-0613',
            messages: [{ content: message, role: "user" }]
        }
      const response = await fetch(url, {
        method: 'POST', 
        credentials: 'include',
        headers: headers, 
        body: JSON.stringify(data), 
      })

      if (response.ok) {
        const data = await response.json();
        // Add the message to the conversation
        data.map((value,key) => {
            if(key === 0)
            {
              setNewChatId(value)
            }
            setIncomingMessage(s => `${s}${value}`)
        })
        // setConversation([
        //   ...conversation,
        //   { content: message, role: "user" },
        //   { content: data.choices[0].message.content, role: "system" },
        // ]);
        console.log(conversation)
      } else {
        console.error(response);
        setErrorMessage(response.statusText);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);

      setIsLoading(false);
    }
  };

  const handleKeypress = (e) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage();
      e.preventDefault();
    }
  };
  const RegenerateResponce = (e) => {
    e.preventDefault();
    let lastIndex;

    for (let i = conversation.length - 1; i >= 0; i--) {
        if (conversation[i].role === 'user') {
            lastIndex = i;
            break;
        }
    }
    const text = conversation[lastIndex].content;
    setMessage(text);
    sendMessage()
}
  return (
    <div className="flex max-w-full flex-1 flex-col mt-20">
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <BsPlusLg className="h-6 w-6" />
        </button>
      </div>
      <div className="relative h-full w-full transition-width flex flex-col overflow-y-scroll items-stretch flex-1">
        <div className="flex-1">
          <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full dark:bg-gray-800">
            <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
              {!showEmptyChat && conversation.length > 0 ? (
                <div className="flex flex-col items-center text-sm bg-gray-800">
                  <div className="flex w-full items-center justify-center gap-1 border-b border-black/10 bg-gray-50 p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-300">
                    Model: {selectedModel.name}
                  </div>
                  {conversation.map((message, index) => (
                    <Message key={message._id} role={message.role} message={message.content} />
                  ))}
                  {!!incomingMessage && (
                    <Message role="bot" message={incomingMessage} />
                  )}
                  {/* <div className="w-full h-32 md:h-48 flex-shrink-0"></div> */}
                  <div ref={bottomOfChatRef}></div>
                </div>
              ) : null}
              {showEmptyChat ? (
                <div className="py-10 relative w-full flex flex-col h-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                      <button
                        className="relative flex w-full cursor-default flex-col rounded-md border border-black/10 bg-white py-2 pl-3 pr-10 text-left focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-white/20 dark:bg-gray-800 sm:text-sm align-center"
                        id="headlessui-listbox-button-:r0:"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-headlessui-state=""
                        aria-labelledby="headlessui-listbox-label-:r1: headlessui-listbox-button-:r0:"
                      >
                        <label
                          className="block text-xs text-gray-700 dark:text-gray-500 text-center"
                          id="headlessui-listbox-label-:r1:"
                          data-headlessui-state=""
                        >
                          Model
                        </label>
                        <span className="inline-flex w-full truncate">
                          <span className="flex items-center gap-1 truncate text-white">
                            {selectedModel.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <BsChevronDown className="h-4 w-4 text-gray-400" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
        <div className="relative bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          
        <div id='responceBtn' className='w-full md:w-full py-3 flex flex-1 justify-center items-center md:flex-col'>
                <div className="flex ml-1 md:w-full md:m-auto  gap-0 md:gap-2 justify-center">
                    <button onClick={RegenerateResponce} className="btn relative btn-neutral bg-white h-8 -z-0 border-0 md:border" as="button">
                        <div className="flex w-full gap-2 items-center justify-center">
                            <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                            Regenerate response
                        </div>
                    </button>
                </div>
            </div> 
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
             
              {errorMessage ? (
                <div className="mb-2 md:mb-0">
                  <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  ref={textAreaRef}
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  // style={{
                  //   height: "24px",
                  //   maxHeight: "200px",
                  //   overflowY: "hidden",
                  // }}
                  // rows={1}
                  placeholder="Send a message..."
                  className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:outline-none dark:bg-transparent pl-2 md:pl-0"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeypress}
                ></textarea>
                <button
                  disabled={isLoading || message?.length === 0}
                  onClick={sendMessage}
                  className={`absolute p-1.5 rounded-md bottom-1.5 md:bottom-2.5 ${message?.length > 0 ? ('bg-[#1bc37d] text-gray-50') : ('enabled:bg-transparent enabled:hover:text-gray-400 bg-none transition-colors disabled:hover:bg-transparent')} right-1 md:right-2 disabled:opacity-40`}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" strokeWidth="2"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>                                

                </button>
              </div>
            </div>
          </form>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <span>
              Chat may produce inaccurate information about people,
              places, or facts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;