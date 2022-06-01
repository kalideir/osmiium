import { createSlice } from '@reduxjs/toolkit';
import { setSettingValue, setStepsState, toggleSelect, toggleTypesVisibility } from '.';
import { StepType, TypeKey } from '../../../types';
import { init } from './actions';

type NewGameState = {
  tokenSize: number;
  numberofTests: number;
  numberOfElements: number;
  speed: number;
  selectedTypes: TypeKey[];
  typesVisible: boolean;
  isInitialized: boolean;
  steps: {
    [key: string]: {
      isStarted: boolean;
      isEnded: boolean;
      elements: string[];
    };
  };
};

// [key in Partial<StepType>]: {
//   isStarted: boolean;
//   isEnded: boolean;
//   elements: string[];
// };

const initialState: NewGameState = {
  numberofTests: 2,
  tokenSize: 3,
  numberOfElements: 3,
  speed: 5,
  selectedTypes: [],
  typesVisible: true,
  isInitialized: false,
  steps: {},
};

export const newGameSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleSelect, (state, action) => {
        if (!state.selectedTypes.includes(action.payload)) {
          state.selectedTypes.push(action.payload);
          return;
        }
        state.selectedTypes = state.selectedTypes.filter((type) => type !== action.payload);
      })
      .addCase(toggleTypesVisibility, (state, action) => {
        state.typesVisible = action.payload;
      })
      .addCase(init, (state, action) => {
        state.isInitialized = true;
      })
      .addCase(setSettingValue, (state, action) => {
        state[action.payload.name] = action.payload.value;
      })
      .addCase(setStepsState, (state, action) => {
        state.steps[action.payload.stepKey] = {
          ...state.steps[action.payload.stepKey],
          [action.payload.target]: action.payload.value,
        };
      });
  },
});

export const newGameReducer = newGameSlice.reducer;
