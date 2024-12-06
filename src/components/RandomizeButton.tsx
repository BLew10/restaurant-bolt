import React from 'react';
import { Shuffle } from 'lucide-react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { getRandomElement } from '../lib/utils';
import { SpinningWheel } from './SpinningWheel';

export function RandomizeButton() {
  const { restaurants, setSelectedRestaurant, setIsSpinning } = useRestaurantStore();

  const handleRandomize = () => {
    if (restaurants.length === 0) return;
    setIsSpinning(true);
  };

  const handleSpinComplete = () => {
    const randomRestaurant = getRandomElement(restaurants);
    setSelectedRestaurant(randomRestaurant);
    setIsSpinning(false);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        onClick={handleRandomize}
        disabled={restaurants.length === 0}
        className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <Shuffle className="h-5 w-5" />
        Spin the Wheel!
      </button>
      
      {restaurants.length > 0 && (
        <SpinningWheel onSpinComplete={handleSpinComplete} />
      )}
    </div>
  );
}