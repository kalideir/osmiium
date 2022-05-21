import * as React from 'react'
import Selecto from 'react-selecto'
import { DragScrollOptions } from '../../types'

export default function GameSteps() {
  const [scrollOptions, setScrollOptions] = React.useState<DragScrollOptions>()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const cubes = []

  for (let i = 0; i < 10 * 10; ++i) {
    cubes.push(i)
  }

  React.useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current as HTMLElement,
      throttleTime: 30,
      threshold: 0,
    })
  }, [])

  return (
    <div className="container px-5">
      <Selecto
        dragContainer={'.elements'}
        selectableTargets={['.selecto-area .cube']}
        hitRate={100}
        selectByClick={false}
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

      <div
        className="grid gap-4 elements scroll p-10 selecto-area cursor-crosshair self-center dark:bg-zinc-900 bg-zinc-100 border rounded-md border-zinc-100 dark:border-zinc-800"
        id="selecto1"
        ref={scrollerRef}
        style={{
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          // padding: '2rem',
        }}
      >
        {cubes.map((i) => (
          <div
            className="cube w-6 cursor-none h-6 mx-auto bg-indigo-500 rounded-full"
            key={i}
          ></div>
        ))}
      </div>
      <div className="empty elements"></div>
    </div>
  )
}
