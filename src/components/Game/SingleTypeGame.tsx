import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { Results, StepProgressBar } from '.';
import { selectNewGameState, setStepsState, showResults } from '../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StepData } from '../../types';
import { arrayFromT, shuffle } from '../../utils';
import { generateStepElements, getRandomFn } from '../../utils/generator';
import { GenericStep } from './Steps';

export default function SingleTypedGame() {
  const newGameState = useAppSelector(selectNewGameState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const n = Math.floor(newGameState.numberofTests / newGameState.selectedTypes.length);
    const stepsData = newGameState.selectedTypes.reduce<StepData[]>((acc, key) => {
      const randomFc = getRandomFn(key);
      const stepRepeated = arrayFromT(n, (_) => ({
        key,
        elements: generateStepElements(
          randomFc,
          key,
          newGameState.numberOfElements * 2,
          newGameState.tokenSize
        ),
      }));
      acc = [...acc, ...stepRepeated];
      return acc;
    }, []);

    dispatch(setStepsState(shuffle([...stepsData])));
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

  // return <Results />;

  return (
    <motion.div className="w-full">
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 h-8 rounded-lg">
        {newGameState.isMemorizeWindow && <StepProgressBar />}
      </div>
      <div className="flex items-center justify-center mt-4 font-bold text-xl">{`${
        newGameState.currentStepIndex + 1
      } of ${newGameState.steps.length}`}</div>
      {currentStep && <GenericStep stepKey={currentStep.key} elements={currentStep.elements} />}
      {!newGameState.isMemorizeWindow &&
        newGameState.currentStepIndex === newGameState.steps.length - 1 && (
          <motion.div
            initial={true}
            animate={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-2 mt-10 justify-center">
              <button
                onClick={() => dispatch(showResults(true))}
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        )}
    </motion.div>
  );
}
