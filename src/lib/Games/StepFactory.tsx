import { StepType } from '../../types';
import { BaseStep, NumberStep } from './Steps';

export default class StepFactory {
  makeStep(
    stepKey: StepType,
    name: string,
    numberOfElements: number,
    showsTimer: boolean,
    tokenSize: number
  ): BaseStep | undefined {
    if (stepKey === 'NUMBER') return new NumberStep(name, numberOfElements, showsTimer, tokenSize);
  }
}
