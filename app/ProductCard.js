"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import useCart from './(store)/store';
import Image from 'next/image';

export default function ProductCard(props) {
    const { product, showPrice = true } = props;
    const { product: productInfo } = product;
    const { id: productId, name, description, images } = productInfo;

    const setProduct = useCart(state => state.setProduct);
    const router = useRouter();

    function onProductClick() {
        const newProduct = {
            productId,
            name,
            description,
            productInfo,
        };
        setProduct(newProduct);
        router.push(`/product?productId=${productId}`);
    }

    function onButtonClick(event) {
        event.stopPropagation(); // Prevent triggering the card click event
        onProductClick();
    }

    return (
        <div onClick={onProductClick} className='flex flex-col shadow bg-white hover:shadow-lg cursor-pointer'>
            <Image src={images[0]} alt={name} width={500} height={500} className='w-full h-full object-cover p-2' />
            <div className='flex flex-col gap-2 p-4'>
                <div className='flex items-center justify-between'>
                    <h3>{name}</h3>
                    {showPrice && <p>${product.unit_amount / 100}</p>} {/* Conditionally render price */}
                </div>
                <button
                    onClick={onButtonClick}
                    className='mt-4 py-2 px-4 bg-[#63adb8] text-white rounded hover:bg-[#3f818c] '
                >
                    Learn More
                </button>
            </div>
        </div>
    );
}