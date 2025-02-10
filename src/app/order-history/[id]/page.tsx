// import OrderDetailsSingle from '@/component/OrderHistory/orderHistorySingle'
// import React from 'react'

// const page = () => {
//   return (
//     <div><OrderDetailsSingle /> </div>
//   )
// }

// export default page
"use client"
import React from 'react';
import OrderDetailsSingle from '@/component/OrderHistory/orderHistorySingle';
import { useParams } from 'next/navigation';

const Page = () => {
  const { orderId } = useParams();
  return (
    <div>
      <OrderDetailsSingle  />
    </div>
  );
};

export default Page;
