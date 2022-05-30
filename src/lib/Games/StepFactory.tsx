import { BaseStep, NumericStep } from './Steps'

export default class StepFactory {
  makeStep(
    stepKey: 'NUMERIC' | string,
    name: string,
    numberOfElements: number
  ): BaseStep | undefined {
    if (stepKey === 'NUMERIC') return new NumericStep(name, numberOfElements)
  }
}
