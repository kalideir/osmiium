import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { FieldValues, useForm } from 'react-hook-form'
import { BsCollectionPlay, BsSpeedometer2, BsUiChecksGrid } from 'react-icons/bs'
import * as yup from 'yup'
import { selectTypesVisible, toggleTypesVisibility } from '../../store/features/new'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import React from 'react'
import { nanoid } from 'nanoid'
import RangeSlider from './RangeSlider'

const schema = yup.object({
  tests: yup.number().min(1, 'Required').max(30).required('Number of tests is required'),
  items: yup.number().min(1, 'Required').max(5).required('Number of items is required'),
  speed: yup.number().min(1, 'Required').max(10).required('Speed is required'),
})

export default function GameSteps() {
  const typesVisibleState = useAppSelector(selectTypesVisible)
  const router = useRouter()
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
    },
  })

  const dispatch = useAppDispatch()

  const onSubmitHandler = (data: FieldValues) => {
    console.log({ data })

    router.push(`/games/${nanoid()}`)
  }

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
                <RangeSlider color="bg-sky-600" initValue={5} min={1} max={30} step={1} />
                {errors.tests && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.tests.message}
                  </div>
                )}
              </div>

              <div className="mb-10">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsUiChecksGrid size={22} className="mr-2" />
                  Number of items per test
                </p>
                <RangeSlider color="bg-emerald-600" initValue={3} min={1} max={5} step={1} />
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
                <RangeSlider color="bg-blue-600" initValue={5} min={1} max={10} step={1} />
                {errors.speed && (
                  <div className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.speed.message}
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
  )
}
