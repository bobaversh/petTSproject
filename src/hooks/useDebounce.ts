import { useState, useEffect } from 'react';
import type { WorkoutResponse } from '../Types/workout.types';


export default function useDebounce(value: WorkoutResponse | undefined, delay:number) {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value]
  );

  return debouncedValue;
}