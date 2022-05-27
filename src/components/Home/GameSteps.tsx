import { useEffect } from 'react'
import { types } from '../../utils'
import GameType from './GameType'

export default function GameSteps() {
  useEffect(() => {
    console.log(window.innerWidth)
  })
  return (
    <div className="mx-5 grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-2 px-5 sm:px-1 xs:px-1">
      {types.map((type) => (
        <GameType key={type} type={type} />
      ))}
    </div>
  )
}
