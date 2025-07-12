import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null); 

  async function getBrands() {
    setIsLoading(true);
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    setBrands(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  function openModal(brand) {
    setSelectedBrand(brand);
  }

  function closeModal() {
    setSelectedBrand(null);
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-16'>
      <h1 className='text-center font-semibold text-green-600 text-4xl my-9 p-3'>All Brands</h1>
      {selectedBrand && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]" onClick={closeModal} >
        <div onClick={(e) => e.stopPropagation()} className="bg-white flex justify-between items-center dark:bg-gray-800 rounded-lg shadow-xl w-[450px] max-w-full p-8 relative">
          <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-5xl" > &times; </button>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
                {selectedBrand.name}
              </h2>
              <p className="text-center lowercase text-md">{selectedBrand.name}</p>
            </div>
            <img src={selectedBrand.image} alt={selectedBrand.name} className="h-40 object-contain mb-4" />
          <button onClick={closeModal} className="absolute bottom-2 mt-5 mb-2 right-3 ps-3 pe-3 pb-1 text-white rounded-xl bg-gray-500 hover:text-red-600 text-2xl" >close </button>
        </div>
      </div>
    )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            onClick={() => openModal(brand)}
            key={brand._id}
            className="hover:shadow-green-300 shadow-md transition duration-300 bg-white border border-gray-200 rounded-lg cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          >
            <img className="w-full h-44 object-contain" src={brand.image} alt={brand.name} />
            <p className="text-center mb-3 p-3">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}