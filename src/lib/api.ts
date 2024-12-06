import axios from 'axios';
import type { Restaurant, SearchFilters } from '@/types/restaurant';

const YELP_API_KEY = process.env.NEXT_PUBLIC_YELP_API_KEY;
const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';

interface YelpBusiness {
  id: string;
  name: string;
  image_url: string;
  rating: number;
  review_count: number;
  price?: string;
  categories: Array<{ title: string }>;
  location: {
    address1: string;
  };
  distance: number;
  display_phone: string;
}

interface YelpResponse {
  businesses: YelpBusiness[];
  total: number;
}

export async function searchRestaurants(filters: SearchFilters): Promise<Restaurant[]> {
  if (!YELP_API_KEY) {
    throw new Error('Yelp API key is not configured');
  }

  try {
    const response = await axios.get<YelpResponse>('/api/restaurants', {
      params: {
        term: filters.cuisines.join(','),
        location: filters.location,
        radius: Math.round(filters.radius * 1609.34),
        limit: filters.limit,
        categories: 'restaurants',
      },
    });

    return response.data.businesses.map((business) => ({
      id: business.id,
      name: business.name,
      imageUrl: business.image_url,
      rating: business.rating,
      reviewCount: business.review_count,
      priceLevel: business.price || '$',
      categories: business.categories.map(cat => cat.title),
      address: business.location.address1,
      distance: business.distance,
      phone: business.display_phone,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Yelp API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch restaurants. Please check your location and try again.');
    }
    throw error;
  }
}