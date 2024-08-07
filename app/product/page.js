"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useCart from "../(store)/store";
import Image from 'next/image';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

export default function ProductPage() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
    const addItemToCart = useCart(state => state.addItemToCart);
    const router = useRouter();

    useEffect(() => {
        if (!productId) {
            console.error('Product ID is missing');
            router.push('/');
            return;
        }

        async function fetchProduct() {
            try {
                const res = await fetch(`/api/product?productId=${productId}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                console.log('Product data:', data);
                if (data.product) {
                    setProduct(data.product);
                    console.log('Metadata:', JSON.stringify(data.product.metadata, null, 2));
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                router.push('/');
            }
        }

        fetchProduct();
    }, [productId, router]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(`/api/reviews?productId=${productId}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                setReviews(data.reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchReviews();
    }, [productId]);

    async function handleSubmitReview(e) {
      e.preventDefault();
      
      setIsSubmitting(true);
      
      console.log('Submitting review with data:', { productId, name, review, rating });
  
      try {
          const res = await fetch('/api/reviews', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ productId, name, review, rating }),
          });
  
          console.log('Response status:', res.status);
          setIsReviewSubmitted(true);
  
          if (res.ok) {
              const newReview = await res.json();
              console.log('New review added:', newReview);
              setReviews([...reviews, newReview.review]);
              setName('');
              setReview('');
              setRating(5);
          } else {
              const errorData = await res.json();
              console.error('Failed to submit review:', errorData);
          }
      } catch (error) {
          console.error('Error submitting review:', error);
      } finally {
          setIsSubmitting(false); // Set submitting state to false
      }
  }  

  function handleAddToCart() {
        if (!product) {
            console.error('Product data is missing');
            return;
        }

        console.log('Product ID: ', productId);
        const newItem = {
            quantity: 1,
            productId,
            name: product.name,
            cost: product.unit_amount
        };
        addItemToCart({ newItem });
    }

    if (!product) {
        return <div>Loading...</div>; // Provide a loading state while fetching data
    }

    const { unit_amount, name: productName, description, images = [], metadata = {} } = product;

    console.log('Product:', product);

    if (images.length === 0) {
        return <div>Error: Product images are missing.</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="min-h-[77vh] grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-12 md:py-24">
                    <div className="flex flex-col gap-6">
                        <Image
                            src={images[0]}
                            alt={productName}
                            width={600}
                            height={600}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{productName}</h1>
                            <p className="text-muted-foreground text-lg mt-2">{description}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <h2 className="text-3xl font-sans">${unit_amount / 100}</h2>
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
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold">Product Details</h2>
                            <p className="text-muted-foreground text-lg mt-4">{description}</p>
                            <ul className="mt-6 space-y-2 text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-black w-5 h-5 mr-2 text-primary" />
                                    {metadata.feature1}
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-black w-5 h-5 mr-2 text-primary" />
                                    {metadata.feature2}
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-black w-5 h-5 mr-2 text-primary" />
                                    {metadata.feature3}
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-black w-5 h-5 mr-2 text-primary" />
                                    {metadata.feature4}
                                </li>
                            </ul>
                        </div>
                        <div>
                            {isReviewSubmitted ? (
                                <div className="text-2xl font-bold">
                                    Thank you for your review!
                                </div>
                            ) : (
                                <div className="mt-6">
                                    <h3 className="text-2xl font-semibold">Submit a Review</h3>
                                    <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block w-full mt-1 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium">Review</label>
                                            <textarea
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                                className="block w-full mt-1 border rounded"
                                                required
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium">Rating</label>
                                            <select
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                                className="block w-full mt-1 border rounded"
                                                required
                                            >
                                                {[5, 4, 3, 2, 1].map((rating) => (
                                                    <option key={rating} value={rating}>
                                                        {rating}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Review'}</Button>
                                        {isReviewSubmitted && <p className="mt-4 text-green-600">Thank you for your review!</p>}
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className="sm:mt-2 mt-6 space-y-6">
                          <h2 className="text-3xl md:text-4xl font-bold">Customer Reviews</h2>
                          {reviews.map((review, index) => (
                              <div key={index} className="p-4 sm:w-3/4 border border-gray-200 rounded-lg shadow-sm bg-white">
                                  <div className="flex items-center gap-4 mb-4">
                                      <div className="flex-1">
                                          <h4 className="text-lg font-semibold">{review.name}</h4>
                                          <div className="flex items-center gap-1 border-black">
                                              {Array.from({ length: review.rating }).map((_, i) => (
                                                  <StarIcon key={i} className="w-5 h-5" />
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                                  <p className="text-gray-700">{review.review}</p>
                              </div>
                          ))}
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
            className="feather feather-check"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
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
            className="feather feather-shield"
        >
            <path d="M12 22s8-4.5 8-10V5l-8-4-8 4v7c0 5.5 8 10 8 10z" />
            <polyline points="9 12 12 15 20 7" />
        </svg>
    );
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
            className="feather feather-truck"
        >
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
    );
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
            className="feather feather-lock"
        >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    );
}

function StarIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#FFC0CB"
          stroke="black"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
      >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
  );
}
