import { faker } from '@faker-js/faker';
import { StepElement, StepType } from '../types';
import { arrayFromT, random, removeDuplicates, shuffle } from '.';
import { formatElementValue } from './formatters';

const datasource: Record<StepType, (() => string | Date)[]> = {
  NUMBER: [faker.random.numeric],
  IMAGE: [
    faker.image.abstract,
    faker.image.animals,
    // faker.image.avatar,
    faker.image.business,
    faker.image.cats,
    // faker.image.city,
    // faker.image.fashion,
    faker.image.food,
    // faker.image.image,
    faker.image.nature,
    // faker.image.people,
    // faker.image.sports,
    faker.image.technics,
    faker.image.transport,
  ],
  ADDRESS: [
    faker.address.city,
    faker.address.cityName,
    faker.address.country,
    faker.address.county,
    faker.address.latitude,
    faker.address.longitude,
    // faker.address.state,
    // faker.address.secondaryAddress,
    // faker.address.street,
    faker.address.timeZone,
    faker.address.zipCode,
  ],
  ANIMAL: [
    faker.animal.bear,
    faker.animal.bird,
    faker.animal.cat,
    faker.animal.cetacean,
    faker.animal.cow,
    faker.animal.dog,
    faker.animal.fish,
    faker.animal.horse,
    faker.animal.insect,
    faker.animal.lion,
    faker.animal.rabbit,
    faker.animal.snake,
  ],
  COLOR: [faker.color.rgb, faker.color.human],
  COMMERCE: [
    faker.commerce.department,
    faker.commerce.price,
    faker.commerce.product,
    faker.commerce.productMaterial,
    faker.commerce.productName,
  ],
  COMPANY: [
    faker.company.bsBuzz,
    faker.company.bsAdjective,
    faker.company.bsNoun,
    faker.company.catchPhraseAdjective,
    faker.company.catchPhraseNoun,
    faker.company.companyName,
  ],
  DATE: [faker.date.month, faker.date.weekday, faker.date.future, faker.date.past],
  NAME: [
    faker.name.findName,
    faker.name.firstName,
    faker.name.jobArea,
    faker.name.jobDescriptor,
    faker.name.jobTitle,
    faker.name.jobType,
    faker.name.lastName,
  ],
  PHONE: [faker.phone.phoneNumber],
  RANDOM: [faker.random.word, faker.random.words, faker.random.alphaNumeric],
  WORD: [
    faker.word.adjective,
    faker.word.adverb,
    faker.word.conjunction,
    faker.word.interjection,
    faker.word.noun,
    faker.word.preposition,
    faker.word.verb,
  ],
  FINANCE: [
    // faker.finance.mask,
    faker.finance.account,
    faker.finance.iban,
    faker.finance.currencyName,
    faker.finance.currencyCode,
    faker.finance.creditCardCVV,
    faker.finance.bic,
  ],
  EMOJI: [faker.internet.emoji],
  EMAIL: [faker.internet.email],
  FILE: [faker.system.commonFileName, faker.system.commonFileExt],
};

export const getRandomFn = <K extends StepType>(key: StepType): typeof datasource[K][number] =>
  random(datasource[key]);

export const generateRandom = (
  randomFc: ReturnType<typeof getRandomFn>,
  key: StepType,
  length: number
) => {
  if (key === 'NUMBER') return faker.random.numeric(length);
  /*
  - adding randomness to prevent the browser from caching the images since the api uses one url for retrieving images
  - needs refactor
   */
  if (key === 'IMAGE') return `${`${randomFc()}?random=?` + Math.round(Math.random() * 1000)}`;
  if (key === 'DATE') return randomFc();
  return randomFc(); // faker.unique() // as (length: number) => string, [length])
};

export const generateStepElements = (
  randomFc: ReturnType<typeof getRandomFn>,
  key: StepType,
  numberOfElements: number,
  tokenSize: number
) => {
  let elements = arrayFromT<StepElement<string>>(numberOfElements, (index: number) => ({
    isAnswer: index % 2 === 0,
    value: formatElementValue(generateRandom(randomFc, key, tokenSize)),
    isEnded: false,
  }));

  elements = removeDuplicates(
    elements,
    (array, item) => !!array.find((_item) => _item.value === item.value)
  );

  return shuffle(elements);
};

export default datasource;
