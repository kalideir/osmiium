import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  selectStepElement,
  setCurrentStepIndex,
  setIsMemorizeWindow,
  setLastAnimatedStep,
  setSettingValue,
  setStepsState,
  toggleSelect,
  toggleTypesVisibility,
} from '.';
import { StepData, TypeKey } from '../../../types';
import { init } from './actions';

type NewGameState = {
  tokenSize: number;
  numberofTests: number;
  numberOfElements: number;
  speed: number;
  selectedTypes: TypeKey[];
  typesVisible: boolean;
  isInitialized: boolean;
  steps: StepData[];
  currentStepIndex: number;
  isMemorizeWindow: boolean;
  userAnswers: { [stepIndex: number]: { value: string; isAnswer: boolean }[] };
  lastAnimatedStep: number;
  showResults: boolean;
};

const initialState: NewGameState = {
  numberofTests: 0,
  tokenSize: 3,
  numberOfElements: 3,
  speed: 5,
  selectedTypes: [],
  typesVisible: true,
  isInitialized: false,
  steps: [],
  currentStepIndex: 0,
  isMemorizeWindow: true,
  userAnswers: [],
  lastAnimatedStep: -1,
  showResults: false,
};

export const newGameSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    showResults: (state, action: PayloadAction<boolean>) => {
      state.showResults = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleSelect, (state, action) => {
        if (!state.selectedTypes.includes(action.payload)) {
          state.selectedTypes.push(action.payload);
          state.numberofTests = state.selectedTypes.length;
          return;
        }
        state.selectedTypes = state.selectedTypes.filter((type) => type !== action.payload);
        state.numberofTests = state.selectedTypes.length;
      })
      .addCase(toggleTypesVisibility, (state, action) => {
        state.typesVisible = action.payload;
      })
      .addCase(init, (state) => {
        state.isInitialized = true;
      })
      .addCase(setSettingValue, (state, action) => {
        state[action.payload.name] = action.payload.value;
      })
      .addCase(setStepsState, (state, action) => {
        state.steps = action.payload;
      })
      .addCase(setCurrentStepIndex, (state, action) => {
        state.currentStepIndex = action.payload;
        state.isMemorizeWindow = true;
      })
      .addCase(setIsMemorizeWindow, (state, action) => {
        state.isMemorizeWindow = action.payload;
      })
      .addCase(setLastAnimatedStep, (state, action) => {
        state.lastAnimatedStep = action.payload;
      })
      .addCase(selectStepElement, (state, action) => {
        state.userAnswers[action.payload.stepIndex] = [
          ...(state.userAnswers[action.payload.stepIndex] || []),
          { value: action.payload.value, isAnswer: action.payload.isAnswer },
        ];
      });
  },
});

export const newGameReducer = newGameSlice.reducer;

export const { showResults, reset } = newGameSlice.actions;
