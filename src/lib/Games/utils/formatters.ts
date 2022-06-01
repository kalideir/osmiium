import moment from 'moment';

export const formatElementValue = (value: number | string | Date) => {
  if (typeof value === typeof Date) return moment(value).format('DD/MM/YYYY HH:mm');
  return value.toString();
};
