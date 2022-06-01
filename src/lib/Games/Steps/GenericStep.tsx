import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { selectNewGameState } from '../../../store/features/new';
import { useAppSelector } from '../../../store/hooks';
import { StepElement, StepType } from '../../../types';
import { shuffle } from '../../../utils';
import { generateStepElements } from '../utils/generator';

interface Props {
  stepKey: StepType;
}

export default function GenericStep({ stepKey }: Props) {
  const [answers, setAnswers] = useState<StepElement<string>[]>([]);
  const [noise, setNoise] = useState<StepElement<string>[]>([]);
  const newGameState = useAppSelector(selectNewGameState);

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
    setAnswers(generateElements(true));
    setNoise(generateElements(false));
  }, [generateElements]);

  const isMemorizeScreen = false;

  const elements = isMemorizeScreen ? answers : shuffle([...answers, ...noise]);

  return (
    <div className="flex items-center justify-center flex-wrap w-full mt-10 gap-3">
      {elements.map((element, index) => (
        <motion.div
          className={`bg-blue-500 h-24 min-w-1/5 flex items-center font-bold justify-center rounded-md text-2xl shdow-lg`}
          key={index}
        >
          {element.value}
        </motion.div>
      ))}
    </div>
  );
}
