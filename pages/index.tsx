import React, { useEffect } from 'react'
import Selecto from 'react-selecto'

export interface DragScrollOptions {
  container: HTMLDivElement
  threshold?: number
  getScrollPosition?: (param: { container: HTMLElement; direction: number[] }) => number[]
  throttleTime?: number
  useScroll?: boolean
}

export default function App() {
  const [scrollOptions, setScrollOptions] = React.useState<DragScrollOptions>()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const cubes = []

  for (let i = 0; i < 10 * 10; ++i) {
    cubes.push(i)
  }

  useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current as HTMLDivElement,
      throttleTime: 30,
      threshold: 0,
    })
  }, [])

  return (
    <div className="app">
      <div className="container">
        <Selecto
          dragContainer={'.elements'}
          selectableTargets={['.selecto-area .cube']}
          hitRate={100}
          selectByClick={true}
          selectFromInside={false}
          toggleContinueSelect={['shift']}
          ratio={0}
          scrollOptions={scrollOptions}
          onDragStart={(e) => {
            if (e.inputEvent.target.nodeName === 'BUTTON') {
              return false
            }
            return true
          }}
          onSelect={(e) => {
            e.added.forEach((el) => {
              el.classList.add('selected')
            })
            e.removed.forEach((el) => {
              el.classList.remove('selected')
            })
          }}
          onScroll={(e) => {
            scrollerRef.current?.scrollBy(e.direction[0] * 10, e.direction[1] * 10)
          }}
        ></Selecto>

        <div className="elements scroll selecto-area" id="selecto1" ref={scrollerRef}>
          {cubes.map((i) => (
            <div className="cube" key={i}></div>
          ))}
        </div>
        <div className="empty elements"></div>
      </div>
    </div>
  )
}
