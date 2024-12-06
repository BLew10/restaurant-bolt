import { create } from 'zustand';
import type { Restaurant, SearchFilters } from '../types/restaurant';

interface RestaurantStore {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  filters: SearchFilters;
  isLoading: boolean;
  isSpinning: boolean;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  addCuisine: (cuisine: string) => void;
  removeCuisine: (cuisine: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSpinning: (isSpinning: boolean) => void;
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurants: [],
  selectedRestaurant: null,
  filters: {
    location: '',
    cuisines: [],
    radius: 5,
    limit: 5
  },
  isLoading: false,
  isSpinning: false,
  setRestaurants: (restaurants) => set({ restaurants }),
  setSelectedRestaurant: (selectedRestaurant) => set({ selectedRestaurant }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  addCuisine: (cuisine) =>
    set((state) => ({
      filters: {
        ...state.filters,
        cuisines: [...state.filters.cuisines, cuisine]
      }
    })),
  removeCuisine: (cuisine) =>
    set((state) => ({
      filters: {
        ...state.filters,
        cuisines: state.filters.cuisines.filter((c) => c !== cuisine)
      }
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsSpinning: (isSpinning) => set({ isSpinning })
}));