import { createAction } from '@reduxjs/toolkit'
import { TypeKey } from '../../../types'

export const init = createAction('new/init')

export const toggleSelect = createAction<TypeKey>('new/selectType')
