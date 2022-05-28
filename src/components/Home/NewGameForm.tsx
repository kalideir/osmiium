import { GameSteps } from '.'
import {
  selectNewGameState,
  selectTypesVisible,
  toggleTypesVisibility,
} from '../../store/features/new'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { motion } from 'framer-motion'
import { BsChevronDown } from 'react-icons/bs'
import GameSettings from './GameSettings'

export default function NewGameForm() {
  const newGameState = useAppSelector(selectNewGameState)
  const typesVisibleState = useAppSelector(selectTypesVisible)
  const dispatch = useAppDispatch()

  const showTypes = () => dispatch(toggleTypesVisibility(true))

  const hideTypes = () => dispatch(toggleTypesVisibility(false))

  return (
    <div className="max-w-2xl mt-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg py-6 mx-auto">
      <h2 className="text-xl text-center mb-6 font-bold tracking-wider">
        {`Select All Types To Memorize`.toUpperCase()}
      </h2>
      <GameSteps />
      <GameSettings />
    </div>
  )
}
