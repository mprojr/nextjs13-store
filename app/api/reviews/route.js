import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const reviews = await db.collection('reviews').find({}).toArray();

    console.log('Fetched reviews:', reviews);

    return NextResponse.json({ reviews });
  } catch (e) {
    console.error('Error fetching reviews:', e);
    return NextResponse.json({ message: 'Error fetching reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const reviewData = await request.json();

    console.log('Review data received:', reviewData);

    const result = await db.collection('reviews').insertOne(reviewData);

    console.log('Review insert result:', result);

    if (result.ops && result.ops.length > 0) {
      return NextResponse.json({ review: result.ops[0] }, { status: 201 });
    } else {
      throw new Error('Failed to insert review');
    }
  } catch (e) {
    console.error('Error submitting review:', e);
    return NextResponse.json({ message: 'Error submitting review' }, { status: 500 });
  }
}
