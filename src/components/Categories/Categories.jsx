// import React, { useContext, useEffect, useState } from 'react'
// import Style from './Categories.module.css'
// import { authContext } from '../../Context/AuthContextProvider'
// import axios from 'axios'
// import { use } from 'react'
// import { ColorRing } from 'react-loader-spinner'
// export default function Categories() { 
//   const [categories, setCategories] = useState([])
//   const [isLoading,setisLoading] = useState(false)
  
//   async function getCategories(){
//     setisLoading(true)
//     let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
//     console.log(data);
//     setCategories(data.data) 
//     setisLoading(false)
//   }
//   useEffect(()=>{
//     getCategories() 
//   },[])
//   if(isLoading){
//       return <div className='flex justify-center items-center h-screen'>
//         <ColorRing
//       visible={true}
//       height="80"
//       width="80"
//       ariaLabel="color-ring-loading"
//       wrapperStyle={{}}
//       wrapperClass="color-ring-wrapper"
//       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//       />
//     </div>
//   }
//   function handleClick() {
//     setisLoading(true);
//     setTimeout(() => {
//       setisLoading(false);
//     }, 1000);
//   }
//   return <div className='container mx-auto px-16 mb-7'>
   
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {categories?.map(product => (
//         <div onClick={handleClick} key={product._id} className="hover:shadow-green-300 shadow-md transition duration-300 bg-white  border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
//           <img className="h-[300px] w-full object-cover" src={product.image} alt={product.title} />
//           <p className="text-center text-3xl mb-3 text-green-700 p-3 font-medium ">{product.name}</p>
//         </div>
//       ))}
//     </div>

//   </div>
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CategoryDetails from '../CategoryDetails/CategoryDetails';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   async function fetchCategories() {
//     try {
//       const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
//       setCategories(data.data);
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     }
//   }

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-5">All Categories</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {categories.map(category => (
//           <div
//             key={category._id}
//             onClick={() => setSelectedCategoryId(category._id)}
//             className="cursor-pointer border rounded p-3 text-center shadow hover:shadow-lg transition"
//           >
//             <img src={category.image} alt={category.name} className="h-32 w-full object-cover mb-2 rounded" />
//             <h3 className="font-semibold">{category.name}</h3>
//           </div>
//         ))}
//       </div>

//       {/* عرض التفاصيل تحت الكروت */}
//       {selectedCategoryId && (
//         <div className="mt-10 border-t pt-6">
//           <CategoryDetails id={selectedCategoryId} />
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDetails from '../CategoryDetails/CategoryDetails';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='container mx-auto px-16 mb-7'>
      <h2 className="text-2xl font-bold text-center mb-6">Categories</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="hover:shadow-green-300 shadow-md transition-shadow duration-300 bg-white  border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700"
              onClick={() => setSelectedCategoryId(cat._id)} >
              <img src={cat.image} alt={cat.name} className="h-[300px] w-full object-cover mb-2 rounded" />
              <h3 className="text-center text-2xl font-semibold mb-5 text-green-600">{cat.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedCategoryId && (
        <div className="mt-8">
          <CategoryDetails id={selectedCategoryId} />
        </div>
      )}
    </div>
  );
}
