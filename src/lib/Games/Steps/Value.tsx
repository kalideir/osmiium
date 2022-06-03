/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { memo } from 'react';
import { StepType } from '../../../types';

interface Props {
  stepKey: StepType;
  value: string;
}

function Value({ stepKey, value }: Props) {
  if (stepKey === 'IMAGE') {
    return (
      <motion.div className={`h-full w-full flex items-center justify-center rounded-md shdow-lg`}>
        <img src={value} alt="value" className="w-full h-full" />
      </motion.div>
    );
  }
  if (stepKey === 'DATE') {
    return (
      <motion.div
        className={`bg-blue-500 h-24 w-full flex items-center justify-center rounded-md shdow-lg`}
      >
        {moment(value).isValid() ? moment(value).format('YYYY/MM/DD HH:mm') : value}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        // style={{ minWidth: '10rem' }}
        className={`bg-blue-500 h-24 w-full flex items-center justify-center rounded-md shdow-lg`}
      >
        {value}
      </motion.div>
    );
  }
}

export default memo(Value);
