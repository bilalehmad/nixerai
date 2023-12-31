"use client";

import {useState,useEffect} from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Timestamp from '../others/Timestamp';

const PostArticle = ({content}) => {
const [post, setPost] = useState(content);

  return (
      <article  className="max-w-2xl px-6 py-24 mx-auto space-y-16 dark:bg-gray-800 dark:text-gray-50">
          <div className="w-full mx-auto space-y-4">
              <h1 className="text-5xl font-bold leadi">{post.title}</h1>
              <div className="flex flex-wrap space-x-2 text-sm dark:text-gray-400">
                  <a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#{post.tags}</a>
                  {/* <a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#TailwindCSS</a>
                  <a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#Angular</a> */}
              </div>
              <p className="text-sm dark:text-gray-400">by &nbsp;
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline dark:text-violet-400">
                      <span>{post.auther.username}</span>
                  </a>&nbsp;on&nbsp;
                  <Timestamp date={post.timestamps} />
              </p>
          </div>
          <div className="markdown prose w-full dark:prose-invert">
          <ReactMarkdown>{post.article}</ReactMarkdown>
          </div>
      </article>
  )
}

export default PostArticle