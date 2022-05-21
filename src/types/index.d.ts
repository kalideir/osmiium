export interface INewGameContext {
  id: string | null
  numberOfScreens: number
  numberOfItemsPerScreen: number
}

export interface DragScrollOptions {
  container: HTMLElement
  threshold?: number
  getScrollPosition?: (param: { container: HTMLElement; direction: number[] }) => number[]
  throttleTime?: number
  useScroll?: boolean
}
