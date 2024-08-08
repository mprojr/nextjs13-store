import Stripe from 'stripe';
import ProductCard from './ProductCard';
import Entrance from './Entrance';
import Link from 'next/link';
import '../app/globals.css'

async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27'
  });
  const res = await stripe.prices.list({
    expand: ['data.product']
  });
  const prices = res.data;
  return prices;
}

export default async function Home() {
  const products = await getStripeProducts();
  console.log(products);

  // Select the first 3 products for featured items
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Entrance />
      <div className="w-full max-w-7xl mx-auto mt-10">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Featured Items</h2>
        <p className="text-center text-gray-600 mb-8">Explore our unique handcrafted rings perfect for any occasion.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, productIndex) => (
            <ProductCard key={productIndex} product={product} showPrice={false} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/projects-list" className="py-4 m-2 text-[#649d9d] hover:text-[#336f6f] text-lg font-semibold">
            Browse More
          </Link>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <section className="mt-10 bg-[#c1e0e5] py-10 w-full">
        <div className=''>
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Customer Testimonials</h2>
          <div className="flex flex-col items-center space-y-6">
            <blockquote className="max-w-lg text-center">
              <p className="text-lg italic">&quot;Absolutely stunning! The quality is amazing and the service was impeccable.&quot;</p>
              <footer className="mt-4">- Jane Doe</footer>
            </blockquote>
            <blockquote className="max-w-lg text-center">
              <p className="text-lg italic">&quot;I love my new ring! It&apos;s exactly what I was looking for. Thank you!&quot;</p>
              <footer className="mt-4">- John Smith</footer>
            </blockquote>
            <blockquote className="max-w-lg text-center">
              <p className="text-lg italic">&quot;Fantastic craftsmanship and great customer support. Highly recommend.&quot;</p>
              <footer className="mt-4">- Emily Brown</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}