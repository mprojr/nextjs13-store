"use client";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useCart from './(store)/store';

export default function Modal() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = useCart(state => state.openModal)
  const closeModal = useCart(state => state.setOpenModal)

  if (!isMounted || !openModal) {
    return null;
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
      </div>

    </div>,
    portalElement
  );
}