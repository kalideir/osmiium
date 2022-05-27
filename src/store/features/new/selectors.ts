import { RootState } from '../..'

export const selectNewGameState = (state: RootState) => state.new

export const selectSelectedTypes = (state: RootState) => state.new.selectedTypes
