import { useQuery } from "@tanstack/react-query";

const allProductList = async () => {
    const response = await fetch('https://fakestoreapi.com/products', {
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    })

    if(!response.ok){
        console.log("error occured")
    }

    const data = response.json();
    return data
}

export const useAllProductList = ()=>{
    const {data, isLoading, isError} = useQuery({
        queryKey: ['posts'],
        queryFn: allProductList,
    });

    return {
        data, isLoading,isError
    }
}