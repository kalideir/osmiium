import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { MultiStepProgressBar } from '../../components';
import GameFactory from '../../lib/Games/GameFactory';
import { selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';

function Game() {
  const newGameState = useAppSelector(selectNewGameState);
  const gameFactory = useRef<GameFactory>();

  const router = useRouter();

  useEffect(() => {
    if (!newGameState.isInitialized) {
      router?.push('/');
    }
  }, [newGameState.isInitialized, router]);

  useEffect(() => {
    gameFactory.current = new GameFactory();
    const game = gameFactory.current.makeGame(
      'SINGLE_TYPE',
      ['NUMBER', 'NUMBER', 'NUMBER'],
      newGameState.numberOfElements,
      newGameState.speed
    );
    game?.makeSteps();
    console.log(game);
  }, []);

  if (!newGameState.isInitialized) return null;

  return (
    <div className="mx-auto">
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg">
        <MultiStepProgressBar steps={4} period={2} />
      </div>
      <div className="px-5 bg-zinc-100 dark:bg-zinc-900 py-4 rounded-lg mt-5">
        <h3 className="uppercase text-xl text-center">GAME STEP</h3>
      </div>
    </div>
  );
}

export default Game;
