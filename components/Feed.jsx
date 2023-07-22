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
            <div className="cursor-pointer py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased cursor-pointer css-84zodg">
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
            <div className="cursor-pointer py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased cursor-pointer css-84zodg">
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
            <div className="cursor-pointer py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                
                <div className="antialiased cursor-pointer css-84zodg">
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
  
  const [posts, setPosts] = useState(props.data)
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