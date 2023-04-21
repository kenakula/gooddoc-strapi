export const getTimeString = (date: Date): string => {
  const dateString = date.toLocaleDateString('ru');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${dateString} ${hours}:${minutes}`
}
