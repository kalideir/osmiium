import { GameSteps } from '.'
import { Alert } from '..'
import { selectNewGameState } from '../../store/features/new'
import { useAppSelector } from '../../store/hooks'
import StepsRangeInput from './StepsRangeInput'

export default function NewGameForm() {
  const newGameState = useAppSelector(selectNewGameState)

  return (
    <div className="max-w-2xl mt-5 bg-zinc-100 dark:bg-zinc-900 rounded-lg py-10 mx-auto">
      {/* <Alert
        show
        closable
        isVibile
        message="Select the types that you want to memorize"
        autoHide={false}
        type="success"
      /> */}
      <h2 className="text-xl text-center mb-6 font-bold tracking-wider">
        {`Select All Types To Memorize`.toUpperCase()}
      </h2>
      <GameSteps />
      <StepsRangeInput />
    </div>
  )
}
