import React from 'react';
import { Star, Phone, MapPin } from 'lucide-react';
import type { Restaurant } from '../types/restaurant';
import { cn, formatDistance } from '../lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected?: boolean;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, isSelected, onClick }: RestaurantCardProps) {
  return (
    <div
      className={cn(
        'cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md',
        isSelected && 'ring-2 ring-blue-500'
      )}
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{restaurant.name}</h3>
          <span className="text-sm text-gray-500">{restaurant.priceLevel}</span>
        </div>
        
        <div className="mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">
            {restaurant.rating} ({restaurant.reviewCount} reviews)
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>{restaurant.phone}</span>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {restaurant.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {category}
            </span>
          ))}
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          {formatDistance(restaurant.distance)} away
        </div>
      </div>
    </div>
  );
}