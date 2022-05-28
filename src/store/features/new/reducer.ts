import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toggleSelect, toggleTypesVisibility } from '.'
import { TypeKey } from '../../../types'
import { init } from './actions'

type NewGameState = {
  numberofTests: number
  numberOfElements: number
  selectedTypes: TypeKey[]
  typesVisible: boolean
}

const initialState: NewGameState = {
  numberofTests: 2,
  numberOfElements: 3,
  selectedTypes: [],
  typesVisible: true,
}

export const newGameSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    //leave this empty
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleSelect, (state, action) => {
        if (!state.selectedTypes.includes(action.payload)) {
          state.selectedTypes.push(action.payload)
          return
        }
        state.selectedTypes = state.selectedTypes.filter((type) => type !== action.payload)
      })
      .addCase(toggleTypesVisibility, (state, action) => {
        state.typesVisible = action.payload
      })
  },
})

export const newGameReducer = newGameSlice.reducer
