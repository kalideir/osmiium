import { GameSteps } from '.'
import { Alert } from '..'
import { selectNewGameState } from '../../store/features/new'
import { useAppSelector } from '../../store/hooks'

export default function NewGameForm() {
  const newGameState = useAppSelector(selectNewGameState)

  return (
    <div className="max-w-2xl mt-5 bg-zinc-200 dark:bg-zinc-900 rounded-lg py-10 mx-auto">
      {/* <div className="w-3/4"> */}
      <Alert
        show
        closable
        isVibile
        message="Double click and drag to select number of elements to memorize"
        autoHide={false}
        type="success"
      />
      <GameSteps />
      {/* </div> */}
    </div>
  )
}
