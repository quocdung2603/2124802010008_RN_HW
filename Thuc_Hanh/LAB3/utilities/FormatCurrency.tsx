export const FormatCurrency = (amountStr: string, currency: string = 'VND') => {
  const amount = parseFloat(amountStr);
  if (isNaN(amount)) return 'Invalid amount';

  const locales: any = {
    VND: 'vi-VN',
    USD: 'en-US',
    EUR: 'de-DE',
  };

  const locale = locales[currency] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
