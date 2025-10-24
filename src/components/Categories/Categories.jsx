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
    <div className=' mx-auto mb-7'>
      <h2 className="text-2xl font-bold text-teal-900 text-center mb-6 mt-25">All Categories</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="hover:shadow-green-700 shadow-md transition-shadow duration-300 bg-white  border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700"
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
