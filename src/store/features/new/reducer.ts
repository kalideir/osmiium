import { createReducer, createSlice } from '@reduxjs/toolkit'
import { init } from './actions'

type NewGameState = {
  numberofTests: number
  numberOfElements: number
}

const initialState: NewGameState = {
  numberofTests: 2,
  numberOfElements: 3,
}

export const newGameSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    //leave this empty
  },
  // extraReducers: (builder) => {},
})

export const newGameReducer = newGameSlice.reducer
