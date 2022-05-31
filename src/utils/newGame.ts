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
  'number',
  'emoji',
  'email',
  'word',
  'finance',
  'file',
] as const;

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
  number: [],
  emoji: [],
  email: [],
  word: [],
  finance: [],
  file: [],
};

export const gameSteps = () => {
  return types;
};
