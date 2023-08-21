
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import Aside from '@components/dashboard/Aside'

const DashboardLayout = async ({ children }) => {

    const session = await getServerSession(authOptions);
    if(session?.user)
    {
      if (session?.user.role !== "admin") {
        redirect(`/`)
      }
    }
    else{
        redirect('/')
    }
    return (
        <section className='w-full max-w-full flex justify-between '>
          <Aside />
          {children}
          </section>
    );
}
export default DashboardLayout;