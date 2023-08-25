'use client';

import {useState} from 'react'
import PromptTable from './tables/PromptTable';
import PackageTable from './tables/PackageTable';


const PackageDetail = ({data}) => {
    const [post, setPost] = useState(data)
  return (
    <div>
    <div className='py-2'>
      <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 ">
      <svg viewBox="0 0 448 512"  className="w-4 h-4 fill-white text-white mr-1" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        Add Package
      </button>
    </div>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                      <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
              </th> */}
              <th scope="col" className="px-6 py-3">
                  Title
              </th>
              <th scope="col" className="px-6 py-3">
                  Detail
              </th>
              <th scope="col" className="px-6 py-3">
                  Amount
              </th>
              <th scope="col" className="px-6 py-3">
                  Action
              </th>
          </tr>
      </thead>
      
  <tbody>
  {data.map((post) => (
      <PackageTable 
        key={post._id}
        post={post}
      />
      ))}
      </tbody>
  </table>
</div>
</div>
  )
}

export default PackageDetail