"use client";

import {useEffect, useState} from 'react';
import ToolCard from './ToolCard';
import Link from 'next/link';

const ToolCardList = ({data, handleTagClick}) => {
  
    const [isOpen, setIsOpen] = useState(false);
    const [youtubeURL, setYoutubeURL] = useState(null)
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
      <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
    )
  }

const Tool = () => {
    
  const [posts, setPosts] = useState([])
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/tool');
      const data = await response.json();

      setPosts(data);

    }
    console.log(posts)
    fetchPosts()
  },[]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.title) ||
        regex.test(item.description) 
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  return (
    <section className='feed'>
        <div className='inline-flex mb-5'>
      
      <Link href='/' className="text-white  bg-[#2B3A55] hover:bg-blue-900  hover:text-white focus:outline-none focus:ring-blue-300 font-bold rounded-sm text-sm px-10 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-5 h-5 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
          10,000+ Prompt
        </Link>
        <Link href='/ai-tool' className=" text-[#2B3A55] group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none focus:ring-blue-300 font-bold rounded-sm text-sm px-10 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="w-5 h-5 mr-2 "  viewBox="0 0 24 24" fill="none" stroke="#2B3A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
            5000+ AI Tools
        </Link>

      </div>
      <form className="relative w-full flex-center">
        <input 
        type="text" 
        placeholder='Search for tag or a prompt'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>
      
      {/* All Prompts */}
      {searchText ? (
        <ToolCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ToolCardList data={posts} handleTagClick={handleTagClick} />
      )}

    </section>
  )
}

export default Tool