
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

const ViewPromptLayout = async ({ children}) => {

    return (
        <section className='w-full max-w-full flex justify-between mt-20 h-screen'>{children}</section>
    );
}
export default ViewPromptLayout;