import React from 'react'
import Image from 'next/image'
import Placeholder from "@/Icons/imageicon/Placeholder";

const WebSnapshot = () => {
  return (
   <div className='border border-primary50 p-3 rounded-xl bg-white'>
     <div className='grid grid-cols-3 items-center justify-start gap-4'>
       {['', '', '', '', '', ''].map((_, idx) => (
       <div className='col-span-3 md:col-span-1' key={idx}>
           <Placeholder className="size-20" />
       </div>
       ))}
     </div>
   </div>
  )
};

export default WebSnapshot;
