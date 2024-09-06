import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    try {
        const body = await request.json();

        // Check if lineItems exist
        if (!body.lineItems || body.lineItems.length === 0) {
            return new Response(JSON.stringify({ error: 'No line items provided' }), {
                status: 400,  // Use 400 Bad Request for missing or invalid input
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
            apiVersion: '2020-08-27'
        });

        // Create the Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: body.lineItems,  // Pass the dynamically fetched line items
            mode: 'payment'
        });

        return NextResponse.json({ session });

    } catch (err) {
        console.error('Stripe checkout session creation failed:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), {
            status: 500,  // Use 500 for internal server errors
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
