import React from 'react'

export default function Footer() {
  return (
    <>
      <div className=" bg-neutral-800 relative flex flex-col justify-between md:flex-row gap-5 start-0 end-0 p-8 md:px-24 bottom-0 w-full text-white">
        <div>
          <div className="mb-4">
            <i class="fa-brands fa-opencart text-green-700 text-3xl"></i>
            <span className="text-2xl font-semibold px-3">SooqNow</span>
          </div>
          <ul className='space-y-2'>
            <li><p>Address : Cairo, Egypt</p></li>
            <li><p>Email : Example@gmail.com </p></li>
            <li><p>Phone : +20 123 456 7890</p></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-2xl mb-4">Shopping and Categories</h4>
          <ul className="space-y-2">
            <li>
              <h3>Men's Shopping</h3>
            </li>
            <li>
              <h3>Women's Shopping</h3>
            </li>
            <li>
              <h3>Electronics Shopping</h3>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-2xl mb-4">Usful Links</h4>
          <ul className="space-y-2">
            <li>
              <h3>Homepage</h3>
            </li>
            <li>
              <h3>Products</h3>
            </li>
            <li>
              <h3>Wishlist</h3>
            </li>
            <li>
              <h3>Cart</h3>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-2xl mb-4">Help & Information</h4>
          <ul className="space-y-2">
            <li>
              <h3>FAQ'S</h3>
            </li>
            <li>
              <h3>Shipping</h3>
            </li>
            <li>
              <h3>Tracking Id</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-neutral-900 text-white">
        <p className="text-center py-2">
          &copy; {new Date().getFullYear()} SooqNow. All rights reserved.
        </p>
      </div>
    </>
  );
}