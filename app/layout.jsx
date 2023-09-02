import Head from 'next/head';
import '@styles/globals.css';
import Provider from "@components/Provider"
import Sidebar from "@components/Sidebar"
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import Image from 'next/image'
import Script from 'next/script';

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
                        
                    <Script
                    strategy='afterInteractive'
                    src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <Script id='google-analytics' strategy='afterInteractive'>
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                    `}
                    </Script>

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