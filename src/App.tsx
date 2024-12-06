import React from 'react';
import { Utensils } from 'lucide-react';
import { SearchFilters } from './components/SearchFilters';
import { RestaurantCard } from './components/RestaurantCard';
import { RandomizeButton } from './components/RandomizeButton';
import { SpinningWheel } from './components/SpinningWheel';
import { useRestaurantStore } from './store/useRestaurantStore';

function App() {
  const { restaurants, selectedRestaurant, setSelectedRestaurant } = useRestaurantStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-bold">Random Restaurant Finder</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <SearchFilters />
          
          <RandomizeButton />

          {selectedRestaurant && (
            <div className="w-full max-w-2xl">
              <h2 className="mb-4 text-center text-2xl font-bold">Your Random Pick</h2>
              <RestaurantCard
                restaurant={selectedRestaurant}
                isSelected
                onClick={() => setSelectedRestaurant(null)}
              />
            </div>
          )}

          <div className="w-full">
            <h2 className="mb-4 text-xl font-semibold">All Restaurants ({restaurants.length})</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => setSelectedRestaurant(restaurant)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;