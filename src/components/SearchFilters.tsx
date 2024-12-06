import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Utensils, Hash, X } from 'lucide-react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { cuisineTypes } from '../data/cuisineTypes';
import { searchRestaurants } from '../lib/api';

export function SearchFilters() {
  const {
    filters,
    setFilters,
    addCuisine,
    removeCuisine,
    setRestaurants,
    setIsLoading
  } = useRestaurantStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cuisineInput, setCuisineInput] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCuisineChange = (value: string) => {
    setCuisineInput(value);
    const filtered = cuisineTypes.filter(type =>
      type.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleCuisineSelect = (cuisine: string) => {
    if (!filters.cuisines.includes(cuisine)) {
      addCuisine(cuisine);
    }
    setCuisineInput('');
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    if (!filters.location || filters.cuisines.length === 0) {
      alert('Please enter a location and select at least one cuisine type');
      return;
    }

    setIsLoading(true);
    try {
      const restaurants = await searchRestaurants(filters);
      setRestaurants(restaurants);
    } catch (error) {
      console.error('Error searching restaurants:', error);
      alert('Error searching restaurants. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-4 p-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter city or zip code..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
          />
        </div>
        
        <div className="relative flex-1" ref={wrapperRef}>
          <Utensils className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Add cuisine types..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={cuisineInput}
            onChange={(e) => handleCuisineChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleCuisineSelect(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {filters.cuisines.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.cuisines.map((cuisine) => (
            <span
              key={cuisine}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              {cuisine}
              <button
                onClick={() => removeCuisine(cuisine)}
                className="ml-1 rounded-full p-1 hover:bg-blue-200"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Search radius: {filters.radius} miles
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={filters.radius}
            onChange={(e) => setFilters({ radius: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="relative flex-1">
          <Hash className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            min="1"
            max="20"
            placeholder="Number of restaurants..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={filters.limit}
            onChange={(e) => setFilters({ limit: Math.min(20, Math.max(1, Number(e.target.value))) })}
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!filters.location || filters.cuisines.length === 0}
      >
        Search Restaurants
      </button>
    </div>
  );
}