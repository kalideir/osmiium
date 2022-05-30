import BaseStep from './BaseStep'
import StepConfig from './Config'

export default class NumericStep extends StepConfig implements BaseStep {
  name: string
  numberOfElements: number
  showsTimer: boolean
  answer: unknown[]
  elements: unknown[]

  constructor(name: string, numberOfElements: number, showsTimer = false) {
    super()
    this.name = name
    this.numberOfElements = numberOfElements
    this.showsTimer = showsTimer
    this.answer = []
    this.elements = []
  }
  generateElements(): unknown[] {
    throw new Error('Method not implemented.')
  }

  calculateAnswer(): unknown {
    throw new Error('Method not implemented.')
  }
}
