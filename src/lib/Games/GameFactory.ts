import { SingleTypedGame } from '.';
import { GameType, StepType } from '../../types';
import StepFactory from './StepFactory';
import { BaseStep } from './Steps';

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
export default class GameFactory {
  makeGame(
    gameType: GameType,
    stepKeys: StepType[],
    numberOfElements: number,
    speed: number,
    tokenSize: number
  ): SingleTypedGame | undefined {
    if (gameType === 'SINGLE_TYPE') {
      return new SingleTypedGame(numberOfElements, speed, stepKeys);
    }
  }
}
