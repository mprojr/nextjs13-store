import Stripe from 'stripe';
import ProductCard from './ProductCard';
import Entrance from './Entrance';

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

  return (
    <main className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Entrance />
      <div className="w-full max-w-7xl mx-auto mt-10">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Our Collection</h2>
        <p className="text-center text-gray-600 mb-8">Explore our unique handcrafted rings perfect for any occasion.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, productIndex) => {
            return (
              <ProductCard key={productIndex} product={product} />
            );
          })}
        </div>
      </div>
    </main>
  );
}