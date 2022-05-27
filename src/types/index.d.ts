import { types } from '../utils'

export interface INewGameContext {
  id: string | null
  numberOfScreens: number
  numberOfItemsPerScreen: number
}
export type TypeKey = typeof types[number]
