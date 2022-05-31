import { StepType } from '../../types';
import { BaseStep, NumericStep } from './Steps';

export default class StepFactory {
  makeStep(stepKey: StepType, name: string, numberOfElements: number): BaseStep | undefined {
    if (stepKey === 'NUMBER') return new NumericStep(name, numberOfElements);
  }
}
