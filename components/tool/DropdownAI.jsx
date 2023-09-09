import {useEffect, useState} from 'react'
import {AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const options = [
    {
      value: 'verified',
      label: 'Verified',
      icon: (
            <svg fill="#2B3A55" height="20" className='dark:fill-white' viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M6.26701 3.45496C6.91008 3.40364 7.52057 3.15077 8.01158 2.73234C9.15738 1.75589 10.8426 1.75589 11.9884 2.73234C12.4794 3.15077 13.0899 3.40364 13.733 3.45496C15.2336 3.57471 16.4253 4.76636 16.545 6.26701C16.5964 6.91008 16.8492 7.52057 17.2677 8.01158C18.2441 9.15738 18.2441 10.8426 17.2677 11.9884C16.8492 12.4794 16.5964 13.0899 16.545 13.733C16.4253 15.2336 15.2336 16.4253 13.733 16.545C13.0899 16.5964 12.4794 16.8492 11.9884 17.2677C10.8426 18.2441 9.15738 18.2441 8.01158 17.2677C7.52057 16.8492 6.91008 16.5964 6.26701 16.545C4.76636 16.4253 3.57471 15.2336 3.45496 13.733C3.40364 13.0899 3.15077 12.4794 2.73234 11.9884C1.75589 10.8426 1.75589 9.15738 2.73234 8.01158C3.15077 7.52057 3.40364 6.91008 3.45496 6.26701C3.57471 4.76636 4.76636 3.57471 6.26701 3.45496ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill-rule="evenodd"/>
            </svg>
      ),
    },
    {
      value: 'new',
      label: 'New',
      icon: (
        <svg height="20" fill="#2B3A55" className='dark:fill-white' viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h48v48H0z" fill="none"/><path d="M46 24l-4.88-5.56.68-7.37-7.22-1.63-3.78-6.36L24 6l-6.8-2.92-3.78 6.36-7.22 1.63.68 7.37L2 24l4.88 5.56-.68 7.37 7.22 1.63 3.78 6.36L24 42l6.8 2.92 3.78-6.36 7.22-1.63-.68-7.37L46 24zM26 34h-4v-4h4v4zm0-8h-4V14h4v12z"/>
            </svg>      
            ),
    },
    {
        value: 'popular',
        label: 'Popular',
        icon: (
            <svg height="20" fill="#2B3A55" width="20" className='dark:fill-white' viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M384 319.1C384 425.9 297.9 512 192 512s-192-86.13-192-192c0-58.67 27.82-106.8 54.57-134.1C69.54 169.3 96 179.8 96 201.5v85.5c0 35.17 27.97 64.5 63.16 64.94C194.9 352.5 224 323.6 224 288c0-88-175.1-96.12-52.15-277.2c13.5-19.72 44.15-10.77 44.15 13.03C215.1 127 384 149.7 384 319.1z"/>
            </svg>              ),
      },
  ];

const DropdownAI = ({optionValue,setHasMore, setOptionValue,setSortPage}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [optionImage, setOptionImage] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    

    const handleButton = (e) => {
        e.preventDefault();
        setIsOpen((prev) => !prev)
    }

    const handleOptionSelect = (optionText,image) => {
        setOptionValue(optionText);
        setSortPage(1);
        setOptionImage(image);
        //alert(`Selected option: ${optionText}`);
        setIsOpen((prev) => !prev)
        setHasMore(true)
        //router.push(pathname + '?' + createQueryString('sort', optionText))
        //router.push(`/?sort=${optionText}`)
        const search = searchParams.get('search')
        const checkFilter = searchParams.get('include')  == null ? false : searchParams.get('include').split(',')    
        const checkValidFilter = checkFilter.length > 0 ? checkFilter.includes('undefined') || checkFilter.includes('') ? false : true : false;
        console.log(searchParams.get("include"),checkValidFilter,search )
        //router.push(pathname + '?' + createQueryString('sort', optionText))
        if(checkValidFilter == true && search == null)
        {
          const filter = searchParams.get("include")|| [];
          router.push(`/ai-tool?sort=${optionText}&include=${filter}`)
        }
        else if(search != null && checkValidFilter == false)
        {
            router.push(`/ai-tool?search=${search}&sort=${optionText}`)
        }
        else if(checkValidFilter == true && search != null)
        {
          const filter = searchParams.get("include")|| [];
          router.push(`/ai-tool?search=${search}&sort=${optionText}&include=${filter}`)
        }
        else
        {
          router.push(`/ai-tool?sort=${optionText}`)
    
        }
      };

  return (
    <div className='relative flex flex-col items-center w-1/2 sm:w-[400px] rounded-sm'>
        <button onClick={handleButton} className='border border-gray-200  dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 active:border-gray-200 dark:active:border-gray-400 duration-300 active:text-white bg-white p-1 md:p-2 w-full flex item-center justify-between font-medium rounded-md tracking-wider'>
        
         {optionValue ? (<span className='flex justify-start'> <span className='px-1'>{optionImage}</span> {optionValue}</span>) : ('Sort By')}
        {isOpen ? (
            <AiOutlineCaretDown className='h-4' />
        ):(
            <AiOutlineCaretUp className='h-4' />
        )}
        </button>
        {isOpen && (
            <div className='bg-white absolute z-20 border-2 border-gray-200  text-gray-800 top-11 flex flex-col items-center rounded-lg p-2 w-full dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700'>
                {options.map((item, i) => (
                    <div key={i} className='flex w-full py-1 justify-start hover:bg-gray-200 dark:hover:bg-gray-400 cursor-pointer rounded-md' onClick={() => handleOptionSelect(item.label,item.icon)}>
                        <h3 className='px-1'>{item.icon}</h3>
                        <h3 className='px-1 text-sm font-bold text-gray-800 dark:text-white '>{item.label}</h3>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default DropdownAI