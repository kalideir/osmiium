import type GameFactory from '../GameFactory'
import { IGame } from '../GameFactory'
import StepFactory from '../StepFactory'
import BaseStep from './BaseStep'

export default class SingleTypedGame implements GameFactory {
  stepFactory: StepFactory
  steps: BaseStep[]
  isLoadedFromCache: boolean

  constructor() {
    this.stepFactory = new StepFactory()
    this.steps = []
    this.isLoadedFromCache = false
  }

  reportResults(): unknown {
    throw new Error('Method not implemented.')
  }
  reportScore(): unknown {
    throw new Error('Method not implemented.')
  }

  makeSteps(stepsKeys: string[]) {
    stepsKeys.forEach((key) => {
      const step = this.stepFactory.makeStep(key, '', 3)
      if (step) this.steps.push()
    })
  }
}
