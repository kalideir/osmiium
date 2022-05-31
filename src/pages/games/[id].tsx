import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { MultiStepProgressBar } from '../../components';
import BaseGame from '../../lib/Games/BaseGame';
import GameFactory from '../../lib/Games/GameFactory';
import { BaseStep } from '../../lib/Games/Steps';
import { selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';

function Game() {
  const newGameState = useAppSelector(selectNewGameState);
  const gameFactory = useRef<GameFactory>();
  const [currentGame, setCurrentGame] = useState<BaseGame>();
  const [currentStep, setCurrentStep] = useState<{ step: BaseStep; isEnded: boolean }>();

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
      newGameState.speed,
      newGameState.tokenSize
    );
    game?.makeSteps();
    setCurrentGame(game);
  }, [newGameState.numberOfElements, newGameState.speed, newGameState.tokenSize]);

  useEffect(() => {
    if (currentGame) {
      // const interval = setInterval(() => {
      setCurrentStep({ step: currentGame.steps[0] as BaseStep, isEnded: false });
      // }, (currentGame.steps.length as number) * 5 * 1000);

      // clearInterval(interval);
    }
  }, [currentGame]);

  console.log(currentGame);

  console.log(JSON.stringify(currentStep, null, 4), 'x');

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
