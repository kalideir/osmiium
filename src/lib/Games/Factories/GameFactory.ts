import { createElement } from 'react';
import { SingleTypedGame } from '..';
import { GameType } from '../../../types';

export default class GameFactory {
  static makeGame(gameType: GameType): JSX.Element | undefined {
    if (gameType === 'SINGLE_TYPE') return createElement(SingleTypedGame);
  }
}
