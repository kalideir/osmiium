import { faker } from '@faker-js/faker';
import { StepType } from '../../types';

const generator: { [key in StepType]?: unknown[] } = {
  NUMBER: [faker.random.numeric],
  IMAGE: [],
  ADDRESS: [],
  ANIMAL: [],
  COLOR: [],
  COMMERCE: [],
  COMPANY: [],
  DATE: [],
  NAME: [],
  PHONE: [],
  RANDOM: [],
  WORD: [],
  FINANCE: [],
};

export default generator;
