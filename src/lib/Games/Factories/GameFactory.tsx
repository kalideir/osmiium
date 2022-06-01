import { Component, ReactNode } from 'react';
import { SingleTypedGame } from '..';
import { GameType } from '../../../types';

export default class GameFactory extends Component<{ gameType: GameType }> {
  render(): ReactNode {
    return this.props.gameType === 'SINGLE_TYPE' ? <SingleTypedGame /> : null;
  }
}
