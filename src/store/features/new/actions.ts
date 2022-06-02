import { createAction } from '@reduxjs/toolkit';
import { SettingName, StepsData, TypeKey } from '../../../types';

export const init = createAction('new/init');

export const toggleSelect = createAction<TypeKey>('new/selectType');

export const setSettingValue = createAction<{ name: SettingName; value: number }>(
  'new/setSettingValue'
);

export const setStepsState = createAction<StepsData>('new/setStepsState');

export const toggleTypesVisibility = createAction<boolean>('new/toggleTypesVisibility');
