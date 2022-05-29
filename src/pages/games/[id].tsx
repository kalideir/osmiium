import React from 'react'
import { MultiStepProgressBar } from '../../components'

function Game() {
  return (
    <div className="py-7 bg-zinc-100 dark:bg-zinc-900 mx-auto rounded-lg">
      <div className="px-5">
        <MultiStepProgressBar steps={4} period={2} />
      </div>
    </div>
  )
}

export default Game
