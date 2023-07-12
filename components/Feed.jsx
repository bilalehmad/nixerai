"use client";

import {useEffect, useState} from 'react';
import PromptCard from './PromptCard';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import SearchFeed from './SearchFeed';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';

const PromptCardList = ({data, handleTagClick, fetchPosts, hasMore}) => {
  return(
    <InfiniteScroll
    dataLength={data.length}
    next={fetchPosts}
    hasMore={hasMore}
    loader={
      <div className='w-full grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden px-5 py-3'>
          <div role="status" className="px-5 py-4 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl shadow-cla-blue bg-gradient-to-r shadow-md  dark:bg-[#2B3A55]">
 
                <div className="bg-gray-50 text-gray-800 dark:bg-[#2B3A55] group dark:text-white w-full relative pb-2 pr-3   flex flex-col justify-center  transition-all">
                  
                  <div className="w-full flex justify-items-center overflow-hidden antialiased" >
                    <div className='w-full flex justify-center px-8'>
                      <div className="bg-gray-700 rounded-xl w-full flex items-center justify-center h-16 ">
                      <svg className=" w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                      </div>
                    </div>
                    <div className="w-full flex flex-col h-[80px] gap-1 pl-1 overflow-hidden css-0">
                      <div className="flex-row justify-between  ">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>                          </div>
                      
                    </div>
                  </div>
                </div>
         
          </div>
          <div role="status" className="px-5 py-4 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl shadow-cla-blue bg-gradient-to-r shadow-md  dark:bg-[#2B3A55]">
 
                <div className="bg-gray-50 text-gray-800 dark:bg-[#2B3A55] group dark:text-white w-full relative pb-2 pr-3   flex flex-col justify-center  transition-all">
                  
                  <div className="w-full flex justify-items-center overflow-hidden antialiased" >
                    <div className='w-full flex justify-center px-8'>
                      <div className="bg-gray-700 rounded-xl w-full flex items-center justify-center h-16 ">
                      <svg className=" w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                      </div>
                    </div>
                    <div className="w-full flex flex-col h-[80px] gap-1 pl-1 overflow-hidden css-0">
                      <div className="flex-row justify-between  ">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>                          </div>
                      
                    </div>
                  </div>
                </div>
         
          </div>
          <div role="status" className="px-5 py-4 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl shadow-cla-blue bg-gradient-to-r shadow-md  dark:bg-[#2B3A55]">
 
                <div className="bg-gray-50 text-gray-800 dark:bg-[#2B3A55] group dark:text-white w-full relative pb-2 pr-3   flex flex-col justify-center  transition-all">
                  
                  <div className="w-full flex justify-items-center overflow-hidden antialiased" >
                    <div className='w-full flex justify-center px-8'>
                      <div className="bg-gray-700 rounded-xl w-full flex items-center justify-center h-16 ">
                      <svg className=" w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                      </div>
                    </div>
                    <div className="w-full flex flex-col h-[80px] gap-1 pl-1 overflow-hidden css-0">
                      <div className="flex-row justify-between  ">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>                          </div>
                      
                    </div>
                  </div>
                </div>
         
          </div>
      </div>

    }
  >
    <div className='mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </div>
      </InfiniteScroll>
  )
}

