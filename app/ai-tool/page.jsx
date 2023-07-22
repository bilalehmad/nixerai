import Tool from "@components/Tool";
import Link from 'next/link';


const fetchFirstPosts = async () => {
  const queryParam = `page=1&pageSize=10`;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tool?${queryParam}`);
    const data = await response.json();
  return data;
}

const AITool = async () => {
  var data = await fetchFirstPosts();
  var aiurl = `${process.env.NEXTAUTH_URL}/ai-tool`;
  return (
    <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Tools</span>
    </h1>
    <p className="desc text-center">
    Explore and Use the most Extensive Collection of  AI Tools
    </p>
    <div className='inline-flex my-5'>
      
      <Link href='/' className="text-white  bg-[#2B3A55] hover:bg-blue-900  hover:text-white focus:outline-none focus:ring-blue-300 font-bold rounded-sm text-sm px-10 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-5 h-5 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
          10,000+ Prompt
        </Link>
        <Link href={aiurl} className=" text-[#2B3A55] group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-pink-900 group-hover:to-orange-400 focus:outline-none focus:ring-blue-300 font-bold rounded-sm text-sm px-10 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="w-5 h-5 mr-2 "  viewBox="0 0 24 24" fill="none" stroke="#2B3A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
            5000+ AI Tools
        </Link>

      </div>
    <Tool data={data} />
</section>
  )
}

export default AITool