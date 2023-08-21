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
        <Head>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
        {/* <Image src="/assets/images/favicon.ico" alt="me" width="64" height="64" /> */}
        {/* <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />

    <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="/favicons/apple-touch-icon-167x167.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />

    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="128x128" href="/favicons/favicon-128x128.png" />
    <link rel="icon" type="image/png" sizes="196x196" href="/favicons/favicon-196x196.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png" />

    <link rel="shortcut icon" href="/favicons/favicon.ico" /> */}
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