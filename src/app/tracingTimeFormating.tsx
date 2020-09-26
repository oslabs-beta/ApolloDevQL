const formatTime = (time: number) => {
  let formattedTime = time;
  if (formattedTime < 1000) return `${formattedTime} ns`;

  formattedTime = Math.floor(formattedTime / 1000);
  if (formattedTime < 1000) return `${formattedTime} µs`;

  formattedTime = Math.floor(formattedTime / 1000);
  return `${formattedTime} ms`;
};

const formatTimeForProgressBar = (time: number): number => {
  let formattedTime = time;
  if (formattedTime < 1000) return formattedTime;

  formattedTime = Math.floor(formattedTime / 1000);
  if (formattedTime < 1000) return formattedTime;

  formattedTime = Math.floor(formattedTime / 1000);
  return formattedTime;
};

const TimeMagnitude = (time: number): string => {
  let formattedTime = time;
  if (formattedTime < 1000) return 'ns';

  formattedTime = Math.floor(formattedTime / 1000);
  if (formattedTime < 1000) return 'µs';

  formattedTime = Math.floor(formattedTime / 1000);
  return 'ms';
};

const filterSortResolvers = (resolversArray: Array<any>, magnitude: string) => {
  const output = resolversArray
    .filter(resolver => TimeMagnitude(resolver.duration) === magnitude)
    .sort((a, b) => b.duration - a.duration);

  return output;
};

export {
  formatTime,
  formatTimeForProgressBar,
  TimeMagnitude,
  filterSortResolvers,
};
