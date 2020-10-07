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
  if (resolversArray.length === 0) return [];

  const output = resolversArray
    .filter(resolver => TimeMagnitude(resolver.duration) === magnitude)
    .sort((a, b) => b.duration - a.duration);

  return output;
};

const createResolversArray = (timingInfo: any) => {
  const output = [];

  // console.log('timingInfo in create Array1', timingInfo);

  if (!timingInfo.resolvers) return [];

  // console.log('timingInfo in create Array2', timingInfo);

  const resolverObj = timingInfo.resolvers;
  const keysArray = Object.keys(resolverObj);

  keysArray.forEach(key => {
    resolverObj[key].forEach(resolver => {
      output.push(resolver);
    });
  });

  // console.log('output', output);

  return output;
};

export {
  formatTime,
  formatTimeForProgressBar,
  TimeMagnitude,
  filterSortResolvers,
  createResolversArray,
};
