import { createElement } from 'react';
import { StepType } from '../../../types';
import { GenericStep } from '../Steps';

export default class StepFactory {
  static makeStep(stepKey: StepType): JSX.Element | undefined {
    return createElement(GenericStep, { stepKey });
  }
}
