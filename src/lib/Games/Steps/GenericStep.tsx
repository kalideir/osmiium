import { useEffect, useMemo, useRef } from 'react';
import {
  selectNewGameState,
  setCurrentStepIndex,
  setIsMemorizeWindow,
} from '../../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { StepElement, StepType } from '../../../types';
import Value from './Value';

interface Props {
  stepKey: StepType;
  elements: StepElement<string>[];
}

export default function GenericStep({ stepKey, elements }: Props) {
  const newGameState = useAppSelector(selectNewGameState);
  const initDate = useRef(Date.now());
  const dispatch = useAppDispatch();

  useEffect(() => {
    initDate.current = Date.now();
  }, [newGameState.currentStepIndex]);

  useEffect(() => {
    if (newGameState.isMemorizeWindow) {
      const interval = setInterval(() => {
        const now = Date.now();
        if (now - initDate.current >= newGameState.speed) {
          dispatch(setIsMemorizeWindow(false));
        }
      }, newGameState.speed * 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, newGameState.isMemorizeWindow, newGameState.speed]);

  const moveNext = () => {
    dispatch(setCurrentStepIndex(newGameState.currentStepIndex + 1));
  };

  return (
    <>
      {newGameState.isMemorizeWindow ? 'memorize dude' : 'answer now'}
      <button onClick={() => moveNext()}>Move next</button>
      <div
        className="grid w-full mt-10 gap-3 text-white text-center text-xl font-bold"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}
      >
        {(elements || []).map((element, index) => (
          <Value stepKey={stepKey} value={element.value} key={index} />
        ))}
      </div>
    </>
  );
}
