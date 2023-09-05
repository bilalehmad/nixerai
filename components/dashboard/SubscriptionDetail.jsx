'use client';

import {useState} from 'react';
import SubscriptionTable from './tables/SubscriptionTable';
import { usePathname, useRouter } from "next/navigation";

const SubscriptionDetail = ({data}) => {
    const [post, setPost] = useState(data)
    const pathName = usePathname();
    const router = useRouter();
    
    //{console.log(post)}
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Detail
                </th>
                <th scope="col" className="px-6 py-3">
                    Duration
                </th>
                <th scope="col" className="px-6 py-3">
                    Expire
                </th>
                {pathName !== '/profile/subscription' && (
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                )}
            </tr>
        </thead>
        <tbody>
        {data && data.map((post) => (
      <SubscriptionTable 
        key={post._id}
        post={post}
      />
      ))}
        </tbody>
    </table>
</div>
  )
}

export default SubscriptionDetail