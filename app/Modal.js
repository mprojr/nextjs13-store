"use client";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useCart from './(store)/store';
import { useRouter } from 'next/navigation';

export default function Modal() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = useCart(state => state.openModal);
  const closeModal = useCart(state => state.setOpenModal);
  const cartItems = useCart(state => state.cart);
  const removeItemFromCart = useCart(state => state.removeItemFromCart);
  const router = useRouter();

  if (!isMounted || !openModal) {
    return null;
  }

  // Function to fetch price_id dynamically for each cart item during checkout
  async function fetchPriceId(productId) {
    try {
      const res = await fetch(`/api/product?productId=${productId}`);
      const data = await res.json();
      if (!data.default_price) {
        console.error(`No default_price found for productId: ${productId}`);
        return null;
      }
      return data.default_price; // Return the default price (price_id)
    } catch (error) {
      console.error(`Error fetching price for productId: ${productId}`, error);
      return null; // Handle fetch error
    }
  }

  async function checkout() {
    try {
      // Fetch price_ids for all cart items just before checkout
      const lineItems = await Promise.all(
        cartItems.map(async (cartItem) => {
          const price_id = await fetchPriceId(cartItem.productId); // Fetch price_id dynamically
          if (!price_id) {
            throw new Error(`Missing price_id for product: ${cartItem.name}`);
          }
          return {
            price: price_id,  // Use the fetched price_id
            quantity: cartItem.quantity || 1,
          };
        })
      );

      console.log('Sending lineItems to backend:', lineItems); // Log the data
  
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lineItems }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Checkout failed:", errorText);
        alert("Checkout failed. Please try again.");
        return;
      }

      const data = await res.json();
      router.push(data.session.url);  // Redirect to Stripe checkout session
    } catch (error) {
      console.error("An error occurred during checkout:", error);
      alert(`An error occurred: ${error.message}`);
    }
  }
  

  const portalElement = document.getElementById('portal');

  if (!portalElement) {
    console.error("The 'portal' element does not exist in the DOM.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className='fixed top-0 left-0 w-screen h-screen z-50'>
      <div onClick={closeModal} className="bg-transparent absolute inset-0"></div>
      <div className='flex flex-col bg-white absolute right-0 top-0 h-screen shadow w-screen sm:w-96 max-w-screen gap-4 p-4'>
        <div className='flex items-center p-4 justify-between text-xl relative'>
          <h1>Cart</h1>
          <i onClick={closeModal} className="fa-solid cursor-pointer hover:opacity-60 fa-x"></i>
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-300 w-2/3'></div>
        </div>
        <div className='p-4 overflow-scroll flex-1 flex flex-col gap-4'>
          {cartItems.length === 0 ? (
            <p>There is nothing in your cart.</p>
          ) : (
            <>
              {cartItems.map((cartItem, itemIndex) => (
                <div key={itemIndex} className='flex border-l border-solid border-slate-700 px-2 flex-col gap-2 relative group'>
                  <div className='flex items-center justify-between'>
                    <h2>{cartItem.name}</h2>
                    <p>${cartItem.cost / 100}</p>
                  </div>
                  <p className='text-slate-600 text-sm'>Quantity: 1</p>
                  <i
                    onClick={() => removeItemFromCart({ itemIndex })}
                    className="fa-solid px-4 fa-x cursor-pointer text-red-500 absolute bottom-1 right-1 transition-opacity opacity-0 group-hover:opacity-100"
                  ></i>
                </div>
              ))}
            </>
          )}
        </div>
        <div onClick={checkout} className='border border-solid border-slate-700 text-xl m-4 p-8 uppercase grid place-items-center hover:opacity-60 cursor-pointer'>
          Checkout
        </div>
      </div>
    </div>,
    portalElement
  );
}