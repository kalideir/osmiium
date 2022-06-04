import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  selectNewGameState,
  selectUserAnswers,
  setCurrentStepIndex,
  setIsMemorizeWindow,
  setLastAnimatedStep,
} from '../../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { StepElement, StepType } from '../../../types';
import { shuffle } from '../../../utils';
import Value from './Value';

interface Props {
  stepKey: StepType;
  elements: StepElement<string>[];
}

export default function GenericStep({ stepKey, elements }: Props) {
  const newGameState = useAppSelector(selectNewGameState);
  const initDate = useRef(Date.now());
  const dispatch = useAppDispatch();
  const userAnswers = useAppSelector(selectUserAnswers);

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

  const moveNext = useCallback(() => {
    return dispatch(setCurrentStepIndex(newGameState.currentStepIndex + 1));
  }, [dispatch, newGameState.currentStepIndex]);

  const currElements = useMemo(
    () =>
      shuffle(
        elements.filter((element) => (newGameState.isMemorizeWindow ? element.isAnswer : !!element))
      ),
    [newGameState.isMemorizeWindow, elements]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      !newGameState.isMemorizeWindow &&
        dispatch(setLastAnimatedStep(newGameState.currentStepIndex));
    }, 200);
    return () => clearTimeout(timeout);
  }, [newGameState.currentStepIndex, newGameState.isMemorizeWindow, dispatch]);

  useEffect(() => {
    /*
    user has used all his chances
    */
    if (
      userAnswers[newGameState.currentStepIndex]?.length === newGameState.numberOfElements &&
      newGameState.currentStepIndex < newGameState.steps.length - 1
    ) {
      const timeout = setTimeout(() => {
        moveNext();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [
    userAnswers,
    newGameState.currentStepIndex,
    newGameState.numberOfElements,
    moveNext,
    newGameState.steps.length,
  ]);

  return (
    <>
      <div
        className="grid w-full mt-10 gap-3 text-white text-center text-xl font-bold"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}
      >
        {currElements.map((element, index) => (
          <Value
            isAnswer={element.isAnswer}
            stepKey={stepKey}
            value={element.value}
            key={`${index * Math.random() * 1000}`} // to show motion's animations
            index={index}
          />
        ))}
      </div>
      {!newGameState.isMemorizeWindow &&
        newGameState.currentStepIndex < newGameState.steps.length - 1 && (
          <div className="flex space-x-2 mt-10 justify-center">
            <button
              onClick={moveNext}
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Next
            </button>
          </div>
        )}
    </>
  );
}
