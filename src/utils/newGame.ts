export const types = [
  'ADDRESS',
  'ANIMAL',
  'COLOR',
  'COMMERCE',
  'COMPANY',
  'DATE',
  'IMAGE',
  'NAME',
  'PHONE',
  'RANDOM',
  'NUMBER',
  'EMOJI',
  'EMAIL',
  'WORD',
  'FINANCE',
  'FILE',
] as const;

export const subTypes = {
  ADDRESS: [],
  ANIMAL: [],
  COLOR: [],
  COMMERCE: [],
  COMPANY: [],
  DATE: [],
  IMAGE: [],
  NAME: [],
  PHONE: [],
  RANDOM: [],
  NUMBER: [],
  EMOJI: [],
  EMAIL: [],
  WORD: [],
  FINANCE: [],
  FILE: [],
};

export const gameSteps = () => {
  return types;
};
