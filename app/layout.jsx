
import '@styles/globals.css';

import Provider from "@components/Provider"
import Sidebar from "@components/Sidebar"

export const metadata = {
    title: "NixerAI",
    description: "Discover & Share AI Prompts"
}
const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <Provider>
                <div className='main'>  
                    <div className='gradient' />
                </div>
                    <main className='app'>
                        <Sidebar />
                        {children}
                    </main>
                    
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout