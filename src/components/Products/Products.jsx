import React, { useEffect, useRef, useState } from 'react'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'

export default function Products() {
  const [search, setsearch] = useState("");
  const [filterproducts, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const filteredProducts = filterproducts.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(search.toLowerCase()) ?? false;

    const matchesCategory = selectedCategory
    ? (typeof product.category === "string"
        ? product.category === selectedCategory
        : product.category?.name === selectedCategory)
    : false;

    const matchesBrand = selectedBrand
    ? (typeof product.brand === "string"
        ? product.brand === selectedBrand
        : product.brand?.name === selectedBrand)
    : false;

    if (!selectedCategory && !selectedBrand) return matchesSearch;

    return matchesSearch && (matchesCategory || matchesBrand);
  })
  async function getCategory(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategories(data.data)
  }
  async function getBrands(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setBrands(data.data)
  }

  async function getProducts() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    // console.log(data);
    setProducts(data.data);
    setisLoading(false);
  }
  useEffect(() => {
    getProducts();
    getCategory()
    getBrands()
  }, []);
  if (isLoading) {
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
  // console.log(filteredProducts);
  // console.log(search);

  return (
    <>
      <input
        type="search"
        id="default-search"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="block w-[80%] md:w-1/2 mx-auto p-4 ps-10 mt-30 md:mt-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-green-500"
        placeholder="Search..."
      />
      <div className='flex justify-end items-center gap-5 my-5 mx-5'>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(dropdownOpen === "category" ? null : "category")}
            className="flex  items-center gap-1 font-semibold cursor-pointer hover:text-green-700"
          >
            Category
            <i className="fa-solid fa-chevron-down text-sm ms-1"></i>
          </button>

          {dropdownOpen === "category" && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                {categories.map((cat) => (
                  <button key={cat._id} onClick={() => {setSelectedCategory(cat.name) ; setSelectedBrand(null)}} 
                  className={`block px-5 py-1 cursor-pointer hover:text-green-700 ${selectedCategory === cat.name ? "text-green-700" : ""}`}>
                    {cat.name}
                  </button>
                  
                ))}
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedBrand(null)}}
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
          >
            Brand
            <i className="fa-solid fa-chevron-down text-sm ms-1"></i>
          </button>
          {dropdownOpen === "brand" && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                {brands.map((bra) => (
                  <button key={bra._id} onClick={() => {setSelectedBrand(bra.name) ;setSelectedCategory(null)}} 
                  className={`block px-5 py-1 cursor-pointer hover:text-green-700 ${selectedBrand === bra.name ? "text-green-700" : ""}`}>
                    {bra.name}
                  </button>
                ))}
                <button
                  onClick={() => {setSelectedBrand(null); setSelectedCategory(null)}}
                  className="px-4 py-1 mx-2 mb-2 rounded  cursor-pointer text-red-400 "
                >
                  Clear Filters
                </button>
            </div>
            )}
        </div>
      </div>
      <DisplayProducts filterproducts={filteredProducts} />
    </>
  );
} 

