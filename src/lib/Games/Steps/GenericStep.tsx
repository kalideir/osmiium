import { useMemo } from 'react';
import { selectIsGameReady, selectNewGameState, selectSteps } from '../../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { StepType } from '../../../types';
import { shuffle } from '../../../utils';
import Value from './Value';

interface Props {
  stepKey: StepType;
}

export default function GenericStep({ stepKey }: Props) {
  const newGameState = useAppSelector(selectNewGameState);
  const stepsState = useAppSelector(selectSteps);
  const dispatch = useAppDispatch();
  const isReadyState = useAppSelector(selectIsGameReady);

  const elements = useMemo(
    () => shuffle(newGameState.steps[stepKey] || []),
    [newGameState.steps, stepKey]
  );

  return (
    <div
      className="grid w-full mt-10 gap-3 text-white dark:text-black text-center text-xl font-bold"
      style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )' }}
    >
      {(elements || []).map((element, index) => (
        <Value stepKey={stepKey} value={element.value} key={index} />
      ))}
    </div>
  );
}
