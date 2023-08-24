"use client";

import {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import ToolCard from './ToolCard';
import Link from 'next/link';
import SearchTool from './SearchTool';
import InfiniteScroll from 'react-infinite-scroll-component';

const ToolCardList = ({data,setTags,setPageTag,reactions, setSearchTag, fetchPosts, hasMore,WishList}) => {
  
    const [isOpen, setIsOpen] = useState(false);
    const [youtubeURL, setYoutubeURL] = useState(null);
    const [UserReactions, setUserReactions] = useState(reactions);
    const [UserWishList, setUserWishList] = useState(WishList)
console.log(data)
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
                          <div className="bg-gray-200 w-48 rounded-t-lg h-36  md:w-48 md:rounded-none md:rounded-l-lg  animate-pulse">
                          </div>
                          <div className="w-full flex flex-col h-[130px]">
                            <div className="w-full flex flex-wrap justify-between">
                              <div className="w-full bg-gray-200 animate-pulse h-6 p-2 mt-2 mx-2 rounded-lg">
                              </div>
                              
                              <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                              <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                            </div>
                            
                            <div className="flex flex-row justify-end items-end gap-3 h-[80px] p-2">
                              <div className="w-32 h-4 bg-gray-200 rounded-lg animate-pulse">
                              </div>
                              <div className="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
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
                          <div className="bg-gray-200 w-48 rounded-t-lg h-36  md:w-48 md:rounded-none md:rounded-l-lg  animate-pulse">
                          </div>
                          <div className="w-full flex flex-col h-[130px]">
                            <div className="w-full flex flex-wrap justify-between">
                              <div className="w-full bg-gray-200 animate-pulse h-6 p-2 mt-2 mx-2 rounded-lg">
                              </div>
                              
                              <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                              <div className="w-full h-3 bg-gray-200 animate-pulse mt-2 mx-2 rounded-lg">
                              </div>
                            </div>
                            
                            <div className="flex flex-row justify-end items-end gap-3 h-[80px] p-2">
                              <div className="w-32 h-4 bg-gray-200 rounded-lg animate-pulse">
                              </div>
                              <div className="w-20 h-4 ml-auto bg-gray-200 rounded-lg animate-pulse">
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
            setTags={setTags}
            setPageTag={setPageTag}
            setSearchTag={setSearchTag}
            onModalStateChange = {handleModalStateChange}
            onShareModalStateChane = {handleShareModalStateChange}
            // reactions={reactions.map((obj) => {obj.find((element) => { console.log(obj);return element.find(obj2 => obj2._id === post._id)})})}
            reactions={UserReactions.map((obj) => {return obj.post.toString() == post._id.toString()  ? obj : undefined}).filter(Boolean)}
            wishing={UserWishList.map((obj) => { return obj.post.toString() == post._id.toString()  ? obj : undefined}).filter(Boolean)}

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

const Tool = ({data,category,reactions,wishies})=> {
  // const data = JSON.parse(data);
  const {data: session} = useSession();
  const [posts, setPosts] = useState(data)
  // Search states
  const [searchText, setSearchText] = useState("");
  const [tags, setTags] = useState("");
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
  const [pageTag, setPageTag] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTag, setSearchTag] = useState(false);
  const [getReactions, setGetReactions] = useState(()=> {
    const result = reactions == true ? []: JSON.parse(reactions);
    return result;
  })
  const [wishing, setWishing] = useState(()=> {
      const result = wishies == true ? []: JSON.parse(wishies);
      return result;
    });
  const [UserReactions, setUserReactions] = useState(getReactions);
  const [UserWishList, setUserWishList] = useState(wishing)

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
    setSearchTag(false);


  }

  // const fetchUserReaction = async (ids) => {
  //   const queryParam = `names=${ids}`;
  //   try {
  //     const response = await fetch(`/api/reaction/tool?${queryParam}`);
  //     const data = await response.json();
  //     setUserReactions([]);
  //     setUserReactions(data);
  //     return data;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const fetchFilterPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `names=${isChecked.join(',')}&sort=${optionValue}&search=${searchText}&page=${filterPage}&pageSize=10`;
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
      setSearchTag(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      //final code
    }
  }
  
  const fetchSortPosts =  async() => {
    // Construct the query parameter using names optionValue,sortPage
    const queryParam = `status=${optionValue}&filter=${isChecked.join(',')}&search=${searchText}&page=${sortPage}&pageSize=10`;
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
      setSearchTag(false);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    //final code
  }
  }

  
  const fetchSearchPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `q=${searchText}&sort=${optionValue}&filter=${isChecked.join(',')}&page=${searchPage}&pageSize=10`;
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
      setSearchTag(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      //final code
    }
  }

  const fetchTagPosts = async () => {
    // Construct the query parameter using names
    const queryParam = `q=${tags}&page=${pageTag}&pageSize=10`;
    try {
      // Increment the page number for the next data fetch
      setPageTag((prevSortPage) => prevSortPage + 1)
      const response = await fetch(`/api/tool/tag?${queryParam}`);
      const data = await response.json();

      // Update the items state with the new data
      setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
        
      // Determine if there's more data to fetch
      if (data.length === 0) {
        setHasMore(false);
        setTags("")
      }

      setIsFilter(false);
      setIsSort(false);
      setSearchTimeout(false);
      setSearching(false);
      setSearchTag(true);

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
  useEffect(() => {
    if(tags != "")
    {
      (async () => {
        setSearchedResults([]);
        setHasMore(true);
        await fetchTagPosts();
      })();

    }
  }, [tags])
  
  // const handleTagClick = (tagName) => {
  //   setTags(tagName);
  //   setSearchTag(true);
  //   (async () => {
  //     setPageTag(1);
  //     setSearchedResults([]);
  //     setHasMore(true);
  //     await fetchTagPosts();
  //   })();

  //   // const searchResult = filterPrompts(tagName);
  //   // setSearchedResults(searchResult);
  // };
  return (
    <section className='feed'>
      <div className='inline-flex mb-5'>
      
        <Link href='/' className="text-white  bg-[#2B3A55] hover:bg-blue-900  hover:text-white focus:outline-none focus:ring-blue-300 font-bold rounded-md text-xs md:text-sm px-5 py-1 md:px-10 md:py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-3.5 h-3.5 md:w-5 md:h-5 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
            20,000+ Prompt
          </Link>
          <Link href='/ai-tool' className=" text-[#2B3A55] text-xs md:text-sm group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none focus:ring-blue-300 font-bold rounded-md  px-5 py-1 md:px-10 md:py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="w-3.5 h-3.5 md:w-5 md:h-5 mr-2 "  viewBox="0 0 24 24" fill="none" stroke="#2B3A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
              5000+ AI Tools
          </Link>

      </div>
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
        category={category}
        />
            
      </form>
      
      {/* All Prompts */}
      {isSort &&  (
        <ToolCardList
          data={searchedResults}
          setPageTag={setPageTag}
          hasMore = {hasMore}
          fetchPosts={fetchSortPosts}
          setTags={setTags}
          setSearchTag={setSearchTag}
          reactions={UserReactions}
          WishList = {UserWishList}
        />
      )}
      {isFilter && (
          <ToolCardList
            data={searchedResults}
            setPageTag={setPageTag}
            hasMore = {hasMore}
            fetchPosts={fetchFilterPosts}
            setTags={setTags}
            setSearchTag={setSearchTag}
            reactions={UserReactions}
            WishList = {UserWishList}
          />
      )}
      {searchTimeout && (
            <ToolCardList
              data={searchedResults}
              setPageTag={setPageTag}
              hasMore = {hasMore}
              fetchPosts={fetchSearchPosts}
              setTags={setTags}
              setSearchTag={setSearchTag}
              reactions={UserReactions}
              WishList = {UserWishList}
            />
      )}
      {searchTag && (
            <ToolCardList
              data={searchedResults}
              setPageTag={setPageTag}
              hasMore = {hasMore}
              fetchPosts={fetchTagPosts}
              setTags={setTags}
              setSearchTag={setSearchTag}
              reactions={UserReactions}
              WishList = {UserWishList}
            />
      )}
     { !isSort &&  !isFilter && !searchTimeout && !searchTag && (
        <ToolCardList 
        data={posts} 
        setPageTag={setPageTag}
        hasMore = {hasMore}
        fetchPosts={fetchPosts}
        setTags={setTags}
        setSearchTag={setSearchTag}
        reactions={UserReactions}
        WishList = {UserWishList}
        
        />
      )}

    </section>
  )
}

export default Tool