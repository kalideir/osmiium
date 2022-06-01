import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MultiStepProgressBar } from '../../components';

import GameFactory from '../../lib/Games/Factories/GameFactory';
import { selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';

function Game() {
  const newGameState = useAppSelector(selectNewGameState);
  const [currentGame, setCurrentGame] = useState();
  // const [currentStep, setCurrentStep] = useState<{ step: BaseStep; isEnded: boolean }>();

  const router = useRouter();

  useEffect(() => {
    if (!newGameState.isInitialized) {
      router?.push('/');
    }
  }, [newGameState.isInitialized, router]);

  // useEffect(() => {}, [newGameState.numberOfElements, newGameState.speed, newGameState.tokenSize]);

  if (!newGameState.isInitialized) return null;

  return (
    <div className="mx-auto">
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg">
        <MultiStepProgressBar steps={4} period={2} />
      </div>
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg mt-5">
        <h3 className="uppercase text-xl text-center">GAME STEP</h3>
      </div>
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg mt-5">
        <h3 className="uppercase text-xl text-center">Memorize these elements</h3>
        {GameFactory.makeGame('SINGLE_TYPE')}
      </div>
    </div>
  );
}

export default Game;
