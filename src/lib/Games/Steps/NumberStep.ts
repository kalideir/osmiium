import { faker } from '@faker-js/faker';
import { StepElement } from '../../../types';
import { arrayFromT, shuffle } from '../../../utils';
import { BaseStep } from './BaseStep';

export default class NumberStep extends BaseStep<StepElement<number>> {
  constructor(name: string, numberOfElements: number, showsTimer = false, tokenSize: number) {
    super(name, numberOfElements, showsTimer);
    this.tokenSize = tokenSize;
    this.type = 'NUMBER';
  }

  generateElements() {
    // 50% correct asnwers ratio
    const elements = [
      ...arrayFromT<StepElement<number>>(this.numberOfElements, () => ({
        isAnswer: true,
        value: +faker.random.numeric(this.tokenSize),
      })),
      ...arrayFromT<StepElement<number>>(this.numberOfElements, () => ({
        isAnswer: false,
        value: +faker.random.numeric(this.tokenSize),
      })),
    ];
    this.elements = shuffle(elements);
  }

  calculateAnswer(): unknown {
    throw new Error('Method not implemented.');
  }
}
