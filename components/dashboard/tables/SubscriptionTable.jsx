import Timestamp from '@components/others/Timestamp'
import React from 'react'
import { usePathname, useRouter } from "next/navigation";

const SubscriptionTable = ({post}) => {
    const pathName = usePathname();
    const router = useRouter();
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    
    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img class="w-10 h-10 rounded-full" src={post.user.image} alt="Jese image" />
        <div class="pl-3">
            <div class="text-base font-semibold">{post.user.username}</div>
            <div class="font-normal text-gray-500">{post.user.email}</div>
        </div>  
    </th>
    <td class="px-6 py-4 capitalize">
    {post.package.duration}
    </td>
    <td class="px-6 py-4 capitalize">
    {post.package.title}
    </td>
    <td class="px-6 py-4 capitalize">
        <Timestamp date={post.start_timestamps} />
    </td>
    <td class="px-6 py-4">
        <div class="flex items-center">
            {/* <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> */}
            <Timestamp date={post.end_timestamps} />
        </div>
    </td>
    
    {pathName !== '/profile/subscription' && (
        <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
    )}
</tr>
  )
}

export default SubscriptionTable