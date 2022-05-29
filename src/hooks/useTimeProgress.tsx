import { useEffect, useRef, useState } from 'react'
import { Period } from '../types'

export default function useTimeProgress(period: Period) {
  const initDateRef = useRef(Date.now())
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = Date.now()
      const diff = (currentDate - initDateRef.current) / 1000
      if (diff <= period) setPercentage(diff / period)
      else clearInterval(interval)
    }, 1)

    return () => clearInterval(interval)
  }, [period])

  return percentage
}
