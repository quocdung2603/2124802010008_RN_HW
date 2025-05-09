export const GetFirstWord = (text: string, num: number) => {
  const words = text.trim().split(/\s+/);
  const tmp = words.slice(0, num).join(' ');
  const FinalText = tmp + '...';
  return FinalText;
};
