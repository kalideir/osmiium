import clsx from 'clsx';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import {
  selectNewGameState,
  selectStepElement,
  selectUserAnswers,
} from '../../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { StepType } from '../../../types';

interface Props {
  stepKey: StepType;
  value: string;
  index: number;
  isAnswer: boolean;
}

function Value({ stepKey, value }: Omit<Props, 'index' | 'isAnswer'>) {
  if (stepKey === 'IMAGE') {
    return (
      <div className={`rounded-md shdow-lg`} style={{ width: '100%', height: '100%' }}>
        <Image
          src={value}
          alt=""
          title=""
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
        />
      </div>
    );
  }
  if (stepKey === 'DATE') {
    return (
      <div className={`flex h-full w-full items-center justify-center rounded-md shdow-lg`}>
        {moment(value).isValid() ? moment(value).format('YYYY/MM/DD HH:mm') : value}
      </div>
    );
  } else {
    return (
      <div
        className={clsx(
          value.length > 10 && 'text-sm',
          `h-full w-full flex items-center justify-center rounded-md shdow-lg`
        )}
      >
        {value}
      </div>
    );
  }
}

function Wrapper({ stepKey, value, isAnswer, index }: Props) {
  const newGameState = useAppSelector(selectNewGameState);
  const userAnswers = useAppSelector(selectUserAnswers);
  const dispatch = useAppDispatch();
  const isClickable = useRef(true);
  const selectCount = userAnswers[newGameState.currentStepIndex]?.length || 0;
  const selectElement = () => {
    !newGameState.isMemorizeWindow &&
      selectCount < newGameState.numberOfElements &&
      dispatch(selectStepElement({ stepIndex: newGameState.currentStepIndex, value }));
    isClickable.current = false;
  };

  const hasAnimated = useRef(false);
  const noAnimationVarient = { opacity: 1, translateX: 0, translateY: 0 };
  useEffect(() => {
    hasAnimated.current = true;
  }, []);

  const currStepWasAnimated = useMemo(
    () =>
      !newGameState.isMemorizeWindow &&
      newGameState.lastAnimatedStep === newGameState.currentStepIndex,
    [newGameState.lastAnimatedStep, newGameState.isMemorizeWindow, newGameState.currentStepIndex]
  );

  const isSelected = useMemo(
    () => userAnswers[newGameState.currentStepIndex]?.includes(value),
    [newGameState.currentStepIndex, userAnswers, value]
  );

  return (
    <motion.div
      className={clsx(
        'bg-indigo-500 box-border rounded-md relative',
        stepKey !== 'IMAGE' && 'h-20',
        !newGameState.isMemorizeWindow && 'cursor-pointer',
        isSelected && !isAnswer && 'bg-red-500',
        isSelected && isAnswer && 'bg-green-500'
      )}
      initial={
        currStepWasAnimated
          ? noAnimationVarient
          : {
              opacity: 0,
              translateX: -50,
              translateY: -50,
            }
      }
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 2 }}
      onClick={() => !isSelected && selectElement()}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Value stepKey={stepKey} value={value} />
      {isSelected && (
        <div
          className={clsx(
            'absolute top-1 left-1 flex items-center justify-center h-7 w-7 rounded-full',
            stepKey !== 'IMAGE' && 'hidden',
            isAnswer && 'bg-green-500',
            !isAnswer && 'bg-red-500'
          )}
        >
          {isAnswer ? <BsCheck className="" /> : <BsX />}
        </div>
      )}
    </motion.div>
  );
}

export default memo(Wrapper);
