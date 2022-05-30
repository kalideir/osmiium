export default interface BaseStep {
  name: string
  answer: unknown[]
  elements: unknown[]
  calculateAnswer(): unknown
  generateElements(): unknown[]
}
