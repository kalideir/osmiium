import StepFactory from './StepFactory';
import { BaseStep } from './Steps';
import { StepType } from '../../types';

export interface IGame {
  stepFactory: StepFactory;
  steps: BaseStep[];
  isLoadedFromCache: boolean;
  numberOfElements: number;
  speed: number;

  reportResults(): unknown;
  reportScore(): unknown;

  makeSteps(): void;
}

// A game where each step has the same random type
export default abstract class BaseGame implements IGame {
  stepFactory: StepFactory;
  steps: BaseStep[];
  isLoadedFromCache: boolean;
  numberOfElements: number;
  speed: number;
  stepsKeys: StepType[];
  tokenSize: number;

  constructor(numberOfElements: number, speed: number, stepsKeys: StepType[], tokenSize: number) {
    this.stepFactory = new StepFactory();
    this.numberOfElements = numberOfElements;
    this.speed = speed;
    this.stepsKeys = stepsKeys;
    this.steps = [];
    this.isLoadedFromCache = false;
    this.tokenSize = tokenSize;
  }

  reportResults(): unknown {
    throw new Error('Method not implemented.');
  }
  reportScore(): unknown {
    throw new Error('Method not implemented.');
  }

  makeSteps() {
    throw new Error('Method not implemented.');
  }
}
