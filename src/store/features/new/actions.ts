import { createAction } from '@reduxjs/toolkit';
import { SettingName, StepData, TypeKey } from '../../../types';

export const init = createAction('new/init');

export const toggleSelect = createAction<TypeKey>('new/selectType');

export const setSettingValue = createAction<{ name: SettingName; value: number }>(
  'new/setSettingValue'
);

export const setStepsState = createAction<StepData[]>('new/setStepsState');

export const toggleTypesVisibility = createAction<boolean>('new/toggleTypesVisibility');

export const setCurrentStepIndex = createAction<number>('new/setCurrentStepIndex');

export const setIsMemorizeWindow = createAction<boolean>('new/setIsMemorizeWindow');

export const setLastAnimatedStep = createAction<number>('new/setLastAnimatedStep');

export const selectStepElement = createAction<{ stepIndex: number; value: string }>(
  'new/selectStepElement'
);
