
import '@styles/globals.css';

import Provider from "@components/Provider"
import Sidebar from "@components/Sidebar"
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';

export const metadata = {
    title: "NixerAI",
    description: "Discover & Share AI Prompts"
}

const fetchFirstPosts = async () => {
    const queryParam = `page=1&pageSize=10`;
  
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt?${queryParam}`);
    const posts = await response.json();
    return posts;
  }
  
  const fetchCategory = async () => {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/category`);
        const category = await response.json();
        return category;
    }
  
const RootLayout = async ({children}) => {
    // const data =  await fetchFirstPosts();
    // const category = await fetchCategory();
    // console.log(data)

  return (
    <html>
        <body>
            <Provider>
                <div className='main'>  
                    <div className='gradient' />
                </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                    <Footer />
                    
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout