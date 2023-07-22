import {useState,useEffect} from 'react'
import Modal from './Modal';

const FilterTool = ({isChecked,setIsChecked,isOpen,setIsOpen,setFilterPage}) => {
    
    const [posts, setPosts] = useState([]);
    const handleButton = (e) => {
        e.preventDefault();
        setIsOpen(true)
    }


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/category');
            const data = await response.json();

            setPosts(data);

        }
        console.log(posts)
        fetchPosts()
    },[]);

  return (
    <>    
        <div className='w-1/2 sm:w-[400px]'>
            <button onClick={handleButton} className='border border-gray-200  dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 active:border-gray-200 dark:active:border-gray-400 duration-300 active:text-white bg-white px-3 py-2 w-full flex item-center justify-center font-medium rounded-md tracking-wider'>
            <span className='mr-1'>Filter </span>
            <svg viewBox="0 0 512 512" className='dark:fill-white mt-1 ' height='14' width='14' xmlns="http://www.w3.org/2000/svg">
                <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"/>
            </svg>
        </button>
        </div>
    
        {isOpen && 
            <Modal 
            setIsOpen={setIsOpen}
            posts={posts} 
            setIsChecked = {setIsChecked}
            isChecked = {isChecked}
            setFilterPage = {setFilterPage}
            />
         }
    </>

  )
}

export default FilterTool