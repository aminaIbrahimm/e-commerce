import React, { useEffect, useState } from 'react'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ColorRing } from 'react-loader-spinner'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  async function callApi() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        page: currentPage,
        limit: 20
      }
    })
  }
  let {data: productsRes, isLoading: productsLoading }= useQuery({
    queryKey: ["product" , currentPage],
    queryFn: callApi,
    keepPreviousData: true
  })
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  const totalPages = productsRes?.data?.metadata?.numberOfPages;
  const products = productsRes?.data?.data || [];

  return <>
  <MainSlider/>
  <CategoriesSlider/>
  {productsLoading ? (<div className="flex justify-center items-center h-screen">
         <ColorRing
           visible={true}
           height="80"
           width="80"
           ariaLabel="color-ring-loading"
           wrapperStyle={{}}
           wrapperClass="color-ring-wrapper"
           colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
         />
       </div>) : (<><DisplayProducts products={products} />
      <div className="flex justify-center items-center gap-4 mt-8 mb-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className='cursor-pointer bg-neutral-300 rounded py-1 px-3'
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className='cursor-pointer bg-neutral-300 rounded py-1 px-3'
        >
          Next
        </button>
      </div></>)}
  </>
}