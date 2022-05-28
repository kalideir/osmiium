export const types = [
  'address',
  'animal',
  'color',
  'commerce',
  'company',
  'date',
  'image',
  'name',
  'phone',
  'random',
  'word',
  'finance',
] as const

export const subTypes = {
  address: [],
  animal: [],
  color: [],
  commerce: [],
  company: [],
  date: [],
  image: [],
  name: [],
  phone: [],
  random: [],
  word: [],
  finance: [],
}

export const gameSteps = () => {
  return types
}
