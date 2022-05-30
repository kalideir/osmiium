import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useTimeProgress } from '../../hooks'
import { Period } from '../../types'

interface Props {
  steps: number
  period: Period
}

function MultiStepProgressBar(props: Props) {
  const progress = useTimeProgress(3)

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <div
        className={clsx('h-3 flex gap-2 items-center justify-start text-sm')}
        style={{ width: props.steps * 20 + 'rem' }}
      >
        {Array.from(Array(props.steps).keys()).map((index) => (
          <div key={index} style={{ width: '20rem' }}>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-indigo-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full"
                style={{ width: `${progress * 100}%` }}
              >
                {' '}
                <span style={{ fontSize: 0 }}>{Math.ceil(progress * 100)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiStepProgressBar
