'use client';

import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useRestaurantStore } from '@/store/useRestaurantStore';

interface SpinningWheelProps {
  onSpinComplete: () => void;
}

export function SpinningWheel({ onSpinComplete }: SpinningWheelProps) {
  const { restaurants, isSpinning } = useRestaurantStore();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    if (isSpinning && !mustSpin) {
      setPrizeNumber(Math.floor(Math.random() * restaurants.length));
      setMustSpin(true);
    }
  }, [isSpinning, restaurants.length, mustSpin]);

  const handleSpinStop = () => {
    setMustSpin(false);
    onSpinComplete();
  };

  const data = restaurants.map((restaurant) => ({
    option: restaurant.name,
    style: { textColor: '#fff', fontSize: 12 }
  }));

  return (
    <div className="flex justify-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={handleSpinStop}
        spinDuration={0.8}
        outerBorderWidth={2}
        radiusLineWidth={1}
        fontSize={14}
        textDistance={60}
        backgroundColors={[
          '#FF6B6B',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4',
          '#FFEEAD',
          '#D4A5A5',
          '#9B5DE5',
          '#F15BB5',
          '#00BBF9',
          '#00F5D4'
        ]}
      />
    </div>
  );
}