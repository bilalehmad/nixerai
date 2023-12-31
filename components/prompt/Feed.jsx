'use client';

import {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import SearchFeed from './SearchFeed';
import PromptCardList from './PromptCardList';
import LoginModal from '@components/LoginModal';

const Feed =  ({data,category,reactions,tag,wishies,search,sort,filters}) => {
  // console.log(data)
  const [posts, setPosts] = useState(data)
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState(search);
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [optionValue, setOptionValue] = useState(null);
  const [sortBy, setSortBy] = useState(sort);
  const [isSort, setIsSort] = useState(false);
  const [page, setPage] = useState(2);
  const [sortPage, setSortPage] = useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const [searchPage, setSearchPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchTag, setSearchTag] = useState(false);
  const [pageTag, setPageTag] = useState(1);
  const [tags, setTags] = useState("");
  const [loginModal, setLoginModal] = useState(false)
  const [getReactions, setGetReactions] = useState(()=> {
    const result = reactions == true ? []: JSON.parse(reactions);
    return result;
  });
  const [wishing, setWishing] = useState(()=> {
      const result = wishies == true ? []: JSON.parse(wishies);
      return result;
    });
  const [UserReactions, setUserReactions] = useState(getReactions);
  const [UserWishList, setUserWishList] = useState(wishing);
  const router = useRouter();
  const searchParams = useSearchParams();
  // const firstfetch = props.data;
  // console.log(firstfetch)

  useEffect(() => {
    // Update the state when the data prop changes
    setHasMore(true);
    setPosts(data);
  }, [data]);

  useEffect(() => {
    // Update the state when the data prop changes
    const check = typeof filters
    if(check !== 'undefined')
    {
      const arr = filters.split(",");
      setIsChecked(arr);

    }
    else
    {
      setIsChecked([]);
    }
  }, [filters]);

  useEffect(() => {
    // Update the state when the data prop changes
    const check = typeof search
    if(check === 'undefined')
    {
      console.log(check)
      setSearchBy('undefined')

    }
    else
    {
      setSearchBy(search)
    }
  }, [search]);

  useEffect(() => {
    // Update the state when the data prop changes
    const check = typeof sort
    if(check === 'undefined')
    {
      setSortBy('undefined')

    }
    else
    {
      setSortBy(sort)
    }
  }, [sort]);

  // useEffect(() => {
    
  //   if (optionValue !== null) {
  //     router.push(`/?sort=${optionValue}`)
      // (async () => {
      //   //setSortPage(1);
        
      //   setSearchedResults([]);
      //   setHasMore(true);
      //   await fetchSortPosts();
      // })();
      //setSortPage(1);
     
  //   } 
  // }, [optionValue]);

  useEffect(() => {
    if(isOpen === false && isChecked.length > 0){
      setHasMore(true);
      const sort = searchParams.get('sort')
      const search = searchParams.get('search')
    //router.push(pathname + '?' + createQueryString('sort', optionText))
    if(sort == null && search != null)
    {
      router.push(`/?search=${search}&include=${isChecked.join(',')}`)
    }
    else if(sort != null && search == null)
    {
      router.push(`/?sort=${sort}&include=${isChecked.join(',')}`)
    }
    else if(sort != null && search != null)
    {
      router.push(`/?search=${search}&sort=${sort}&include=${isChecked.join(',')}`)
    }
    else
    {
      router.push(`/?include=${isChecked.join(',')}`)

    }
      // (async () => {
      //   setSearchedResults([]);
      //   setHasMore(true);
      //   await fetchFilterPosts();
      // })();
     
    } 
  }, [isOpen]);

  // useEffect(() => {
  //   if(searching === true){
  //     (async () => {
  //       setSearchedResults([]);
  //       setHasMore(true);
  //       await fetchSearchPosts();
  //     })();
     
  //   } 
  // }, [searching]);
  
  // useEffect(() => {
  //   (async () => {
  //     setHasMore(true);
  //     await fetchFirstPosts(firstfetch);
  //   })();
  // },[]);

  const fetchPosts = async () => {
    const queryParam = `search=${searchBy}&tag=${tag}&sort=${sortBy}&filter=${isChecked.join(',')}&page=${page}&pageSize=10`;
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
    setSearchTag(false)

  }
    
  // const fetchSortPosts =  async() => {
  //   // Construct the query parameter using names optionValue,sortPage
  //   const queryParam = `status=${optionValue}&filter=${isChecked.join(',')}&search=${searchText}&page=${sortPage}&pageSize=10`;
  //   setSortPage((prevSortPage) => prevSortPage + 1)
  //   try {
  //     const response = await fetch(`/api/prompt/sort?${queryParam}`)
  //     const data = await  response.json()
  //     //console.log(data);
  //     setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
  //     setIsSort(true);
  //     if(data.length === 0)
  //     {
  //       setHasMore(false);
  //     }
  //     setIsFilter(false);
  //     setIsSort(true);
  //     setSearchTimeout(false);
  //     setSearching(false);
  //     setSearchTag(false);

  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // } finally {
  //   //final code
  // }
  // }


  // const fetchFilterPosts = async () => {
  //   // Construct the query parameter using names
  //   const queryParam = `names=${isChecked.join(',')}&sort=${optionValue}&search=${searchText}&page=${filterPage}&pageSize=10`;
  //   // Increment the page number for the next data fetch
  //   try {
  //     setFilterPage((prevSortPage) => prevSortPage + 1)
  //     const response = await fetch(`/api/prompt/filter?${queryParam}`);
  //     const data = await response.json();
  //     //console.log(data)
  //     // Update the items state with the new data
  //     setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
        
  //     // Determine if there's more data to fetch
  //     if (data.length === 0) {
  //       setHasMore(false);
  //       }

  //     setIsFilter(true);
  //     setIsSort(false);
  //     setSearchTimeout(false);
  //     setSearching(false);
  //     setSearchTag(false)

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     //final code
  //   }
  // }

  // const fetchSearchPosts = async () => {
  //   // Construct the query parameter using names

  //   const queryParam = `q=${searchText}&sort=${optionValue}&filter=${isChecked.join(',')}&page=${searchPage}&pageSize=10`;
  //   try {
  //     // Increment the page number for the next data fetch
  //     setSearchPage((prevSortPage) => prevSortPage + 1)
  //     const response = await fetch(`/api/prompt/search?${queryParam}`);
  //     const data = await response.json();

  //     // Update the items state with the new data
  //     setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
        
  //     // Determine if there's more data to fetch
  //     if (data.length === 0) {
  //       setHasMore(false);
  //       setSearching(false);
  //     }

  //     setIsFilter(false);
  //     setIsSort(false);
  //     setSearchTimeout(true);
  //     setSearchTag(false)

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     //final code
  //   }
  // }

  // const fetchTagPosts = async () => {
  //   // Construct the query parameter using names
  //   const queryParam = `q=${tags}&page=${pageTag}&pageSize=10`;
  //   try {
  //     // Increment the page number for the next data fetch
  //     setPageTag((prevSortPage) => prevSortPage + 1)
  //     const response = await fetch(`/api/prompt/tag?${queryParam}`);
  //     const data = await response.json();

  //     // Update the items state with the new data
  //     setSearchedResults((prevPrompts) => [...prevPrompts, ...data]);
        
  //     // Determine if there's more data to fetch
  //     if (data.length === 0) {
  //       setHasMore(false);
  //       setTags("")
  //     }

  //     setIsFilter(false);
  //     setIsSort(false);
  //     setSearchTimeout(false);
  //     setSearching(false);
  //     setSearchTag(true)

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     //final code
  //   }
  // }

  // const filterPrompts = (searchtext) => {
  //   const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //   return posts.filter(
  //     (item) =>
  //       regex.test(item.creator.username) ||
  //       regex.test(item.tag) ||
  //       regex.test(item.teasor) 
  //   );
  // };

 

  // const handleTagClick = (tagName) => {
  //   setSearchText(tagName);

  //   const searchResult = filterPrompts(tagName);
  //   setSearchedResults(searchResult);
  // };
  return (
    <section className='feed'>
      
      <div className='inline-flex mb-5'>
      <Link href='/' className="text-[#2B3A55] group bg-gradient-to-br from-[#FF6F3C] to-amber-400  focus:outline-none  font-bold rounded-md text-xs md:text-sm px-5 py-1 md:px-10 md:py-2.5 text-center inline-flex items-center mr-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-3.5 h-3.5 md:w-5 md:h-5 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B3A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
          20,000+ Prompt
      </Link>
      {/* <Link href='/' className="text-white bg-[#F6635C] focus:outline-none  font-bold rounded-md text-xs md:text-sm px-5 py-1 md:px-10 md:py-2.5 text-center inline-flex items-center mr-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-3.5 h-3.5 md:w-5 md:h-5 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
          20,000+ Prompt
      </Link> */}
      <Link href='/ai-tool' className="text-white bg-[#2B3A55] hover:bg-blue-900 focus:outline-none font-bold rounded-md text-xs md:text-sm px-5 py-1 md:px-10 md:py-2.5 text-center inline-flex items-center  dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="w-3.5 h-3.5 md:w-5 md:h-5 mr-2"  viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
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
        category={category}
        setHasMore={setHasMore}
        />
            
      </form>
      {/* All Prompts */}
      {posts.length == 0 || posts == 'undefined' ? (
        <div className='h-[300px] flex items-center justify-center '>
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Record Not Found</p>
                <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find Result on your search. You'll find lots to explore on other filters. </p>
            </div>   
          </div>
        </div>
      ) : 
      <PromptCardList 
        data={posts} 
        hasMore = {hasMore}
        fetchPosts={fetchPosts}
        setTags={setTags}
        setSearchTag={setSearchTag}
        setPageTag={setPageTag}
        reactions={UserReactions}
        WishList = {UserWishList}
        setLoginModal={setLoginModal}
      />
    }
      {/* {isSort &&  (
        <PromptCardList
          data={searchedResults}
          hasMore = {hasMore}
          fetchPosts={fetchSortPosts}
          setTags={setTags}
          setSearchTag={setSearchTag}
          setPageTag={setPageTag}
          reactions={UserReactions}
          WishList = {UserWishList}
          setLoginModal={setLoginModal}
        />
      )} */}
      {/* {isFilter && (
          <PromptCardList
            data={searchedResults}
            hasMore = {hasMore}
            fetchPosts={fetchFilterPosts}
            setTags={setTags}
            setSearchTag={setSearchTag}
            setPageTag={setPageTag}
            reactions={UserReactions}
            WishList = {UserWishList}
            setLoginModal={setLoginModal}
          />
      )} */}
      {/* {searchTimeout && (
            <PromptCardList
              data={searchedResults}
              hasMore = {hasMore}
              fetchPosts={fetchSearchPosts}
              setTags={setTags}
              setSearchTag={setSearchTag}
              setPageTag={setPageTag}
              reactions={UserReactions}
              WishList = {UserWishList}
              setLoginModal={setLoginModal}
            />
      )} */}
      {/* {searchTag && (
            <PromptCardList
              data={searchedResults}
              setPageTag={setPageTag}
              hasMore = {hasMore}
              fetchPosts={fetchTagPosts}
              setTags={setTags}
              setSearchTag={setSearchTag}
              reactions={UserReactions}
              WishList = {UserWishList}
              setLoginModal={setLoginModal}
            />
      )} */}
      {/* {!isSort && !isFilter && !searchTimeout && !searchTag && (
        <PromptCardList 
        data={posts} 
        hasMore = {hasMore}
        fetchPosts={fetchPosts}
        setTags={setTags}
        setSearchTag={setSearchTag}
        setPageTag={setPageTag}
        reactions={UserReactions}
        WishList = {UserWishList}
        setLoginModal={setLoginModal}
      />
      
      )} */}

      
      {loginModal && (
        <LoginModal setLoginModal={setLoginModal} />
      )}
       {/* {isLoading && <div>Loading...</div>} */}
    </section>
    
  )
}

export default Feed