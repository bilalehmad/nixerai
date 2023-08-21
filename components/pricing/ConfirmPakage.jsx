"use client";
import {useState,useEffect} from 'react'
import { useRouter } from "next/navigation";
import PriceCard from '@components/pricing/PriceCard';
import SummaryCard from './SummaryCard';
const ConfirmPakage = ({data}) => {
    const [pricing, setPricing] = useState(data)
    const [choosePlan, setChoosePlan] = useState("")
      const router = useRouter();


    useEffect(() => {
      if(choosePlan)
      {
        router.push(`/pricing/${choosePlan}`)

      }
      
    }, [choosePlan])
    
  return (
    <>
    {pricing && pricing.map((value,key) => (
      <>
      
                <SummaryCard  data={value.discription}/>
                
    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 dark:bg-gray-800 space-y-6">
    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Pricing</h3>
    <div className="flex justify-between items-start w-full">
      <div className="flex justify-center items-center space-x-4">
        {/* <div className="w-8 h-8">
          <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
        </div> */}
        <div className="flex flex-col justify-start items-center">
          <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">{value.title}<br />
          <span className="font-normal dark:text-gray-400">{value.detail}</span></p>
        </div>
      </div>
      <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">${value.amount}/{value.duration}</p>
    </div>
    <div className="w-full flex justify-center items-center">
      <button className=" rounded-md hover:bg-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Procced To Payment</button>
    </div>
  </div>
              </>
            ))}
    </>
  )
}

export default ConfirmPakage