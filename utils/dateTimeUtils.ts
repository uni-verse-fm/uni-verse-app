export const isoDateToDate = (isoDate?: string) => {
  try {
    const date = new Date(isoDate as string);
    return date.toLocaleDateString();
  } catch (error) {
    return "---";
  }
};

export const secondsToHMS = (timeInSec?: number): string => {
  let timeAsString = "";
  if (!timeInSec) return "00:00";

  let time: number = timeInSec / 1000;
  if (Math.floor(time / 3600) > 1) {
    const hours = Math.floor(time / 3600);
    timeAsString = timeAsString.concat(`${hours < 10 ? `0${hours}` : hours}:`);
    time -= hours * 3600;
  }
  const minutes = Math.floor(time / 60);
  timeAsString = timeAsString.concat(
    `${minutes < 10 ? `0${minutes}` : minutes}:`,
  );
  const seconds = Math.floor(time - minutes * 60);
  timeAsString = timeAsString.concat(
    `${seconds < 10 ? `0${seconds}` : seconds}`,
  );

  return timeAsString;
};
