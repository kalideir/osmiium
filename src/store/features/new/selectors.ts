import { RootState } from '../..'

export const selectNewGameState = (state: RootState) => state.new

export const selectTypesVisible = (state: RootState) => state.new.typesVisible

export const selectSelectedTypes = (state: RootState) => state.new.selectedTypes
