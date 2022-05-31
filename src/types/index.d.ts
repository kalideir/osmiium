import { types } from '../utils';

export interface INewGameContext {
  id: string | null;
  numberOfScreens: number;
  numberOfItemsPerScreen: number;
}
export type TypeKey = typeof types[number];

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type StepType =
  | 'NUMBER'
  | 'IMAGE'
  | 'ADDRESS'
  | 'ANIMAL'
  | 'COLOR'
  | 'COMMERCE'
  | 'COMPANY'
  | 'DATE'
  | 'NAME'
  | 'PHONE'
  | 'RANDOM'
  | 'WORD'
  | 'FINANCE';

export type GameType = 'SINGLE_TYPE' | 'MIXED';

export type SettingName = 'numberofTests' | 'tokenSize' | 'numberOfElements' | 'speed';

export type StepElement<T extends number | string> = {
  isAnswer: boolean;
  value: T;
};