const Feed = () => {
  
  const [posts, setPosts] = useState([])
  const router = useRouter();
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [optionValue, setOptionValue] = useState(null);
  const [isSort, setIsSort] = useState(false);
  const [page, setPage] = useState(1);
  const [sortPage, setSortPage] = useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searching, setSearching] = useState(false)
 useEffect(() => {
  console.log('status', optionValue,'status page', filterPage);
 }, [optionValue,filterPage])
 
  
  useEffect(() => {
    if (optionValue !== null) {
      (async () => {
        //setSortPage(1);
        
        setSearchedResults([]);
        setHasMore(true);
        await fetchSortPosts();
      })();
      //setSortPage(1);
     
    } 
  }, [optionValue]);

  useEffect(() => {
    if(isOpen === false && isChecked.length > 0){
      (async () => {
        setSearchedResults([]);
        setHasMore(true);
        await fetchFilterPosts();
      })();
     
    } 
  }, [isOpen]);

  useEffect(() => {
    if(searching === true){
      (async () => {
        setSearchedResults([]);
        setHasMore(true);
        await fetchSearchPosts();
      })();
     
    } 
  }, [searching]);
  
  useEffect(() => {
    (async () => {
      setHasMore(true);
      await fetchPosts();
    })();
  },[]);


  const fetchPosts = async () => {
    const queryParam = `page=${page}&pageSize=10`;
    // Increment the page number for the next data fetch
    setPage((prevSortPage) => prevSortPage + 1)

    const response = await fetch(`/api/prompt?${queryParam}`);
    const data = await response.json();

    // Update the items state with the new data
    setPosts((prevPrompts) => [...prevPrompts, ...data]);
    
     // Determine if there's more data to fetch
     if (data.length === 0) {
      setHasMore(false);
    } 
    setIsFilter(false);
    setIsSort(false);
    setSearchTimeout(false);
    setSearching(false);

  }
    
  const fetchSortPosts =  async() => {
    // Construct the query parameter using names optionValue,sortPage
    const queryParam = `status=${optionValue}&page=${sortPage}&pageSize=10`;
    setSortPage((prevSortPage) => prevSortPage + 1)
    try {
      const response = await fetch(`/api/prompt/sort?${queryParam}`)
      const data = await  response.json()
      console.log(data);
      setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
      setIsSort(true);
      if(data.length === 0)
      {
        setHasMore(false);
      }
      setIsFilter(false);
      setIsSort(true);
      setSearchTimeout(false);
      setSearching(false);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    //final code
  }
  }


  const fetchFilterPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `names=${isChecked.join(',')}&page=${filterPage}&pageSize=10`;
    // Increment the page number for the next data fetch
    try {
      setFilterPage((prevSortPage) => prevSortPage + 1)
      const response = await fetch(`/api/prompt/filter?${queryParam}`);
      const data = await response.json();
      console.log(data)
      // Update the items state with the new data
      setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
        
      // Determine if there's more data to fetch
      if (data.length === 0) {
        setHasMore(false);
        }

      setIsFilter(true);
      setIsSort(false);
      setSearchTimeout(false);
      setSearching(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      //final code
    }
  }

  const fetchSearchPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `q=${searchText}&page=${searchPage}&pageSize=10`;
    try {
      // Increment the page number for the next data fetch
      setSearchPage((prevSortPage) => prevSortPage + 1)
      const response = await fetch(`/api/prompt/search?${queryParam}`);
      const data = await response.json();

      // Update the items state with the new data
      setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
        
      // Determine if there's more data to fetch
      if (data.length === 0) {
        setHasMore(false);
        setSearching(false);
      }

      setIsFilter(false);
      setIsSort(false);
      setSearchTimeout(true);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      //final code
    }
  }


  // const filterPrompts = (searchtext) => {
  //   const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //   return posts.filter(
  //     (item) =>
  //       regex.test(item.creator.username) ||
  //       regex.test(item.tag) ||
  //       regex.test(item.teasor) 
  //   );
  // };

 

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  return (
    <section className='feed'>
      <div className='inline-flex mb-5'>
      
      <Link href='/' className="text-[#2B3A55] group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none  font-bold rounded-sm text-sm px-10 py-2.5 text-center inline-flex items-center mr-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-5 h-5 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B3A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
          10,000+ Prompt
        </Link>
        <Link href='/ai-tool' className="text-white bg-[#2B3A55] hover:bg-blue-900 focus:outline-none font-bold rounded-sm text-sm px-10 py-2.5 text-center inline-flex items-center  dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="w-5 h-5 mr-2"  viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
            5000+ AI Tools
        </Link>

      </div>
      <form className="relative w-full flex-center">
        <SearchFeed
        setSearchText = {setSearchText}
        isChecked = {isChecked}
        setIsChecked = {setIsChecked}
        isOpen = {isOpen}
        setIsOpen = {setIsOpen}
        setFilterPage={setFilterPage}
        optionValue = {optionValue}
        setOptionValue = {setOptionValue}
        setSortPage={setSortPage}
        setSearchPage={setSearchPage}
        setSearching={setSearching}
        />
            
      </form>
      {/* All Prompts */}
      {isSort &&  (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          hasMore = {hasMore}
          fetchPosts={fetchSortPosts}
        />
      )}
      {isFilter && (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
            hasMore = {hasMore}
            fetchPosts={fetchFilterPosts}
          />
      )}
      {searchTimeout && (
            <PromptCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
              hasMore = {hasMore}
              fetchPosts={fetchSearchPosts}
            />
      )}
      {!isSort && !isFilter && !searchTimeout && (
        <PromptCardList 
        data={posts} 
        handleTagClick={handleTagClick}
        hasMore = {hasMore}
        fetchPosts={fetchPosts}
      />
      
      )}
       {/* {isLoading && <div>Loading...</div>} */}
    </section>
    
  )
}

export default Feed