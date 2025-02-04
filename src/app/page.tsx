'use client';
import JoinPage from '@/component/onboard/join';
import React from 'react'



const page = () => {


  return (
    <div className=" items-center justify-center">
      
      <JoinPage />
      
     
       </div>
  )
}

export default page




// 'use client';
// import JoinPage from '@/component/onboard/join';
// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// const page = () => {
//   const searchParams = useSearchParams(); 
//   const [id, setId] = useState<string | null>(null);
//   const [supplierId, setSupplierId] = useState<string | null>(null);

//   useEffect(() => {
//     const idParam = searchParams.get("id");
//     const supplierIdParam = searchParams.get("supplierId");

//     if (idParam) setId(idParam);
//     if (supplierIdParam) setSupplierId(supplierIdParam);
    
//     console.log("Retrieved Params:", { idParam, supplierIdParam });
//   }, [searchParams]);

//   return (
//     <div className="items-center justify-center">
//       <JoinPage />
//       {id ? (
//         <>
//           <p>ID: {id}</p>
//           <p>Supplier ID: {supplierId}</p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default page;
