import React from 'react'
import { MultiStepProgressBar } from '../../components'

function Game() {
  return (
    <div className="mx-auto">
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg">
        <MultiStepProgressBar steps={4} period={2} />
      </div>
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg mt-5">
        <h3 className="uppercase text-xl text-center">GAME STEP</h3>
      </div>
    </div>
  )
}

export default Game
