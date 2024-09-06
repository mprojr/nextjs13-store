import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27',
});

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

/*     console.log('Received productId:', productId); // Log the received productId */

    // Check if productId is provided
    if (!productId) {
        console.error('Product ID is required');
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        // Retrieve product information from Stripe
        const product = await stripe.products.retrieve(productId);
        console.log('Product fetched:', JSON.stringify(product, null, 2));

        // Check if the product has a default_price
        if (product.default_price) {
            // Retrieve price details from Stripe
            const price = await stripe.prices.retrieve(product.default_price);
            product.unit_amount = price.unit_amount;  // Attach unit_amount for convenience

            // Return both the default_price and the product
            return NextResponse.json({
                default_price: product.default_price,  // Return the price_xxxxxx format
                product: {
                    ...product,
                    unit_amount: price.unit_amount  // Attach the unit_amount in the response
                }
            });
        } else {
            // Handle case where default_price is missing
            return NextResponse.json({ error: 'No default price found for this product' }, { status: 400 });
        }
    } catch (err) {
        console.error('Error fetching product:', err);
        return NextResponse.json({ error: 'Error fetching product', details: err.message }, { status: 500 });
    }
}
