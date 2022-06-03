import { types } from '../utils';

export interface INewGameContext {
  id: string | null;
  numberOfScreens: number;
  numberOfItemsPerScreen: number;
}
export type TypeKey = typeof types[number];

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type StepType =
  | 'ADDRESS'
  | 'ANIMAL'
  | 'COLOR'
  | 'COMMERCE'
  | 'COMPANY'
  | 'DATE'
  | 'IMAGE'
  | 'NAME'
  | 'PHONE'
  | 'RANDOM'
  | 'NUMBER'
  | 'EMOJI'
  | 'EMAIL'
  | 'WORD'
  | 'FINANCE'
  | 'FILE';

export type GameType = 'SINGLE_TYPE' | 'MIXED';

export type SettingName = 'numberofTests' | 'tokenSize' | 'numberOfElements' | 'speed';

export type StepElement<T extends number | string | Date> = {
  isAnswer: boolean;
  value: T;
  isEnded: boolean;
};

export interface IGame {
  stepFactory: StepFactory;
  steps: BaseStep[];
  isLoadedFromCache: boolean;
  numberOfElements: number;
  speed: number;
}

export default interface IStep {
  name: string;
  type: StepType | undefined;
  answer: unknown[];
  elements: unknown[];
}

export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type StepData = { key: StepType; elements: StepElement<string>[] };
