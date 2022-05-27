import React, { useState } from 'react'
import { BsPlus, BsDash } from 'react-icons/bs'

function StepsRangeInput() {
  const [count, setCount] = useState(1)
  return (
    <div className="flex items-center justify-center h-12 w-2/4 mt-7 xs:w-2/4 mx-auto">
      <div className="flex items-center justify-center w-12 h-full border">
        <BsDash size={40} className="text-gray-900 dark:text-gray-200" />
      </div>
      <div className="flex items-center justify-center flex-2 h-full w-full text-2xl font-bold">
        2{' '}
      </div>
      <div className="flex items-center justify-center w-12 h-full border">
        <BsPlus size={40} className="text-gray-900 dark:text-gray-200" />
      </div>
    </div>
  )
}

export default StepsRangeInput
