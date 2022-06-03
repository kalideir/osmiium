import { Component } from 'react';
import { SingleTypedGame } from '..';
import { GameType } from '../../../types';

export default class GameFactory extends Component<{ gameType: GameType }> {
  render(): JSX.Element {
    return this.props.gameType === 'SINGLE_TYPE' ? <SingleTypedGame /> : <></>;
  }
}
