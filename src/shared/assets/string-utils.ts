export const capitalize = (str: string): string => {
  if (!str) {
    return '';
  }

  return str[0].toUpperCase() + str.slice(1);
};

export const capitalizeName = (str: string): string => {
  if (!str) {
    return '';
  }

  return str
    .split(' ')
    .map(capitalize)
    .join(' ')
    .split('-')
    .map(capitalize)
    .join('-');
};
