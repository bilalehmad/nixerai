"use client";
import {useState,useEffect} from 'react';

const Timestamp = ({date}) => {
const [formattedDate, setFormattedDate] = useState(null)
    
useEffect(() => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    setFormattedDate(new Date(date).toLocaleDateString('en-US', options));
    console.log(formattedDate)
  }, [])
  return (
    <time dateTime={date}>{formattedDate}</time>
  )
}

export default Timestamp