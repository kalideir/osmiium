import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BsCollectionPlay, BsColumnsGap, BsSpeedometer2 } from 'react-icons/bs';
import { GiHorizontalFlip } from 'react-icons/gi';
import * as yup from 'yup';
import {
  init,
  selectNewGameState,
  selectTypesVisible,
  setCurrentStepIndex,
  setSettingValue,
} from '../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SettingName } from '../../types';
import RangeSlider from './RangeSlider';

const schema = yup.object({
  tests: yup.number().required('Number of tests is required'),
  items: yup.number().required('Number of items per step is required'),
  speed: yup.number().min(1, 'Required').required('Speed is required'),
  tokenSize: yup.number().min(1, 'Required').required('Token size is required'),
});

export default function GameSteps() {
  const typesVisibleState = useAppSelector(selectTypesVisible);
  const router = useRouter();
  const newGameState = useAppSelector(selectNewGameState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tests: newGameState.numberofTests || newGameState.selectedTypes.length,
      items: newGameState.selectedTypes.length,
      speed: newGameState.speed,
      tokenSize: newGameState.tokenSize,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmitHandler = (data: FieldValues) => {
    dispatch(init());
    router.push(`/games/${nanoid()}`);
  };

  const setSetting = (name: SettingName, value: number) => {
    dispatch(setSettingValue({ name, value }));
  };

  useEffect(() => {
    dispatch(setCurrentStepIndex(0)); // when go back
  }, [dispatch]);

  return (
    <AnimatePresence>
      {!typesVisibleState && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="w-3/5 lg:w-3/5 md:w-4/5 sm:w-4/5 xs:w-5/5 xs:px-3 mx-auto">
              <div className="mb-10 mt-10 text-sm">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsCollectionPlay size={22} className="mr-2" />
                  Number of tests
                </p>
                <RangeSlider
                  color="bg-sky-400"
                  initValue={newGameState.selectedTypes.length}
                  min={newGameState.selectedTypes.length}
                  max={Math.max(30, newGameState.selectedTypes.length * 5)}
                  step={newGameState.selectedTypes.length}
                  name="numberofTests"
                  onChange={setSetting}
                />
                {errors.tests && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.tests.message}
                  </div>
                )}
              </div>

              <div className="mb-10">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsColumnsGap size={22} className="mr-2" />
                  Number of items per test
                </p>
                <RangeSlider
                  color="bg-emerald-400"
                  initValue={3}
                  min={1}
                  max={10}
                  step={1}
                  name="numberOfElements"
                  onChange={setSetting}
                />
                {errors.items && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.items.message}
                  </div>
                )}
              </div>
              <div className="mb-10">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsSpeedometer2 className="mr-2" size={22} />
                  Speed
                </p>
                <RangeSlider
                  color="bg-indigo-400"
                  initValue={5}
                  min={1}
                  max={10}
                  step={1}
                  name="speed"
                  onChange={setSetting}
                />
                {errors.speed && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.speed.message}
                  </div>
                )}
              </div>
              <div className="mb-10">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <GiHorizontalFlip size={22} className="mr-2" />
                  Word / Number Size
                </p>
                <RangeSlider
                  color="bg-yellow-400"
                  initValue={3}
                  min={1}
                  max={20}
                  step={1}
                  name="tokenSize"
                  onChange={setSetting}
                />
                {errors.tokenSize && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.tokenSize.message}
                  </div>
                )}
              </div>
            </div>

            <motion.button
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
              START
            </motion.button>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
