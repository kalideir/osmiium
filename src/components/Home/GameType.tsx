import clsx from 'clsx'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { selectSelectedTypes, toggleSelect } from '../../store/features/new'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { TypeKey } from '../../types'
import { subTypes, types } from '../../utils'

interface Props {
  type: TypeKey
}

function GameType(props: Props) {
  const selectedTypesState = useAppSelector(selectSelectedTypes)

  const dispatch = useAppDispatch()

  const select = (type: TypeKey) => {
    dispatch(toggleSelect(type))
  }

  const exists = useMemo(
    () => selectedTypesState.includes(props.type),
    [props.type, selectedTypesState]
  )

  return (
    <motion.div
      onClick={() => select(props.type)}
      whileHover={{
        scale: 1.1,
        speed: 0.2,
        boxShadow: '0px 0px 10px #3f3cbb',
      }}
      whileTap={{
        scale: 1.4,
      }}
      className={clsx(
        !exists && 'bg-indigo-500',
        'cursor-pointer h-24 font-bold md:h-20 xs:h-20 sm:h-20 flex items-center justify-center rounded-md text-xl sm:text-sm xs:text-xs',
        exists && 'bg-green-500'
      )}
    >
      {props.type.toUpperCase()}
    </motion.div>
  )
}

export default GameType
