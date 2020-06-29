import {
  EMAIL_PATTERN_MESSAGE,
  CYRILLIC_PATTERN_MESSAGE,
  NUMBER_PATTERN_MESSAGE,
  URL_PATTERN_MESSAGE,
} from './validation-messages';

export const EMAIL_PATTERN =
  '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$';
export const CYRILLIC_PATTERN = '^[a-zA-Zs]*$';
export const NUMBER_PATTERN = '^[0-9]*$';
export const URL_PATTERN =
  '^((https?)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$';

// -- list of pattern with their respective messages --
export const PATTERNS_LIST: Array<{ PATTERN: string; MESSAGE: string }> = [
  {
    PATTERN: EMAIL_PATTERN,
    MESSAGE: EMAIL_PATTERN_MESSAGE
  },
  {
    PATTERN: CYRILLIC_PATTERN,
    MESSAGE: CYRILLIC_PATTERN_MESSAGE,
  },
  {
    PATTERN: NUMBER_PATTERN,
    MESSAGE: NUMBER_PATTERN_MESSAGE,
  },
  {
    PATTERN: URL_PATTERN,
    MESSAGE: URL_PATTERN_MESSAGE,
  },
];
