"use client";

import {useEffect, useState} from 'react';
import ToolCard from './ToolCard';
import Link from 'next/link';
import SearchTool from './SearchTool';
import InfiniteScroll from 'react-infinite-scroll-component';

const ToolCardList = ({data, handleTagClick, fetchPosts, hasMore}) => {
  
    const [isOpen, setIsOpen] = useState(false);
    const [youtubeURL, setYoutubeURL] = useState(null);

  const handleModalStateChange = (val) => {
    setYoutubeURL(val)
    setIsOpen(true);
  };

  const handleShareModalStateChange = async (val) => {
    
    try {
        await navigator.share({
          title: 'Shared Title',
          text: 'Shared Text',
          url: val,
        });
        console.log('Content shared successfully!');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal')) {
          setIsOpen(false);
        }
      };
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
          setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.addEventListener('keydown', handleEscapeKey);
        document.addEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

   
    return(
    <InfiniteScroll
      dataLength={data.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={
        <div className='w-full grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4 overflow-hidden py-4'>
            <div className="container px-5 py-4 md:w-full ">
              <div className="flex flex-wrap -m-5 ">
                <div className="w-full py-2 ">
                  <div className="h-full rounded-xl shadow-cla-blue border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md">
                    <div className="bg-white dark:bg-[#2B3A55] group text-gray-800 dark:text-white w-full relative flex flex-col justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                      <div className="flex items-center w-full " >
                          <div class="bg-gray-200 w-48 rounded-t-lg h-36  md:w-48 md:rounded-none md:rounded-l-lg  animate-pulse">
                          </div>
                          <div className="w-full flex flex-col h-[130px]">
                            <div className="w-full flex flex-wrap justify-between">
                              <div class="w-full bg-gray-200 animate-pulse h-6 p-2 mt-2 mx-2 rounded-lg">
                              </div>
                              
                              <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                              <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                            </div>
                            
                            <div class="flex flex-row justify-end items-end gap-3 h-[80px] p-2">
                              <div class="w-32 h-4 bg-gray-200 rounded-lg animate-pulse">
                              </div>
                              <div class="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="container px-5 py-4 md:w-full ">
              <div className="flex flex-wrap -m-5 ">
                <div className="w-full py-2 ">
                  <div className="h-full rounded-xl shadow-cla-blue border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md">
                    <div className="bg-white dark:bg-[#2B3A55] group text-gray-800 dark:text-white w-full relative flex flex-col justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                      <div className="flex items-center w-full " >
                          <div class="bg-gray-200 w-48 rounded-t-lg h-36  md:w-48 md:rounded-none md:rounded-l-lg  animate-pulse">
                          </div>
                          <div className="w-full flex flex-col h-[130px]">
                            <div className="w-full flex flex-wrap justify-between">
                              <div class="w-full bg-gray-200 animate-pulse h-6 p-2 mt-2 mx-2 rounded-lg">
                              </div>
                              
                              <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                              <div class="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                            </div>
                            
                            <div class="flex flex-row justify-end items-end gap-3 h-[80px] p-2">
                              <div class="w-32 h-4 bg-gray-200 rounded-lg animate-pulse">
                              </div>
                              <div class="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
        </div>
  
      }
    >
      <div className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-5  lg:grid-cols-2  sm:grid-cols-2 overflow-hidden'>
        {data.map((post) => (
          <ToolCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            onModalStateChange = {handleModalStateChange}
            onShareModalStateChane = {handleShareModalStateChange}
          />
        ))}
        <div>

        {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${youtubeURL}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
        />
          </div>
        </div>
      )}
      
    </div>
      </div>
      
     </InfiniteScroll>
    )
  }

const Tool = (props) => {
    
  const [posts, setPosts] = useState(props.data)
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterPage, setFilterPage] = useState(1);
  const [optionValue, setOptionValue] = useState(null);
  const [isSort, setIsSort] = useState(false);
  const [sortPage, setSortPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

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
    else{
      setSearchedResults([]);
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

  const fetchFilterPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `names=${isChecked.join(',')}&page=${filterPage}&pageSize=10`;
    // Increment the page number for the next data fetch
    try {
      setFilterPage((prevSortPage) => prevSortPage + 1)
      const response = await fetch(`/api/tool/filter?${queryParam}`);
      const data = await response.json();
      console.log(data)
      // Update the items state with the new data
      setSearchedResults((prev) => [...prev, ...data]);
        
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
  
  // useEffect(() => {
  //   (async () => {
  //     setHasMore(true);
  //     await fetchPosts();
  //   })();
  // },[]);

  

  const fetchPosts = async () => {
    const queryParam = `page=${page}&pageSize=10`;
    // Increment the page number for the next data fetch
    setPage((prevSortPage) => prevSortPage + 1)

    const response = await fetch(`/api/tool?${queryParam}`);
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
      const response = await fetch(`/api/tool/sort?${queryParam}`)
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

  
  const fetchSearchPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `q=${searchText}&page=${searchPage}&pageSize=10`;
    try {
      // Increment the page number for the next data fetch
      setSearchPage((prevSortPage) => prevSortPage + 1)
      const response = await fetch(`/api/tool/search?${queryParam}`);
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
  //       regex.test(item.title) ||
  //       regex.test(item.description) 
  //   );
  // };

  // const handleSearchChange = (e) => {
  //   clearTimeout(searchTimeout);
  //   setSearchText(e.target.value);

  //   // debounce method
  //   setSearchTimeout(
  //     setTimeout(() => {
  //       const searchResult = filterPrompts(e.target.value);
  //       setSearchedResults(searchResult);
  //     }, 500)
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
        <SearchTool
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
        <ToolCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          hasMore = {hasMore}
          fetchPosts={fetchSortPosts}
        />
      )}
      {isFilter && (
          <ToolCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
            hasMore = {hasMore}
            fetchPosts={fetchFilterPosts}
          />
      )}
      {searchTimeout && (
            <ToolCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
              hasMore = {hasMore}
              fetchPosts={fetchSearchPosts}
            />
      )}
     { !isSort &&  !isFilter && !searchTimeout && (
        <ToolCardList 
        data={posts} 
        hasMore = {hasMore}
        fetchPosts={fetchPosts}
        handleTagClick={handleTagClick} />
      )}

    </section>
  )
}

export default Tool