import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { selectNewGameState, setStepsState } from '../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StepsData } from '../../types';
import { GenericStep } from './Steps';
import { generateStepElements } from './utils/generator';

export default function SingleTypedGame() {
  const newGameState = useAppSelector(selectNewGameState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stepsData: StepsData = {};
    newGameState.selectedTypes.forEach((key) => {
      stepsData[key] = generateStepElements(
        key,
        newGameState.numberOfElements * 2,
        newGameState.tokenSize
      );
    });
    dispatch(setStepsState(stepsData));
  }, [dispatch, newGameState.numberOfElements, newGameState.selectedTypes, newGameState.tokenSize]);

  const steps = newGameState.selectedTypes.map((key) => <GenericStep stepKey={key} key={key} />);
  return <motion.div className="w-full">{steps}</motion.div>;
}
