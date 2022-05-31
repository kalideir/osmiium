import { SingleTypedGame } from '.';
import { GameType, StepType } from '../../types';

export default class GameFactory {
  makeGame(
    gameType: GameType,
    stepsKeys: StepType[],
    numberOfElements: number,
    speed: number,
    tokenSize: number
  ): SingleTypedGame | undefined {
    if (gameType === 'SINGLE_TYPE') {
      return new SingleTypedGame(numberOfElements, speed, stepsKeys, tokenSize);
    }
  }
}
