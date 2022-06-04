import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { reset, selectNewGameState, toggleTypesVisibility } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function Results() {
  const newGameState = useAppSelector(selectNewGameState);
  const router = useRouter();
  const agg = useMemo(() => {
    const agg = Object.keys(newGameState.userAnswers).reduce<{ [key: string]: number }>(
      (acc, curr) => {
        const stepKey = newGameState.steps[+curr].key as string;
        acc[newGameState.selectedTypes.length > 2 ? stepKey : `STEP-${curr}-(${stepKey})`] =
          newGameState.selectedTypes.length > 2
            ? newGameState.userAnswers[+curr].filter((item) => item.isAnswer).length +
              (acc[stepKey] ? acc[stepKey] : 0)
            : newGameState.userAnswers[+curr].filter((item) => item.isAnswer).length;
        return acc;
      },
      {}
    );
    return agg;
  }, [newGameState.selectedTypes.length, newGameState.steps, newGameState.userAnswers]);

  const totalCoorectAnswers = useMemo(() => {
    return Object.values(newGameState.userAnswers).reduce((acc, curr) => {
      acc += curr.filter((step) => step.isAnswer).length;
      return acc;
    }, 0);
  }, [newGameState.userAnswers]);

  const totalCount = newGameState.steps.length * newGameState.numberOfElements;

  const data = {
    labels: Object.keys(agg),

    datasets: [
      {
        label: 'Memory Performance Resutls',
        data: Object.values(agg),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dispatch = useDispatch();

  const playAgain = () => {
    dispatch(toggleTypesVisibility(true));
    dispatch(reset());
    return router.push('/');
  };

  return (
    <>
      <motion.p
        className={clsx(
          'text-3xl text-center mx-auto my-2',
          totalCoorectAnswers / totalCount < 0.6 && 'text-red-600'
        )}
      >
        Correct Ratio {(totalCoorectAnswers / totalCount).toFixed(2)} (
        {totalCoorectAnswers / totalCount < 0.6 ? 'Low' : 'Good'})
      </motion.p>
      <div className="max-w-xl mt-3 bg-zinc-100 rounded-lg p-5 mx-auto">
        <Radar data={data} />
      </div>
      <motion.button
        onClick={() => playAgain()}
        type="submit"
        whileTap={{
          scale: 1.5,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0px 0px 4px green',
        }}
        className="flex mx-auto py-2 px-16 mt-10 mb-2 text-sm font-bold focus:outline-none rounded-full border bg-gradient-to-r from-green-500 to-teal-500 text-white "
      >
        Play Again
      </motion.button>
    </>
  );
}
export default Results;
