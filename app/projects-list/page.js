import Stripe from 'stripe';
import ProductCard from '../ProductCard';
import Link from 'next/link';

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

export default async function ProjectsList() {
  const products = await getStripeProducts();

  return (
    <main className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-7xl mx-auto mt-10">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Our Collection</h2>
        <p className="text-center text-gray-600 mb-8">Explore our unique handcrafted rings perfect for any occasion.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, productIndex) => (
            <ProductCard key={productIndex} product={product} showPrice={false}/>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="py-4 m-2 text-[#649d9d] hover:text-[#336f6f] text-lg font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}