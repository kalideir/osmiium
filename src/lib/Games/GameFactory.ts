import StepFactory from './StepFactory'
import { BaseStep } from './Steps'

export interface IGame {
  steps: BaseStep[]
  isLoadedFromCache: boolean
}

export default interface GameFactory extends IGame {
  stepFactory: StepFactory
  makeSteps(stepsKeys: string[]): void
  reportResults(): unknown
  reportScore(): unknown
}
