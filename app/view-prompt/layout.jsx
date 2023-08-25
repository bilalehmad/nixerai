
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import Subscription from "@models/subscription";

const ViewPromptLayout = async ({ children}) => {

    const session = await getServerSession(authOptions);
    if(session?.user)
      {
        
        console.log("first")
        if (session?.user.subscriptionStatus == "Free") {
          console.log("second")
          redirect(`/pricing`)

        }
        else
        {
          if (session?.user.subscriptionStatus !== "Premium") {

            // const url = `${process.env.NEXTAUTH_URL}/api/subscription/${session?.user.id}`;
            // const response = await fetch(url);
            // const data = await response.json();
            const subscription = await Subscription.find({user: session?.user.id})
            //console.log(subscription)
            if(subscription.length === 0)
            {
              console.log("second")
              redirect('/pricing')
            }
            else
            {
              console.log("subscription is valid")
              const date = new Date();
              const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
              const today = new Date(date).toLocaleDateString('en-US', options);
              
              const expireAt = subscription[0].expireAt.toString();
              const expireDate = new Date(expireAt).toLocaleDateString('en-US', options);

              if( today >= expireDate)
              {
                redirect('/pricing')
              }
              
            }
          }
        }
      }
    return (
        <section className='w-full max-w-full flex justify-between mt-20'>{children}</section>
    );
}
export default ViewPromptLayout;