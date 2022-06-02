import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { StepProgressBar } from '../../components';
import { selectNewGameState, setStepsState } from '../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StepData } from '../../types';
import { arrayFromT } from '../../utils';
import { GenericStep } from './Steps';
import { generateStepElements } from './utils/generator';

export default function SingleTypedGame() {
  const newGameState = useAppSelector(selectNewGameState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const n = Math.floor(newGameState.numberofTests / newGameState.selectedTypes.length);
    console.log({ n }, newGameState.numberofTests, newGameState.selectedTypes.length);

    const stepsData = newGameState.selectedTypes.reduce<StepData[]>((acc, key) => {
      const stepRepeated = arrayFromT(n, (_) => ({
        key,
        elements: generateStepElements(
          key,
          newGameState.numberOfElements * 2,
          newGameState.tokenSize
        ),
      }));
      acc = [...acc, ...stepRepeated];
      return acc;
    }, []);

    dispatch(setStepsState(stepsData));
  }, [
    dispatch,
    newGameState.numberOfElements,
    newGameState.numberofTests,
    newGameState.selectedTypes,
    newGameState.tokenSize,
  ]);

  const currentStep = useMemo(
    () => newGameState.steps[newGameState.currentStepIndex],
    [newGameState.currentStepIndex, newGameState.steps]
  );

  return (
    <motion.div className="w-full">
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg">
        <StepProgressBar />
      </div>
      {currentStep && <GenericStep stepKey={currentStep.key} elements={currentStep.elements} />}
    </motion.div>
  );
}
