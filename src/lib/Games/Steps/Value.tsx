/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
      <div
        className={`bg-indigo-500 h-24 w-auto flex items-center justify-center rounded-md shdow-lg`}
      >
        {moment(value).isValid() ? moment(value).format('YYYY/MM/DD HH:mm') : value}
      </div>
    );
  } else {
    return (
      <div
        className={clsx(
          value.length > 10 && 'text-sm',
          `bg-indigo-500 h-24 w-auto flex items-center justify-center rounded-md shdow-lg`
        )}
      >
        {value}
      </div>
    );
  }
}

function Wrapper({ stepKey, value, isAnswer, index }: Props) {
  const newGameState = useAppSelector(selectNewGameState);
  const [answered, setAnswered] = useState(false);
  const userAnswers = useAppSelector(selectUserAnswers);
  const dispatch = useAppDispatch();
  const selectCount = userAnswers[newGameState.currentStepIndex]?.length || 0;
  const selectElement = () => {
    !newGameState.isMemorizeWindow &&
      selectCount < newGameState.numberOfElements &&
      dispatch(selectStepElement({ stepIndex: newGameState.currentStepIndex, value }));
  };

  const wasAnimated = useRef(false);

  useEffect(() => {
    wasAnimated.current = true;
  }, []);

  return (
    <motion.div
      onClick={() => selectElement()}
      className={clsx(
        isAnswer && 'border-green-500 border p-3',
        !newGameState.isMemorizeWindow && 'cursor-pointer'
      )}
      viewport={{ once: true }}
      initial={{
        opacity: !wasAnimated.current ? 0 : 1,
        translateX: -50,
        translateY: -50,
      }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Value stepKey={stepKey} value={value} />
    </motion.div>
  );
}

export default memo(Wrapper);
