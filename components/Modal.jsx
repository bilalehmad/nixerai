"use client";
import {useState,useEffect} from 'react'

import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen , data , setIsChecked, setFilterPage, isChecked}) => {
    const [searchTimeout, setSearchTimeout] = useState("");
    const [searchtext, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [posts, setPosts] = useState(data);
    // const posts = data;
    const groupedCategory = posts.reduce((groups, category) => {
        const letter = category.name[0].toUpperCase();
        if (!groups[letter]) {
          groups[letter] = [];
        }
        groups[letter].push(category);
        return groups;
      }, {});

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setIsChecked((prevSelected) => [...prevSelected, checkboxValue]);
        } else {
            setIsChecked((prevSelected) =>
            prevSelected.filter((value) => value !== checkboxValue)
        );
        }
    };
    const handleFilter = () => {
        console.log('Selected checkboxes:', isChecked);

        if(isChecked.length > 0)
        {
            setFilterPage(1);
            setIsOpen(false);
        }
    }

    useEffect(() => {
      if(searchedResults.length > 0)
      {
        const groupedCategory = searchedResults.reduce((groups, category) => {
            const letter = category.name[0].toUpperCase();
            if (!groups[letter]) {
                groups[letter] = [];
            }
            groups[letter].push(category);
            return groups;
            }, {});
            setFiltered(groupedCategory)
      }
    }, [searchedResults])
    
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) => regex.test(item.name))
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // debounce method
    const searchResult = filterPrompts(searchtext);
    setSearchedResults(searchResult);
  };
  return (
    <div className="modal z-50" >
      <div className="modal-content w-[780px]  rounded-none  border dark:border-gray-400">
            <div className='modalHeader flex justify-between px-5 dark:bg-[#1A202c] '>
                <h5 className='heading dark:text-gray-200'>Filter</h5>
                
                <RiCloseLine className='mt-4 cursor-pointer' onClick={() => setIsOpen(false)} />
            </div>
            
            <div className='modalContent h-80 overflow-auto bg-white dark:bg-[#1A202c] border dark:border-gray-400 dark:text-gray-200 ' >
                {setIsOpen && (
                    <>
                    <div className="w-full flex justify-center -order-1 md:order-none mb-2 sm:mb-0">
                        <label htmlFor="default-search" className=" text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative w-1/2 border border-gray-200  dark:border-gray-400 rounded-md">
                            <input type="search"
                            onKeyUp={handleSearchChange}
                            className="block w-full p-1.5 pl-10 text-sm text-gray-900 rounded-md focus:outline-none  bg-white dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white " placeholder="Search From Them..." required />
                            
                        </div>
                    </div> 
                    <div className='grid grid-cols-2 justify-center mt-4'> 
                                                        
                        {filtered && searchtext && (data.map((value) => (
                            
                            <div key={value._id} className='flex flex-wrap w-full px-5 py-1 justify-start'>  
                                <input 
                                type='checkbox' 
                                value={value.name}
                                onChange={handleCheckboxChange}
                                checked={isChecked.includes(value.name)}
                                />
                                <h3 className='px-1'>{value.name}</h3>
                                    {/* display other user info here */}
                            </div>
                        )))}
                        
                        {!searchtext && (data.map((value) => (
                                <div key={value._id} className='inline-flex w-full px-5 py-1 justify-start'>
                                    
                                <input 
                                type='checkbox' 
                                value={value.name}
                                onChange={handleCheckboxChange}
                                checked={isChecked.includes(value.name)}
                                />
                                <h3 className='px-1'>{value.name}</h3>
                                    {/* display other user info here */}
                                    </div>
                        )))}
                    </div>  
                    </>
                )}
            </div>
            <div className='modalContent bg-white dark:bg-[#1A202c] '>
                <div className='z-10 flex justify-end items-center'>
                    <button className='deleteBtn text-[#2B3A55] bg-gradient-to-br from-[#FF6F3C] to-amber-400 focus:outline-none rounded-md' onClick={handleFilter}>
                    Apply Filter
                    </button>
                    {/* <button
                        className='cancelBtn'
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button> */}
                </div>
            </div>
            
            </div>
        </div>
  );
};

export default Modal;