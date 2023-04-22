export const getConnectByString = (type: 'phone' | 'watsapp' | 'telegram') => {
  switch (type) {
    case 'phone':
      return 'по телефону';
    case 'telegram':
      return 'в телеграм';
    default:
      return 'в watsapp';
  }
};
