import React, { LegacyRef, useEffect, useMemo, useRef, useState } from 'react'

import { NewGameForm } from '../components'

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="p-3">
      <div className="py-7 bg-zinc-100 dark:bg-zinc-900 max-w-2xl mx-auto rounded-lg">
        <h3 className="text-3xl text-center font-bold text-zinc-100 hover:text-indigo-500 hover:dark:text-indigo-600">
          Let&apos;s create your game
        </h3>
      </div>
      <NewGameForm />
    </div>
  )
}
