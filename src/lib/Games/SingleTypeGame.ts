import { StepType } from '../../types';
import BaseGame from './BaseGame';

// A game where each step has the same random type
export default class SingleTypedGame extends BaseGame {
  constructor(numberOfElements: number, speed: number, stepsKeys: StepType[], tokenSize: number) {
    super(numberOfElements, speed, stepsKeys, tokenSize);
  }

  reportResults(): unknown {
    throw new Error('Method not implemented.');
  }
  reportScore(): unknown {
    throw new Error('Method not implemented.');
  }

  makeSteps() {
    this.stepsKeys.forEach((key) => {
      const step = this.stepFactory.makeStep(
        key,
        'Game ' + key,
        this.numberOfElements,
        true,
        this.tokenSize
      );
      if (step) {
        step.generateElements();
        this.steps.push(step);
      }
    });
  }
}
