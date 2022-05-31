import { StepType } from '../../../types';

export default interface IStep {
  name: string;
  type: StepType | undefined;
  answer: unknown[];
  elements: unknown[];
  calculateAnswer(): unknown;
  generateElements(): void;
}

export abstract class BaseStep<T> implements IStep {
  name: string;
  numberOfElements: number;
  showsTimer: boolean;
  answer: unknown[];
  elements: T[];
  type: StepType | undefined;
  tokenSize?: number;

  constructor(name: string, numberOfElements: number, showsTimer = false, tokenSize?: number) {
    this.name = name;
    this.numberOfElements = numberOfElements;
    this.showsTimer = showsTimer;
    this.answer = [];
    this.elements = [];
    this.tokenSize = tokenSize;
  }

  calculateAnswer(): unknown {
    throw new Error('Method not implemented.');
  }
  generateElements() {
    throw new Error('Method not implemented.');
  }
}
