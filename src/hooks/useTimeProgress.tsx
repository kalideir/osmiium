import { useEffect, useRef, useState } from 'react';
import { selectNewGameState } from '../store/features/new';
import { useAppSelector } from '../store/hooks';
import { Period } from '../types';

export default function useTimeProgress(period: Period): [number, (value: number) => void] {
  const initDateRef = useRef(Date.now());
  const newGameState = useAppSelector(selectNewGameState);
  const [percentage, setPercentage] = useState(0);
  console.log(initDateRef.current, 'x');

  useEffect(() => {
    initDateRef.current = Date.now();
    setPercentage(0);
  }, [newGameState.currentStepIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = Date.now();
      const diff = (currentDate - initDateRef.current) / 1000;
      if (diff <= period) setPercentage(diff / period);
      else clearInterval(interval);
    }, 1);

    return () => clearInterval(interval);
  }, [period]);

  return [percentage, setPercentage];
}
