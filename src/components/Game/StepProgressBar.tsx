import clsx from 'clsx';
import { useEffect } from 'react';
import { useTimeProgress } from '../../hooks';
import { selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';
import { Period } from '../../types';

function StepProgressBar() {
  const newGameState = useAppSelector(selectNewGameState);
  const [progress] = useTimeProgress(newGameState.speed as Period);

  if (!newGameState.isMemorizeWindow || newGameState.currentStepIndex > newGameState.steps.length)
    return null;

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <div className={clsx('h-4 flex gap-2 items-center justify-start text-sm w-full')}>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className={`bg-blue-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full`}
            style={{ width: `${progress * 100}%` }}
          >
            {' '}
            <span style={{ fontSize: 0 }}>{Math.ceil(progress * 100)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepProgressBar;
