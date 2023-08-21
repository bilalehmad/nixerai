
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

const ViewPromptLayout = async ({ children }) => {

    const session = await getServerSession(authOptions);
    
    
    if(session?.user)
      {
        if (session?.user.subscriptionStatus == "Free") {
          redirect(`/pricing`)
        }
        else
        {
          const url = `${process.env.NEXTAUTH_URL}/api/subscription/${session?.user.id}`;
          const response = await fetch(url);
          const data = await response.json();
          if(data.length === 0)
          {
            redirect('/pricing')
          }
          else
          {
            const date = new Date();
            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            const today = new Date(date).toLocaleDateString('en-US', options);
            
            const startDate = data[0].start_timestamps.toString();
            const endDate = data[0].end_timestamps.toString();
            const fromodate = new Date(startDate).toLocaleDateString('en-US', options);
            const todate = new Date(endDate).toLocaleDateString('en-US', options);
            console.log(fromodate,todate,today)
            if(fromodate >= today && today <= todate)
            {
              console.log("Subscribtion is valid!!");
            }
            else
            {
              redirect('/pricing')
            }
          }
        }
      }
      else{
          redirect('/')
      }
    return (
        <section className='w-full max-w-full flex justify-between mt-20'>{children}</section>
    );
}
export default ViewPromptLayout;