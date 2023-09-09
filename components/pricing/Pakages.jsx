"use client";
import {useState,useEffect} from 'react'
import { useRouter } from "next/navigation";
import PriceCard from '@components/pricing/PriceCard';
const Pakages = ({data}) => {
    const [pricing, setPricing] = useState(data)
    const [choosePlan, setChoosePlan] = useState("")
      const router = useRouter();


    // useEffect(() => {
    //   if(choosePlan)
    //   {
    //     router.push(`/pricing/${choosePlan}`)

    //   }
      
    // }, [choosePlan])
    
  return (
    <>
    {pricing && pricing.map((value,key) => (
                <div key={key} id="plan"
                className={`rounded-lg border ${value.highlight === 'TRUE' ? ("bg-gray-700 dark:bg-blue-950") : ("bg-white dark:bg-[#2B3A55]")}  border-gray-300 dark:border-none text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in`}
              >
                <div className="px-6 py-4 ">
                        <p className={`text-lg font-medium  ${value.highlight === 'TRUE' ? ("text-gray-50") : ("text-gray-800")}  dark:text-gray-100`}>{value.title}</p>
                        <h4 className={`mt-2 text-4xl ${value.highlight === 'TRUE' ? ("text-gray-50") : ("text-gray-800")} font-semibold dark:text-gray-50`}>${value.amount} <span className={`text-base font-normal  ${value.highlight === 'TRUE' ? ("text-gray-50") : ("text-gray-600")}  dark:text-gray-50`}>/ {value.duration}</span></h4>
                        <p className={`mt-4 text-sm ${value.highlight === 'TRUE' ? ("text-gray-50") : ("text-gray-500")}   dark:text-gray-200`}>{value.detail}</p>
                        <div className='rounded-lg mt-4'>
                        <PriceCard data={value.discription} short={value.short} highlight={value.highlight} />
                        </div>
                       
                        {value.title !== "Free" && (
                        <button onClick={() => setChoosePlan(value._id)} className={`w-full px-4 py-2 mt-10 ${value.highlight === "TRUE" ? ("text-gray-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-50 ") : ("text-white bg-gray-800")}  dark:bg-gray-700 focus:outline-none  font-bold rounded-md text-sm md:px-10 md:py-2.5 text-center items-center mr-2 `}>
                            Subscribe
                        </button>

                        )}
                    </div>
              </div>
            ))}
    </>
  )
}

export default Pakages