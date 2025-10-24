import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios';
export default function CategoriesSlider() {
  const [categories,setCategories] = useState(null)
  async function getCategories(){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   setCategories(data.data)
  }
  useEffect(()=>{
    getCategories()
  } , [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return <>
  <Slider {...settings} className='my-8'>
      {categories?.map((category)=> <div>
        <img src={category.image} className='w-100 h-[200px] object-cover' alt="" />
      </div>)}
    </Slider>
  </>
}