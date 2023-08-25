import ConfirmPakage from '@components/pricing/ConfirmPakage';

export const revalidate = 0;

const fetchPakage = async (pkgid) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pakages/${pkgid}`);
  const category = await response.json();
  return category;
}
const Pricing = async ({params}) => {
  const {id} = params;
  const data =  await fetchPakage(id);
  // console.log(data)
  return (
    <div className="antialiased w-full h-screen text-gray-400 font-inter p-10 mt-10">
    <div className="container px-4 mx-auto">
      <div>
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-4xl dark:text-white text-gray-700">Confirm Subscription</h1>
          <p className="text-light dark:text-gray-400 text-gray-500 text-xl">
            The Subscription details associated with the plan.
          </p>
        </div>
        <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8"
        >
            <ConfirmPakage data={data} />

          
            
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default Pricing