"use client";
import {useState,useEffect} from 'react'
import { useRouter } from "next/navigation";
import PriceCard from '@components/PriceCard';
const Pakages = ({data}) => {
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
                <div key={key} id="plan"
                className="rounded-lg border border-gray-300 text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
              >
                <div className="px-6 py-4 ">
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-100">{value.title}</p>
                        <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">${value.amount} <span className="text-base font-normal text-gray-600 dark:text-gray-400">/ {value.duration}</span></h4>
                        <p className="mt-4 text-gray-500 dark:text-gray-300">{value.detail}</p>
                        <PriceCard data={value.discription} />
                        
                        <button onClick={() => setChoosePlan(value._id)} className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Choose plan
                        </button>
                    </div>
              </div>
            ))}
    </>
  )
}

export default Pakages