import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27',
});

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    console.log('Received productId:', productId); // Log the received productId

    if (!productId) {
        console.error('Product ID is required');
        return new Response('Product ID is required', {
            status: 400,
        });
    }

    try {
        const product = await stripe.products.retrieve(productId);
        console.log('Product fetched:', JSON.stringify(product, null, 2));

        if (product.default_price) {
            const price = await stripe.prices.retrieve(product.default_price);
            product.unit_amount = price.unit_amount;
        }

        return NextResponse.json({ product });
    } catch (err) {
        console.error('Error fetching product:', err); // Log the error
        return new Response('Error fetching product', {
            status: 500,
        });
    }
}
