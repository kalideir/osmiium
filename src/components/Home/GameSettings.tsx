import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BsCollectionPlay, BsColumnsGap, BsSpeedometer2 } from 'react-icons/bs';
import { GiHorizontalFlip } from 'react-icons/gi';
import * as yup from 'yup';
import {
  init,
  selectNewGameState,
  selectTypesVisible,
  setCurrentStepIndex,
  reset,
  setSettingValue,
  showResults,
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
  const [isClicked, setIsClicked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  useEffect(() => {
    dispatch(showResults(false));
    dispatch(reset());
  }, [dispatch]);

  const onSubmitHandler = (data: FieldValues) => {
    if (!isClicked) {
      dispatch(init());
      router.push(`/games/${nanoid()}`);
    }
    setIsClicked(true);
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
              {isClicked ? (
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                `START`
              )}
            </motion.button>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
