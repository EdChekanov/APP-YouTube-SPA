export const formatViews = (num) => {
  if (!num) return '0';

  const lookup = [
    { value: 1e9, symbol: 'B' }, // миллиарды
    { value: 1e6, symbol: 'M' }, // миллионы
    { value: 1e3, symbol: 'K' }, // тысячи
  ];

  const item = lookup.find((x) => num >= x.value);

  if (!item) return num.toString();

  const formatted = (num / item.value).toFixed(1);
  return formatted + item.symbol;
};
