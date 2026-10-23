export const EMAIL_PATTERN = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$';
export const NORMAL_TEXT_PATTERN = '^[a-z A-Zá-úÁ-Ú]*$';
// Allows '/' to register two people in one name field (e.g. "Fidel / Jose")
export const NAME_WITH_SLASH_PATTERN = '^[a-z A-Zá-úÁ-Ú/]*$';
export const NUMBER_PATTERN = '^[0-9]*$';
export const VIDEO_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
