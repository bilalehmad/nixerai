import SubscriptionDetail from '@components/dashboard/SubscriptionDetail';
import { connectToDB } from "@utils/database";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import Bundle from '@models/bundle';


const fetchMySubscription = async () =>{

    const session = await getServerSession(authOptions);
    if (!session) return true;
    try {
        if (session?.user.subscriptionStatus == "Free") 
        {
            await connectToDB();
            const subscrip = await Bundle.find({_id : new ObjectId("64de02d467350c3109c57e9f") })
            console.log(subscrip)
            const data = [
                {
                    "_id":"64e761c8295c74e313623799",
                    "user": session?.user,
                    "end_timestamps": "2023-09-15T19:00:00.000Z",
                    "start_timestamps": "2023-08-15T19:00:00.000Z",
                    "status": "Active",
                    "package": subscrip[0]
                  }
            ];
            return data;
        }
        else
        {
            const url = `${process.env.NEXTAUTH_URL}/api/subscription/${session?.user.id}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
      
    } catch (error) {
        return error;
    }
  }
const MySubscription = async () => {
 const data = await fetchMySubscription();
  return (
    <div className='p-4 sm:ml-64 w-full h-screen'>
        <h1 className='short_head text-left'>
            <span className='amber_gradient'>Subscription</span>
        </h1>
        <p className='short_desc text-left'></p>
        
        <SubscriptionDetail data= {data} />

    </div>
  )
}

export default MySubscription