import React from 'react';
import { StepType } from '../../../types';

interface Props {
  stepKey: StepType;
  value: string;
}

function Value({ stepKey, value }: Props) {
  return <div>Value</div>;
}

export default Value;
