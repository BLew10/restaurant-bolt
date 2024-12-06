export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  categories: string[];
  address: string;
  distance: number;
  phone: string;
}

export interface SearchFilters {
  location: string;
  cuisines: string[];
  radius: number;
  limit: number;
}