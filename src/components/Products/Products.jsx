import React, { useEffect, useRef, useState } from 'react'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import { FaAngleDown } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
  const [search, setsearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);
  
  async function getCategory(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  async function getBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  async function callApi() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        page: currentPage,
        limit: 20,
        keyword: search || undefined,
        category: selectedCategory || undefined,
        brand: selectedBrand || undefined,
      }
    })
  }
  let {data: productsRes, isLoading: productsLoading }= useQuery({
    queryKey: ["product" , currentPage, search, selectedCategory, selectedBrand],
    queryFn: callApi,
    keepPreviousData: true
  })
  let {data: categoriesRes }= useQuery({
    queryKey: ["category"],
    queryFn: getCategory
  })
  let {data: brandsRes}= useQuery({
    queryKey: ["brand"],
    queryFn: getBrands
  })
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedBrand]);
  

  const products = productsRes?.data?.data || [];
  const categories = categoriesRes?.data?.data || [];
  const brands = brandsRes?.data?.data || [];
  //   const matchesSearch =
  //     !search ||
  //     product.title.toLowerCase().includes(search.toLowerCase());
  
  //   const matchesCategory =
  //     !selectedCategory || product.category?._id === selectedCategory;
  
  //   const matchesBrand =
  //     !selectedBrand || product.brand?._id === selectedBrand;
  
  //   return matchesSearch && matchesCategory && matchesBrand;
  // });

  const totalPages = productsRes?.data?.metadata?.numberOfPages;

  if (productsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <>
      <input
        type="search"
        id="default-search"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="block w-[80%] md:w-1/2 mx-auto p-4 ps-10 mt-30 md:mt-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-green-500"
        placeholder="Search..."
        aria-label="Search products"
      />
      <div className='flex justify-end items-center gap-5 my-5 mx-5'>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(dropdownOpen === "category" ? null : "category")}
            className="flex  items-center gap-1 font-semibold cursor-pointer hover:text-green-700"
            aria-expanded={dropdownOpen === "category"}
            aria-label="Toggle category dropdown"
          >
            Category
            <FaAngleDown className='text-sm ms-1'/>
          </button>

          {dropdownOpen === "category" && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                {categories.map((cat) => (
                  <button key={cat._id} onClick={() => {setSelectedCategory(cat._id) ; setSelectedBrand(null) ; setDropdownOpen(null)}} 
                  className={`block px-5 py-1 cursor-pointer hover:text-green-700 ${selectedCategory === cat._id ? "text-green-700" : ""}`}
                  aria-label={`Select category ${cat.name}`}
                  >
                    
                    {cat.name}
                  </button>
                  
                ))}
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedBrand(null);setDropdownOpen(null)}}
                  className="px-4 py-1 mx-2 mb-2 rounded  cursor-pointer text-red-400 "
                >
                  Clear Filters
                </button>

            </div>
            )}
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(dropdownOpen === "brand" ? null : "brand")}
            className="flex  items-center gap-1 font-semibold cursor-pointer hover:text-green-700"
            aria-expanded={dropdownOpen === "brand"}
            aria-label="Toggle brand dropdown"
          >
            Brand
            <FaAngleDown className='text-sm ms-1'/>
          </button>
          {dropdownOpen === "brand" && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                {brands.map((bra) => (
                  <button key={bra._id} onClick={() => {setSelectedBrand(bra._id) ;setSelectedCategory(null); setDropdownOpen(null)}} 
                  className={`block px-5 py-1 cursor-pointer hover:text-green-700 ${selectedBrand === bra._id ? "text-green-700" : ""}`}
                  aria-label={`Select brand ${bra.name}`}>
                    {bra.name}
                  </button>
                ))}
                <button
                  onClick={() => {setSelectedBrand(null); setSelectedCategory(null); setDropdownOpen(null)}}
                  className="px-4 py-1 mx-2 mb-2 rounded  cursor-pointer text-red-400 "
                >
                  Clear Filters
                </button>
            </div>
            )}
        </div>
      </div>
      <DisplayProducts products={products} />
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
      </div>
    </>
  );
} 

