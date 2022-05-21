import { selectNewGameState } from '../../store/features/new'
import { useAppSelector } from '../../store/hooks'

export default function NewGameForm() {
  const newGameState = useAppSelector(selectNewGameState)
  console.log({ newGameState })

  return (
    <div className="max-w-2xl mt-5 bg-zinc-200 dark:bg-zinc-900 rounded-lg py-10 mx-auto"></div>
  )
}
