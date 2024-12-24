// // https://dummyjson.com/products
// import { useMutation, useQuery } from "@tanstack/react-query";

// // interface Data  {
// // identifier:string,
// // page:number,
// // limit:number
// // }


// // const fetchData = async({ identifier, page=1, limit=10 }: Data)=> {
// //     const res = await fetch(`https://hie.world/api/v1/catalog/get-list-by-store-identifier?storeIdentifier=${identifier}&pageNo=${page}&limit=${limit}`)

// //     if (!res.ok) {
// //         throw new Error("Failed to fetch data");
// //       }

// //     const data = await res.json();
// //     return data;
// // }


// // export const useFetchApi = (params:Data)=> {
// //     const {data, isLoading, isError}= useQuery({
// //         queryKey:['api', params],
// //         queryFn:()=> fetchData(params)
// //     })

// //     return {
// //         data,
// //         isLoading,
// //         isError
// //     }
// // }



// const token =''

// const fetchpostData = async ({body}:any)=> {
//     const res = await fetch('https://dummyjson.com/posts/add', {
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json',
//             // Authorization: `Bearer ${token}`
//         },
//         body:JSON.stringify(body)
//     })

//     if(!res.ok){
//         throw new Error('Failed')
//     }

//     const data = await res.json()
//     console.log("datra", data)
//     return data;
// }

// export const usePostApi = ()=>{
//     const mutation = useMutation((body)=> fetchpostData(body))

//     return {
//         ...mutation,
//         postData:mutation.mutate,
//         datas:mutation.data
//     }
// }










// const useAllProductList = () => {
//     const AllProduct = async () => {
//         const response = await fetch('https://dummyjson.com/products');
//         const data = await response.json();
//         return data?.products;
//     }

//     const {data, isLoading, isError}= useQuery({
//         queryKey:['product'],
//         queryFn:AllProduct
//     })

//     return {
//         data, isLoading, isError
//     }
// }

// export default useAllProductList