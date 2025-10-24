import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoryDetails({ id }) {
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategory() {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setCategory(data.data);
    } catch (err) {
      console.error("Error loading category details:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubcategories() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubcategories(data.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  }

  useEffect(() => {
    if (id) {
      fetchCategory();
      fetchSubcategories();
    }
  }, [id]);

  if (loading) return <p className="text-center text-green-700">Loading SubCategories...</p>;

  if (!category) return null;

  return (
    <div className="text-center mt-10">
      {subcategories.length > 0 && (
        <div className="mb-6">
          <h4 className="text-3xl font-semibold mb-10 text-green-600">{category.name} Subcategories</h4>
          <div className="grid grid-cols-2 gap-3">
            {subcategories.map(sub => ( <div key={sub._id} className="border p-5 border-gray-300 hover:shadow-green-700 shadow-md transition-shadow duration-300 text-2xl font-semibold text-gray-900 rounded hover:shadow-md" >
                {sub.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
