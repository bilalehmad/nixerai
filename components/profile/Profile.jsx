"use client";

import { useState } from 'react';
import PromptCard from '../prompt/PromptCard'
import ToolCard from '@components/tool/ToolCard';

const Profile = ({name, desc, data,reactions,tool,toolReaction, handleEdit, handleDelete}) => {
  const [isToggled, setToggle] = useState(false);
 
  const [promptWish, setPromptWish] = useState(()=> {
      const result = data == true ? []: JSON.parse(data);
      return result;
  });
  const [promptReact, setPromptReact] = useState(()=> {
    const result = reactions == true ? []: JSON.parse(reactions);
    return result;
  });
  const [aiWish, setAiWish] = useState(()=> {
      const result = data == true ? []: JSON.parse(tool);
      return result;
    })
  const [aiReact, setAiReact] = useState(()=> {
    const result = reactions == true ? []: JSON.parse(toolReaction);
    return result;
  });;
  
  const switchPromptHandle = () => {
    setToggle(false);
  }
  const switchToolHandle = () => {
    setToggle(true);
  }
  let updateWhishlist = promptWish.map(obj => {
    let postId = obj.post && obj.post._id ? obj.post._id : null;
    return {...obj, post: postId};
});
let updateToollist = aiWish.map(obj => {
  let postId = obj.post && obj.post._id ? obj.post._id : null;
  return {...obj, post: postId};
});
  return (
    <div class="p-4 sm:ml-64 w-full h-screen">
        <h1 className='short_head text-left'>
            <span className='amber_gradient'>{name} Wishlist </span>
        </h1>
        <p className='short_desc text-left'>{desc}</p>
        
        <div class="px-2 w-full flex flex-col py-2 md:py-6 sticky top-0">
          <div class="relative flex flex-col items-stretch justify-center gap-2 sm:items-center">
            <div class="relative flex rounded-xl bg-gray-100 p-1 text-gray-900 dark:bg-gray-900">
              <ul class="flex w-full list-none gap-1 sm:w-auto">
                <li class="group/toggle w-full" data-testid="text-davinci-002-render-sha">
                  {!isToggled ? (
                    <button type="button" onClick={switchPromptHandle} id="radix-:r3u:" aria-haspopup="menu" aria-expanded="false" data-state="closed"  class="w-full cursor-pointer">
                    <div class="group/button relative flex w-full items-center justify-center gap-1 rounded-lg border py-3 outline-none transition-opacity duration-100 sm:w-auto sm:min-w-[148px] md:gap-2 md:py-2.5 border-black/10 bg-white text-gray-900 stroke-gray-900 shadow-[0_1px_7px_0px_rgba(0,0,0,0.06)] hover:!opacity-100 dark:border-[#4E4F60] dark:bg-gray-700 dark:text-gray-100 dark:stroke-gray-100">
                      <span class="relative max-[370px]:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"  class="h-4 w-4 transition-colors group-hover/button:text-brand-purple"  width="20"  height="20" viewBox="0 0 24 24" fill="none" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
                      </span>
                      <span class="truncate text-sm font-medium md:pr-1.5 pr-1.5">Prompts</span>
                  </div>
                </button>
                  ) : (
                    <button type="button" onClick={switchPromptHandle} id="radix-:r3u:" aria-haspopup="menu" aria-expanded="false" data-state="closed"  class="w-full cursor-pointer">
                      <div class="group/button relative flex w-full items-center justify-center gap-1 rounded-lg border py-3 outline-none transition-opacity duration-100 sm:w-auto sm:min-w-[148px] md:gap-2 md:py-2.5 border-transparent stroke-gray-500 dark:stroke-gray-500 text-gray-500 hover:text-gray-800  hover:stroke-gray-800 hover:dark:text-gray-100 dark:hover:stroke-gray-100">
                        <span class="relative max-[370px]:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"  class="h-4 w-4 transition-colors group-hover/button:text-brand-purple"  width="20"  height="20" viewBox="0 0 24 24" fill="none" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
                        </span>
                        <span class="truncate text-sm font-medium md:pr-1.5 pr-1.5">Prompts</span>
                    </div>
                  </button>
                  )}
                  
                </li>
                <li class="group/toggle w-full" data-testid="gpt-4-upsell">
                {isToggled ? (
                  <button type="button" onClick={switchToolHandle} id="radix-:r40:" aria-haspopup="menu" aria-expanded="false" data-state="closed" class="w-full cursor-pointer">
                  <div class="group/button relative flex w-full items-center justify-center gap-1 rounded-lg border py-3 outline-none transition-opacity duration-100 sm:w-auto sm:min-w-[148px] md:gap-2 md:py-2.5 border-black/10 bg-white text-gray-900 stroke-gray-900 shadow-[0_1px_7px_0px_rgba(0,0,0,0.06)] hover:!opacity-100 dark:border-[#4E4F60] dark:bg-gray-700 dark:text-gray-100 dark:stroke-gray-100 ">
                    <span class="relative  max-[370px]:hidden">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 transition-colors group-hover/button:text-brand-purple" width="16" height="16" stroke-width="2"><path d="M12.784 1.442a.8.8 0 0 0-1.569 0l-.191.953a.8.8 0 0 1-.628.628l-.953.19a.8.8 0 0 0 0 1.57l.953.19a.8.8 0 0 1 .628.629l.19.953a.8.8 0 0 0 1.57 0l.19-.953a.8.8 0 0 1 .629-.628l.953-.19a.8.8 0 0 0 0-1.57l-.953-.19a.8.8 0 0 1-.628-.629l-.19-.953h-.002ZM5.559 4.546a.8.8 0 0 0-1.519 0l-.546 1.64a.8.8 0 0 1-.507.507l-1.64.546a.8.8 0 0 0 0 1.519l1.64.547a.8.8 0 0 1 .507.505l.546 1.641a.8.8 0 0 0 1.519 0l.546-1.64a.8.8 0 0 1 .506-.507l1.641-.546a.8.8 0 0 0 0-1.519l-1.64-.546a.8.8 0 0 1-.507-.506L5.56 4.546Zm5.6 6.4a.8.8 0 0 0-1.519 0l-.147.44a.8.8 0 0 1-.505.507l-.441.146a.8.8 0 0 0 0 1.519l.44.146a.8.8 0 0 1 .507.506l.146.441a.8.8 0 0 0 1.519 0l.147-.44a.8.8 0 0 1 .506-.507l.44-.146a.8.8 0 0 0 0-1.519l-.44-.147a.8.8 0 0 1-.507-.505l-.146-.441Z" fill="currentColor"></path></svg> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"  aria-hidden="true" class="h-4 w-4 transition-colors group-hover/button:text-brand-purple"  viewBox="0 0 24 24" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>

                    </span>
                    <span class="truncate text-sm font-medium md:pr-1.5 pr-1.5">Tools</span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" stroke-width="2" class="h-4 w-4 transition-colors sm:ml-0 group-hover/options:text-gray-500 !text-gray-500 -ml-2 group-hover/button:text-brand-purple"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd"></path></svg> */}
                  </div>
                </button>
                ):(
                  <button type="button" onClick={switchToolHandle} id="radix-:r40:" aria-haspopup="menu" aria-expanded="false" data-state="closed" class="w-full cursor-pointer">
                    <div class="group/button relative flex w-full items-center justify-center gap-1 rounded-lg border py-3 outline-none transition-opacity duration-100 sm:w-auto sm:min-w-[148px] md:gap-2 md:py-2.5 border-transparent stroke-gray-500 text-gray-500 hover:text-gray-800 hover:stroke-gray-800 hover:dark:text-gray-100 dark:hover:stroke-gray-100">
                      <span class="relative  max-[370px]:hidden">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 transition-colors group-hover/button:text-brand-purple" width="16" height="16" stroke-width="2"><path d="M12.784 1.442a.8.8 0 0 0-1.569 0l-.191.953a.8.8 0 0 1-.628.628l-.953.19a.8.8 0 0 0 0 1.57l.953.19a.8.8 0 0 1 .628.629l.19.953a.8.8 0 0 0 1.57 0l.19-.953a.8.8 0 0 1 .629-.628l.953-.19a.8.8 0 0 0 0-1.57l-.953-.19a.8.8 0 0 1-.628-.629l-.19-.953h-.002ZM5.559 4.546a.8.8 0 0 0-1.519 0l-.546 1.64a.8.8 0 0 1-.507.507l-1.64.546a.8.8 0 0 0 0 1.519l1.64.547a.8.8 0 0 1 .507.505l.546 1.641a.8.8 0 0 0 1.519 0l.546-1.64a.8.8 0 0 1 .506-.507l1.641-.546a.8.8 0 0 0 0-1.519l-1.64-.546a.8.8 0 0 1-.507-.506L5.56 4.546Zm5.6 6.4a.8.8 0 0 0-1.519 0l-.147.44a.8.8 0 0 1-.505.507l-.441.146a.8.8 0 0 0 0 1.519l.44.146a.8.8 0 0 1 .507.506l.146.441a.8.8 0 0 0 1.519 0l.147-.44a.8.8 0 0 1 .506-.507l.44-.146a.8.8 0 0 0 0-1.519l-.44-.147a.8.8 0 0 1-.507-.505l-.146-.441Z" fill="currentColor"></path></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"  aria-hidden="true" class="h-4 w-4 transition-colors group-hover/button:text-brand-purple"  viewBox="0 0 24 24" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>

                      </span>
                      <span class="truncate text-sm font-medium md:pr-1.5 pr-1.5">Tools</span>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" stroke-width="2" class="h-4 w-4 transition-colors sm:ml-0 group-hover/options:text-gray-500 !text-gray-500 -ml-2 group-hover/button:text-brand-purple"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd"></path></svg> */}
                    </div>
                  </button>
                )}
                  
                </li>
              </ul>
            </div>
          </div>

        </div>
        {/* <p>{isToggled ? 'Switch is ON' : 'Switch is OFF'}</p> */}
        {!isToggled ? (
          <div className='w-full mt-5 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 overflow-hidden py-4'>
            {promptWish && promptWish.map((post) => (
                <PromptCard   
                key={post._id}
                post={post.post}
                reactions={JSON.parse(reactions).map((obj) => {return obj.post.toString() == post.post._id.toString()  ? obj : undefined}).filter(Boolean)}
                wishing={updateWhishlist}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
                />
            ))}
          </div>
        ) : (
          <div className='w-full mt-5 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 overflow-hidden py-4'>
            {aiWish && aiWish.map((post) => (
                <ToolCard   
                key={post._id}
                post={post.post}
                reactions={JSON.parse(toolReaction).map((obj) => {return obj.post.toString() == post.post._id.toString()  ? obj : undefined}).filter(Boolean)}
                wishing={updateToollist}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
                />
            ))}
          </div>
        )}
        
    </div>
  )
}

export default Profile;