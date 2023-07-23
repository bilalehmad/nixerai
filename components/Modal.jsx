import React from 'react'

import { RiCloseLine } from "react-icons/ri";



const Modal = ({ setIsOpen , data , setIsChecked, setFilterPage, isChecked}) => {
    console.log(data)
    const posts = data;
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
  return (
    <div className="modal z-20" >
      <div className="modal-content w-[780px] rounded-none  border dark:border-gray-400">
            <div className='modalHeader flex justify-between px-5 dark:bg-[#1A202c] '>
                <h5 className='heading dark:text-gray-200'>Filter</h5>
                
                <RiCloseLine className='mt-4 cursor-pointer' onClick={() => setIsOpen(false)} />
            </div>
            
            <div className='modalContent h-60 bg-white dark:bg-[#1A202c] border dark:border-gray-400 dark:text-gray-200 ' >
                {setIsOpen && (
                    <div className='grid grid-cols-3 justify-center'>                      
                        {posts.map((item, i) => (
                            <div key={i} className='flex flex-wrap w-full px-5 py-1 justify-start'>
                                <input 
                                type='checkbox' 
                                value={item.name}
                                onChange={handleCheckboxChange}
                                checked={isChecked.includes(item.name)}
                                />
                                <h3 className='px-1'>{item.name}</h3>
                            </div>
                        ))}
                    </div>  
                )}
            </div>
            <div className='modalContent bg-white dark:bg-[#1A202c] '>
                <div className='flex justify-end items-center'>
                    <button className='deleteBtn text-[#2B3A55] group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none rounded-md' onClick={handleFilter}>
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