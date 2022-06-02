import { RootState } from '../..';

export const selectNewGameState = (state: RootState) => state.new;

export const selectTypesVisible = (state: RootState) => state.new.typesVisible;

export const selectSelectedTypes = (state: RootState) => state.new.selectedTypes;

export const selectIsGameReady = (state: RootState) =>
  state.new.isInitialized &&
  state.new.numberOfElements &&
  state.new.tokenSize &&
  state.new.selectedTypes.length;

export const selectSteps = (state: RootState) => state.new.steps;

export const selectCurrentStepIndex = (state: RootState) => state.new.currentStepIndex;

export const selectIsMemorizeWindow = (state: RootState) => state.new.isMemorizeWindow;
