import { NextResponse } from 'next/server';
import axios from 'axios';

const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  try {
    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      params: Object.fromEntries(searchParams),
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Yelp API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}