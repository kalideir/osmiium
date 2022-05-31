import { StepType } from '../../types';
import { IGame } from './GameFactory';
import StepFactory from './StepFactory';
import BaseStep from './Steps/BaseStep';

export default class SingleTypedGame implements IGame {
  stepFactory: StepFactory;
  steps: BaseStep[];
  isLoadedFromCache: boolean;
  numberOfElements: number;
  speed: number;
  stepsKeys: StepType[];

  constructor(numberOfElements: number, speed: number, stepsKeys: StepType[]) {
    this.stepFactory = new StepFactory();
    this.numberOfElements = numberOfElements;
    this.speed = speed;
    this.stepsKeys = stepsKeys;
    this.steps = [];
    this.isLoadedFromCache = false;
  }

  reportResults(): unknown {
    throw new Error('Method not implemented.');
  }
  reportScore(): unknown {
    throw new Error('Method not implemented.');
  }

  makeSteps() {
    this.stepsKeys.forEach((key) => {
      const step = this.stepFactory.makeStep(key, 'game 1', 3);
      if (step) {
        step.generateElements();
        this.steps.push(step);
      }
    });
  }
}
