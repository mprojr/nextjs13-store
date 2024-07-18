import React from 'react';

export default function Entrance() {
  return (
    <div className='w-full min-h-screen'>
      <div className='bg-gradient-to-br from-[#e6afd9] to-[#d0b8cb] w-full min-h-screen flex sm:items-center items-start'>
        <div className='flex flex-col sm:flex-row w-full items-center sm:justify-between justify-start'>
          <div className='flex-1 max-h-screen flex items-center justify-center p-4'>
            <img src='/img/Pic1.png' alt='lovely ring' className='max-h-[100vh] object-contain shadow-lg duration-500' draggable="false"/>
          </div>
          <div className='flex-1 text-center text-white p-4'>
            <h2 className='text-4xl font-bold mb-4'>Discover Our Unique Rings</h2>
            <p className='text-lg mb-6'>Handcrafted with love, perfect for any occasion.</p>
            <a 
              href="/projects-list"
              className='inline-block text-white font-bold py-2 px-6 rounded border-2 hover:bg-white hover:text-slate-700 hover:duration-500'
            >
              Shop the Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}