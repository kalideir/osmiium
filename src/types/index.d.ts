import { number } from 'yup/lib/locale'
import { types } from '../utils'

export interface INewGameContext {
  id: string | null
  numberOfScreens: number
  numberOfItemsPerScreen: number
}
export type TypeKey = typeof types[number]

export type Period = 1 | 2 | 3 | 4 | 5
