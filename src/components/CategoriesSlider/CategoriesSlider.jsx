import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios';
export default function CategoriesSlider() {
  const [categories,setCategories] = useState(null)
  const [brands,setBrands] = useState(null)

  async function getBrands(){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
   setCategories(data.data)
  }

  async function getCategories(){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   setCategories(data.data)
  }
  useEffect(()=>{
    getCategories()
    // getBrands()
  } , [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return <>
  <Slider {...settings} className='my-8 '>
      {categories?.map((category)=> <div>
        <img src={category.image} className='w-100 h-[200px] object-cover' alt="" />
      </div>)}
    </Slider>
  {/* <Slider {...settings} className='my-8 '>
      {brands?.map((brand)=> <div>
        <img src={brand.image} className='w-40 h-[100px] object-cover' alt="" />
      </div>)}
    </Slider> */}
  </>
}