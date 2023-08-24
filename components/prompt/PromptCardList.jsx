"use client";

import { useState } from 'react';
import PromptCard from './PromptCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const PromptCardList = ({data,reactions,WishList, setTags,setPageTag, setSearchTag, fetchPosts, hasMore}) => {
 
  const [UserReactions, setUserReactions] = useState(reactions);
  const [UserWishList, setUserWishList] = useState(WishList)
  return(
    <InfiniteScroll
    dataLength={data.length}
    next={fetchPosts}
    hasMore={hasMore}
    loader={
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 overflow-hidden py-4'>
          
        <div className="container px-5 py-4 w-full">
          <div className="flex flex-wrap -m-5 ">
            <div className="py-2 w-full">
              <div className="w-full h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased css-84zodg">
                  <div className=" text-gray-800  dark:bg-[#2B3A55] group dark:text-white px-4 pt-4 pr-3 flex justify-center hover:bg-gray-100 dark:hover:bg-gray-600  ">
                    <div className="css-289z9l">
                      <div className="bg-gray-200 css-sm43lu rounded-xl animate-pulse">
                      </div>
                    </div>
                  </div>
                    <div className="w-full flex flex-col h-[80px]">
                      <div className="w-full flex flex-wrap justify-start">
                        <div className="w-full bg-gray-200 animate-pulse h-6 mt-2 mr-2 rounded-lg">
                        </div>
                        
                        <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                        <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                      </div>
                    </div>
                </div>
                
                <div className="flex flex-row items-center gap-3 p-4 pb-2 pr-3 justify-center">
                      <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div className="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
          
        <div className="container px-5 py-4 md:w-full">
          <div className="flex flex-wrap -m-5 ">
            <div className="py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased css-84zodg">
                  <div className=" text-gray-800  dark:bg-[#2B3A55] group dark:text-white px-4 pt-4 pr-3 flex justify-center hover:bg-gray-100 dark:hover:bg-gray-600  ">
                    <div className="css-289z9l">
                      <div className="bg-gray-200 css-sm43lu rounded-xl animate-pulse">
                      </div>
                    </div>
                  </div>
                    <div className="w-full flex flex-col h-[80px]">
                      <div className="w-full flex flex-wrap justify-start">
                        <div className="w-full bg-gray-200 animate-pulse h-6 mt-2 mr-2 rounded-lg">
                        </div>
                        
                        <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                        <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                      </div>
                    </div>
                </div>
                
                <div className="flex flex-row items-center gap-3 p-4 pb-2 pr-3 justify-center">
                      <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div className="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>

          
        <div className="container px-5 py-4 md:w-full">
          <div className="flex flex-wrap -m-5 ">
            <div className="py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased css-84zodg">
                  <div className=" text-gray-800  dark:bg-[#2B3A55] group dark:text-white px-4 pt-4 pr-3 flex justify-center hover:bg-gray-100 dark:hover:bg-gray-600  ">
                    <div className="css-289z9l">
                      <div className="bg-gray-200 css-sm43lu rounded-xl animate-pulse">
                      </div>
                    </div>
                  </div>
                    <div className="w-full flex flex-col h-[80px]">
                      <div className="w-full flex flex-wrap justify-start">
                        <div className="w-full bg-gray-200 animate-pulse h-6 mt-2 mr-2 rounded-lg">
                        </div>
                        
                        <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                        <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                      </div>
                    </div>
                </div>
                
                <div className="flex flex-row items-center gap-3 p-4 pb-2 pr-3 justify-center">
                      <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div className="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    }
  >
    <div className='w-full mt-16 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 overflow-hidden py-4'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          setTags={setTags}
          setSearchTag={setSearchTag}
          setPageTag={setPageTag}
          reactions={UserReactions.map((obj) => {return obj.post.toString() == post._id.toString()  ? obj : undefined}).filter(Boolean)}
          wishing={UserWishList.map((obj) => { return obj.post.toString() == post._id.toString()  ? obj : undefined}).filter(Boolean)}

        />
      ))}

    </div>
      </InfiniteScroll>
  )
}

export default PromptCardList;