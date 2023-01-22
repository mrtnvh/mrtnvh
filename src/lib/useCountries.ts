import flag from 'emoji-flag';
import { getName } from 'country-list';

export const getCountryFlagAndNameFromCode = (code: string): { flag: string; name: string } => {
  if (code === 'Global') {
    return { flag: '🌍', name: 'Global' };
  }
  return {
    flag: flag(code),
    name: getName(code),
  };
};
