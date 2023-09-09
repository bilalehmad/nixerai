import { useEffect, useState } from "react";
import FilterTool from "./FilterTool";
import DropdownAI from "./DropdownAI";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SearchTool = ({category,setHasMore,setSearching, setSearchPage, setSortPage, setSearchText,isChecked,setIsChecked,isOpen,setIsOpen,setFilterPage,optionValue, setOptionValue}) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearchInputChange =(e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setText(e.target.value)
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchPage(1);
    setSearching(true);

    setHasMore(true);
    const search = searchParams.get('sort')
    const checkFilter = searchParams.get('include')  == null ? false : searchParams.get('include').split(',')    
    const checkValidFilter = checkFilter.length > 0 ? checkFilter.includes('undefined') || checkFilter.includes('') ? false : true : false;
    console.log(searchParams.get("include"),checkValidFilter,search )
    //router.push(pathname + '?' + createQueryString('sort', optionText))
    if(checkValidFilter == true && search == null)
    {
      const filter = searchParams.get("include")|| [];
      router.push(`/ai-tool?search=${text}&include=${filter}`)
    }
    else if(search != null && checkValidFilter == false)
    {
      router.push(`/ai-tool?search=${text}&sort=${search}`)
    }
    else if(checkValidFilter == true && search != null)
    {
      const filter = searchParams.get("include")|| [];
      router.push(`/ai-tool?search=${text}&sort=${search}&include=${filter}`)
    }
    else
    {
      router.push(`/ai-tool?search=${text}`)

    }
  };
  return (
    
    <div className="flex flex-wrap sm:flex-nowrap grid-col-3 justify-evenly w-full ">

      <FilterTool 
        isChecked = {isChecked} 
        setIsChecked = {setIsChecked} 
        isOpen = {isOpen}
        setIsOpen = {setIsOpen}
        setFilterPage={setFilterPage}
        category={category}
        />
      
      {/* <input 
        type="text" 
        placeholder='Search for tag or a prompt'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer -order-1 md:order-none'
      /> */}
      <div className="w-full -order-1 md:order-none mb-2 sm:mb-0">
          <label htmlFor="default-search" className=" text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative border border-gray-200  dark:border-gray-400 rounded-md">
              <input type="search" onChange={handleSearchInputChange} className="block w-full p-1.5 md:p-2.5 pl-10 text-sm text-gray-900 rounded-md focus:outline-none  bg-white dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white " placeholder="Search for Prompts..." required />
              
              <button 
              onClick={handleSearchChange}
              className="absolute top-0 right-0 p-1.5 md:p-2.5 text-sm font-medium text-white bg-gray-700 rounded-r-md border-l border-gray-200  dark:border-gray-400 hover:bg-gray-200 focus:outline-none  dark:bg-[#2B3A55] dark:hover:bg-blue-700 "
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>          </div>
        </div>
        <DropdownAI
        optionValue = {optionValue}
        setOptionValue = {setOptionValue}
        setSortPage = {setSortPage}
        setHasMore={setHasMore}
        />
    </div>
  );
};

export default SearchTool;
