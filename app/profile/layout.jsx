
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import ClientAside from '@components/profile/ClientAside';


const ProfileLayout = async ({ children }) => {

    const session = await getServerSession(authOptions);
    if(session?.user)
    {
      if (session?.user.role !== "client") {
        redirect(`/`)
      }
    }
    else{
        redirect('/')
    }
    return (
        <section className='w-full max-w-full flex justify-between '>
          <ClientAside />
          {children}
          </section>
    );
}
export default ProfileLayout;