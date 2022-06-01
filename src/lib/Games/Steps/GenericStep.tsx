import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  selectIsGameReady,
  selectNewGameState,
  selectSteps,
  setStepsState,
} from '../../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { StepElement, StepType } from '../../../types';
import { shuffle } from '../../../utils';
import { generateStepElements } from '../utils/generator';

interface Props {
  stepKey: StepType;
}

export default function GenericStep({ stepKey }: Props) {
  const newGameState = useAppSelector(selectNewGameState);
  const stepsState = useAppSelector(selectSteps);
  const dispatch = useAppDispatch();
  const isReadyState = useAppSelector(selectIsGameReady);

  const generateElements = useCallback(
    (isAnswer = false) => {
      return generateStepElements(
        stepKey,
        newGameState.numberOfElements,
        newGameState.tokenSize,
        isAnswer
      );
    },
    [newGameState.numberOfElements, newGameState.tokenSize, stepKey]
  );

  useEffect(() => {
    if (isReadyState) {
      dispatch(
        setStepsState({
          stepKey,
          target: 'elements',
          value: [...generateElements(true), ...generateElements(false)],
        })
      );
    }
  }, [generateElements, dispatch, stepKey, isReadyState]);

  return (
    <div className="flex items-center justify-center flex-wrap w-full mt-10 gap-3">
      {[].map((element, index) => (
        <motion.div
          className={`bg-blue-500 h-24 min-w-1/5 flex items-center font-bold justify-center rounded-md text-2xl shdow-lg`}
          key={index}
        >
          {/* {stepKey === "IMAGE" ? : element.value} */}
        </motion.div>
      ))}
    </div>
  );
}
