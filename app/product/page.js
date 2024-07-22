"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCart from "../(store)/store";
import Image from 'next/image';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import Link from "next/link";

export default function ProductPage(props) {
    const { searchParams } = props;
    const { price_id } = searchParams;
    const product = useCart(state => state.product);
    const addItemToCart = useCart(state => state.addItemToCart);
    const { cost, productInfo, name, description } = product;

    const router = useRouter();

    useEffect(() => {
        if (!product?.name) {
            router.push('/');
        }
    }, [product, router]);

    function handleAddToCart() {
        console.log('PRICE ID: ', price_id);
        const newItem = {
            quantity: 1,
            price_id,
            name,
            cost
        };
        addItemToCart({ newItem });
    }

    if (!product?.name) {
        return null; // Return null if the product is not available
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="min-h-[77vh] grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-12 md:py-24">
                    <div className="flex flex-col gap-6">
                        <Image
                            src={productInfo.images[0]}
                            alt={name}
                            width={600}
                            height={600}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                            <p className="text-muted-foreground text-lg mt-2">{description}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <h2 className="text-3xl font-sans">${cost / 100}</h2>
                            <Button size="lg" onClick={handleAddToCart} className={'ml-auto'}>Add to Cart</Button>
                        </div>
                        <div className="flex items-center gap-4">
                            <ShieldCheckIcon className="w-6 h-6 text-green-500" />
                            <span className="text-muted-foreground">30-day money back guarantee</span>
                        </div>
                    </div>
                </section>
                <section className="bg-[#c1dfe5] py-12 md:py-24">
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <ShieldCheckIcon className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="text-xl font-bold">30-Day Money Back</h3>
                                <p className="text-muted-foreground">If you&apos;re not satisfied, we&apos;ll refund your purchase.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <TruckIcon className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="text-xl font-bold">Free Shipping</h3>
                                <p className="text-muted-foreground">We offer free shipping on all orders.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LockIcon className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="text-xl font-bold">Secure Checkout</h3>
                                <p className="text-muted-foreground">Your payment information is safe with us.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-6xl mx-auto px-4 py-12 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold">Product Details</h2>
                            <p className="text-muted-foreground text-lg mt-4">{description}</p>
                            <ul className="mt-6 space-y-2 text-muted-foreground">
                                <li>
                                    <CheckIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                                    Freshwater pearls
                                </li>
                                <li>
                                    <CheckIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                                    14k gold-plated sterling silver chain
                                </li>
                                <li>
                                    <CheckIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                                    Secure lobster clasp
                                </li>
                                <li>
                                    <CheckIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                                    Adjustable length: 16-18 inches
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold">Customer Reviews</h2>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">Sarah Johnson</h4>
                                            <div className="flex items-center gap-0.5 text-primary">
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-2">
                                            This necklace is absolutely stunning! The pearls are so beautiful and the quality is amazing. I&apos;ve received so many compliments on it.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">Alex Smith</h4>
                                            <div className="flex items-center gap-0.5 text-primary">
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-2">
                                            I&apos;m really happy with this purchase. The necklace is well-made and the pearls are of high quality. The only downside is that the clasp can be a bit tricky to maneuver, but overall it&apos;s a great product.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-muted py-12 md:py-24">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                    <span className="sr-only">View</span>
                                </Link>
                                <Image
                                    src="/placeholder.svg"
                                    alt="Related Product 1"
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-64"
                                />
                                <div className="p-4 bg-background">
                                    <h3 className="text-xl font-bold">Delicate Pearl Earrings</h3>
                                    <p className="text-sm text-muted-foreground">Elegant and timeless</p>
                                    <h4 className="text-lg font-semibold md:text-xl">$49.99</h4>
                                </div>
                            </div>
                            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                    <span className="sr-only">View</span>
                                </Link>
                                <Image
                                    src="/placeholder.svg"
                                    alt="Related Product 2"
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-64"
                                />
                                <div className="p-4 bg-background">
                                    <h3 className="text-xl font-bold">Pearl and Gold Bracelet</h3>
                                    <p className="text-sm text-muted-foreground">Luxurious and chic</p>
                                    <h4 className="text-lg font-semibold md:text-xl">$79.99</h4>
                                </div>
                            </div>
                            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                    <span className="sr-only">View</span>
                                </Link>
                                <Image
                                    src="/placeholder.svg"
                                    alt="Related Product 3"
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-64"
                                />
                                <div className="p-4 bg-background">
                                    <h3 className="text-xl font-bold">Pearl and Diamond Ring</h3>
                                    <p className="text-sm text-muted-foreground">Timeless elegance</p>
                                    <h4 className="text-lg font-semibold md:text-xl">$199.99</h4>
                                </div>
                            </div>
                            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                    <span className="sr-only">View</span>
                                </Link>
                                <Image
                                    src="/placeholder.svg"
                                    alt="Related Product 4"
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-64"
                                />
                                <div className="p-4 bg-background">
                                    <h3 className="text-xl font-bold">Pearl and Silver Necklace</h3>
                                    <p className="text-sm text-muted-foreground">Elegant and versatile</p>
                                    <h4 className="text-lg font-semibold md:text-xl">$89.99</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ShieldCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}
