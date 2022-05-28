import { AnimatePresence, motion, useTransform } from 'framer-motion'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsCollectionPlay, BsSpeedometer2, BsUiChecksGrid } from 'react-icons/bs'
import { selectTypesVisible, toggleTypesVisibility } from '../../store/features/new'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { InputRange } from './RangeSlider'

const schema = yup.object({
  // email: yup.string().email().required('Email is required'),
  // password: yup.string().min(8).max(32).required('Password is required'),
})

export default function GameSteps() {
  const typesVisibleState = useAppSelector(selectTypesVisible)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useAppDispatch()

  const showTypes = () => dispatch(toggleTypesVisibility(true))

  const hideTypes = () => dispatch(toggleTypesVisibility(false))

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
          <>
            <div className="2xl:w-3/5 lg:w-3/5 md:w-4/5 sm:w-4/5 xs:w-5/5 xs:px-3 mx-auto">
              <div className="mb-10 mt-10 text-sm">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsCollectionPlay size={22} className="mr-2" />
                  Number of tests
                </p>
                <InputRange color="bg-sky-600" initValue={5} min={1} max={30} step={1} />
              </div>

              <div className="mb-10">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsUiChecksGrid size={22} className="mr-2" />
                  Number of items per test
                </p>
                <InputRange color="bg-emerald-600" initValue={3} min={1} max={5} step={1} />
              </div>
              <div className="mb-10">
                <p className="mb-2 uppercase flex items-center justify-start text-xs">
                  <BsSpeedometer2 className="mr-2" size={22} />
                  Speed
                </p>
                <InputRange color="bg-blue-600" initValue={5} min={1} max={30} step={1} />
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: '0px 0px 4px green',
              }}
              onClick={() => (typesVisibleState ? hideTypes() : showTypes())}
              type="button"
              className="flex mx-auto py-2 px-16 mt-10 mb-2 text-sm font-bold focus:outline-none rounded-full border bg-gradient-to-r from-green-500 to-teal-500 text-white "
            >
              START
            </motion.button>
          </>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
