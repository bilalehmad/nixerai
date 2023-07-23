"use client";

import {useEffect, useState} from 'react';
import PromptCard from './PromptCard';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import SearchFeed from './SearchFeed';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';
import useSWR from 'swr'

const PromptCardList = ({data, handleTagClick, fetchPosts, hasMore}) => {
 
  return(
    <InfiniteScroll
    dataLength={data.length}
    next={fetchPosts}
    hasMore={hasMore}
    loader={
      <div className='w-full grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden py-4'>
          
        <div className="container px-5 py-4 md:w-full">
          <div className="flex flex-wrap -m-5 ">
            <div className="py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased css-84zodg">
                  <div className=" text-gray-800  dark:bg-[#2B3A55] group dark:text-white px-4 pt-4 pr-3 flex justify-center hover:bg-gray-100 dark:hover:bg-gray-600  ">
                    <div className="css-289z9l">
                      <div class="bg-gray-200 css-sm43lu rounded-xl animate-pulse">
                      </div>
                    </div>
                  </div>
                    <div className="w-full flex flex-col h-[80px]">
                      <div className="w-full flex flex-wrap justify-start">
                        <div class="w-full bg-gray-200 animate-pulse h-6 mt-2 mr-2 rounded-lg">
                        </div>
                        
                        <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                        <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                      </div>
                    </div>
                </div>
                
                <div class="flex flex-row items-center gap-3 p-4 pb-2 pr-3 justify-center">
                      <div class="w-20 h-4 bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div class="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
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
                      <div class="bg-gray-200 css-sm43lu rounded-xl animate-pulse">
                      </div>
                    </div>
                  </div>
                    <div className="w-full flex flex-col h-[80px]">
                      <div className="w-full flex flex-wrap justify-start">
                        <div class="w-full bg-gray-200 animate-pulse h-6 mt-2 mr-2 rounded-lg">
                        </div>
                        
                        <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                        <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                      </div>
                    </div>
                </div>
                
                <div class="flex flex-row items-center gap-3 p-4 pb-2 pr-3 justify-center">
                      <div class="w-20 h-4 bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div class="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
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
                      <div class="bg-gray-200 css-sm43lu rounded-xl animate-pulse">
                      </div>
                    </div>
                  </div>
                    <div className="w-full flex flex-col h-[80px]">
                      <div className="w-full flex flex-wrap justify-start">
                        <div class="w-full bg-gray-200 animate-pulse h-6 mt-2 mr-2 rounded-lg">
                        </div>
                        
                        <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                        <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mr-2 rounded-lg">
                        </div>
                      </div>
                    </div>
                </div>
                
                <div class="flex flex-row items-center gap-3 p-4 pb-2 pr-3 justify-center">
                      <div class="w-20 h-4 bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div class="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    }
  >
    <div className='mt-16 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 overflow-hidden'>
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

const Feed = (props) => {
  const response = props.data;
  console.log(response)
  const data = JSON.parse(response);
  const [posts, setPosts] = useState(data)
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [optionValue, setOptionValue] = useState(null);
  const [isSort, setIsSort] = useState(false);
  const [page, setPage] = useState(2);
  const [sortPage, setSortPage] = useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searching, setSearching] = useState(false);

  // const firstfetch = props.data;
  // console.log(firstfetch)

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
  
  // useEffect(() => {
  //   (async () => {
  //     setHasMore(true);
  //     await fetchFirstPosts(firstfetch);
  //   })();
  // },[]);

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