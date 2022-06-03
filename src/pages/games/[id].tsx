import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import GameFactory from '../../lib/Games/Factories/GameFactory';
import { selectIsGameReady, selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';

function Game() {
  const newGameState = useAppSelector(selectNewGameState);

  const isReadyState = useAppSelector(selectIsGameReady);

  const router = useRouter();

  useEffect(() => {
    if (!newGameState.isInitialized) {
      router?.push('/');
    }
  }, [newGameState.isInitialized, router]);

  if (!newGameState.isInitialized) return null;

  return (
    <div className="mx-auto">
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-5 rounded-lg mt-5">
        <h3 className="uppercase text-xl text-center font-semibold">
          {newGameState.isMemorizeWindow ? 'Memorize' : 'Select Correct Elements'}
        </h3>
        {isReadyState && window && <GameFactory gameType="SINGLE_TYPE" />}
      </div>
    </div>
  );
}

export default Game;
