import Head from 'next/head';
import '@styles/globals.css';
import Provider from "@components/Provider"
import Sidebar from "@components/Sidebar"
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import Image from 'next/image'

export const metadata = {
    title: "NixerAI",
    description: "Discover & Share AI Prompts"
}

const RootLayout = async ({children}) => {
    // const data =  await fetchFirstPosts();
    // const category = await fetchCategory();
    // console.log(data)
  return (
    <html>
        <Head>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
        </Head>
        <body>
            <Provider>
                <div className='main'>  
                    <div className='gradient' />
                </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                        <Footer />
                    </main>
                    
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout