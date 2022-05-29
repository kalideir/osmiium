import clsx from 'clsx'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useResizedWidth } from '../../hooks'

const calculateValueFromWidth = (
  value: number,
  step: number,
  minValue: number,
  maxValue: number,
  truckWidth: number
) => {
  return Math.floor((minValue + (value / truckWidth) * maxValue) / step) * step
}

const calculateWidthFromValue = (
  value: number,
  step: number,
  minValue: number,
  maxValue: number,
  truckWidth: number
) => {
  const val = value < minValue ? minValue : value
  const result = ((Math.floor(val / step) * step) / maxValue) * truckWidth
  return result > truckWidth ? truckWidth : result
}

const RangeSlider = (props: {
  initValue?: number
  min: number
  max: number
  step: number
  color: `bg-${string}-600`
  onChange?: (...args: unknown[]) => unknown
}) => {
  const { initValue = 1, min, max, step, color, onChange } = props
  const [value, setVatue] = useState<number>(initValue)
  const [truckRef, truckWidth] = useResizedWidth()
  const [thumbRef, thumbWidth] = useResizedWidth()

  const containerRef = useRef(null)

  const x = useMotionValue(0)
  const widthX = useTransform(x, (value) => {
    return value + (thumbWidth as number)
  })

  useEffect(() => {
    const width = calculateWidthFromValue(value, step, min, max, truckWidth as number)
    x.set(width)
  }, [value, step, min, max, truckWidth, x, thumbWidth])

  const handleDrag = () => {
    const val = calculateValueFromWidth(x.get(), step, min, max, truckWidth as number)
    setVatue(val)
    onChange && onChange(val)
  }

  return (
    <motion.div ref={containerRef} className="relative w-full h-5 px-2 bg-gray-300 rounded-full">
      <motion.div ref={truckRef} className="relative w-full">
        <motion.span
          ref={thumbRef}
          tabIndex={0}
          drag="x"
          whileHover={{
            scale: 1.3,
          }}
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          className={clsx(
            'absolute top-0 z-10 w-7 h-7 -mt-1 -ml-2 rounded-full shadow cursor-pointer flex items-center justify-center text-xs text-white font-bold',
            color
          )}
          style={{ x }}
        >
          {value}
        </motion.span>
      </motion.div>
      <motion.span
        className={clsx('absolute top-0 left-0 h-5 rounded-full', color)}
        style={{ width: widthX }}
      />
    </motion.div>
  )
}

export default RangeSlider
