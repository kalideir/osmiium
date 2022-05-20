import React, { LegacyRef, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { ThemeSwitch } from '../components/Layout'

export interface DragScrollOptions {
  container: HTMLDivElement
  threshold?: number
  getScrollPosition?: (param: { container: HTMLElement; direction: number[] }) => number[]
  throttleTime?: number
  useScroll?: boolean
}

export default function App() {
  const [scrollOptions, setScrollOptions] = useState<DragScrollOptions>()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current as HTMLDivElement,
      throttleTime: 30,
      threshold: 0,
    })
  }, [])

  return (
    <div className="p-3">
      <h3 className="text-2xl text-center font-bold text-indigo-600">
        Let&apos;s create your game
      </h3>
      <div className="max-w-2xl mt-10 bg-zinc-200 dark:bg-zinc-900 rounded-lg py-20 mx-auto">
        <div className="flex gap-4 px-10">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              # of tests
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              # of games per test
            </label>
          </div>
        </div>
        <button
          type="button"
          className="text-zinc-900 bg-white border border-zinc-300 focus:outline-none hover:bg-zinc-100 focus:ring-4 focus:ring-zinc-200 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 dark:focus:ring-zinc-700"
        >
          Light
        </button>
      </div>
    </div>
  )
}
