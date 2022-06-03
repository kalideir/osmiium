/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { StepType } from '../../../types';

interface Props {
  stepKey: StepType;
  value: string;
  index: number;
}

function Value({ stepKey, value }: Omit<Props, 'index'>) {
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
          objectFit="contain"
        />
      </div>
    );
  }
  if (stepKey === 'DATE') {
    return (
      <div
        className={`bg-blue-500 h-24 w-full flex items-center justify-center rounded-md shdow-lg`}
      >
        {moment(value).isValid() ? moment(value).format('YYYY/MM/DD HH:mm') : value}
      </div>
    );
  } else {
    return (
      <div
        className={`bg-blue-500 h-24 w-full flex items-center justify-center rounded-md shdow-lg`}
      >
        {value}
      </div>
    );
  }
}

function Wrapper({ stepKey, value, index }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
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

export default Wrapper;
