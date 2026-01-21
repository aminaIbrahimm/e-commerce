import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';

 function FilterProducts({setSelectedBrand , setSelectedCategory ,selectedBrand , selectedCategory}) {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRef = useRef(null);

    async function getCategory(){
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCategories(data.data)
      }
    async function getBrands(){
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      setBrands(data.data)
    }
    useEffect(() => {
      getCategory()
      getBrands()
    }, []);



    console.log("filter");
  return (
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
  )
}

export default React.memo (FilterProducts)