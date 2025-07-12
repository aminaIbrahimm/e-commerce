import React, { useEffect, useState } from 'react'
import Style from './Products.module.css'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import Login from '../Login/Login'
export default function Products() {
  const [search, setsearch] = useState("")
  const [filterproducts,setProducts] = useState([])
  const [isLoading,setisLoading] = useState(false)
  
  const filteredProducts = filterproducts.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase())
  );
 
  async function getProducts(){
    setisLoading(true)
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    console.log(data);
    setProducts(data.data) 
    setisLoading(false)
  }
  useEffect(()=>{
      getProducts()
    },[])
    if(isLoading){
      return <div className='flex justify-center items-center h-screen'>
        <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
    }
    console.log(filteredProducts);
    console.log(search);
    
    
  return <>
    <input type="search" id="default-search" value={search} onChange={(e) => setsearch(e.target.value)} class="block w-1/2 mx-auto p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
    <DisplayProducts filterproducts={filteredProducts} />
  </>
} 

// import React, { useState } from "react";

// export default function ProductSearch() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const products = [
//     { id: 1, name: "iPhone 13" },
//     { id: 2, name: "Samsung Galaxy" },
//     { id: 3, name: "Oppo Reno" },
//     { id: 4, name: "Realme 11 Pro" },
//   ];

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-5">
//          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" id="default-search" class="block w-1/2 mx-auto p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
//       <ul>
//         {filteredProducts.map((product) => (
//           <li key={product.id} className="py-1">
//             {product.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
