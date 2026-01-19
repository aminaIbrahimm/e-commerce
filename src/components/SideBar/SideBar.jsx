// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

// export default function SideBar({ onCategorySelect, onBrandSelect }) {
//     const [toggled,setToggled] = useState(false)
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);

//     async function fetchCategories () {
//         try {
//           const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
//           setCategories(data.data);
//         } catch (err) {
//           console.error('Error fetching categories', err);
//         }
//       };
//     async function fetchBrands () {
//         try {
//           const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
//           setBrands(data.data);
//         } catch (err) {
//           console.error('Error fetching categories', err);
//         }
//       };

//     useEffect(()=>{
//         fetchCategories()
//         fetchBrands()
//     },[])

//   return (
//     <div>
//         <button
//         className="fixed top-24 left-5 z-50 md:hidden"
//         onClick={() => setToggled(!toggled)}
//       >
//         {toggled ? "": <span className='bg-green-700 text-white p-3 rounded-full shadow-lg text-2xl'>open menu <i class="fa-solid fa-arrow-right items-center ms-2"></i></span>}
//       </button>
//         <Sidebar 
//         collapsed={false}
//         toggled={toggled}
//         breakPoint="md"
//         onBackdropClick={() => setToggled(false)} 
//         className="min-h-[calc(100vh-64px)]">
//         <Menu>
//         <SubMenu label="Categories">
//             {categories.map((cat) => (
//               <MenuItem key={cat._id} onClick={() => onCategorySelect(cat._id)}>{cat.name}</MenuItem>
//             ))}
//           </SubMenu>
//           <SubMenu label="Brands">
//             {brands.map((bra)=>{
//                return <MenuItem key={bra._id} onClick={() => onBrandSelect(bra._id)}> {bra.name} </MenuItem>
//             })}
//           </SubMenu>
//         </Menu>
//       </Sidebar>
//     </div>
//   )
// }


import React, { useContext, useEffect, useState } from 'react';
import DisplayProducts from '../DisplayProducts/DisplayProducts';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import SideBar from '../SideBar/SideBar';
import { authContext } from '../../Context/AuthContextProvider';

export default function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const { isUser } = useContext(authContext);

  // فلترة حسب البحث + الكاتيجوري + البراند
  const finalProducts = filterProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(data.data);
        setFilterProducts(data.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // فلترة حسب الكاتيجوري أو البراند
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category._id === selectedCategory
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (product) => product.brand._id === selectedBrand
      );
    }

    setFilterProducts(filtered);
  }, [selectedCategory, selectedBrand, products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <SideBar
        onCategorySelect={setSelectedCategory}
        onBrandSelect={setSelectedBrand}
      />
      <div className="flex-1 p-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="block w-full md:w-1/2 mx-auto p-4 mt-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-green-500"
        />
        <DisplayProducts filterproducts={finalProducts} />
      </div>
    </div>
  );
}
