import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { BsCollectionPlay, BsSpeedometer2, BsUiChecksGrid, BsColumnsGap } from 'react-icons/bs';
import { GiHorizontalFlip } from 'react-icons/gi';
import * as yup from 'yup';
import {
  init,
  selectTypesVisible,
  setSettingValue,
  toggleTypesVisibility,
} from '../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import React from 'react';
import { nanoid } from 'nanoid';
import RangeSlider from './RangeSlider';
import { SettingName } from '../../types';

const schema = yup.object({
  tests: yup.number().min(1, 'Required').max(30).required('Number of tests is required'),
  items: yup.number().min(1, 'Required').max(5).required('Number of items is required'),
  speed: yup.number().min(1, 'Required').max(10).required('Speed is required'),
  tokenSize: yup.number().min(1, 'Required').max(10).required('Token size is required'),
});

export default function GameSteps() {
  const typesVisibleState = useAppSelector(selectTypesVisible);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tests: 5,
      items: 3,
      speed: 5,
      tokenSize: 3,
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
                  initValue={5}
                  min={1}
                  max={30}
                  step={1}
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
                  max={5}
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
                  color="bg-blue-400"
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
                {errors.items && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.items.message}
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
