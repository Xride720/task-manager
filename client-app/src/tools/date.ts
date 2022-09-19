export enum PeriodUpdateEnum {
  Second,
  Minute,
  NoUpdate
};
export const getUpdatePeriod = (date: Date) => {
  const diffToNowSec = Math.round((Date.now() - date.getTime()) / 1000);
  switch (true) {
    case diffToNowSec < 60:
      return PeriodUpdateEnum.Second;
    case diffToNowSec < 3_600:
      return PeriodUpdateEnum.Minute;
    default:
      return PeriodUpdateEnum.NoUpdate;
  }
};

export const chatDateConverter = (date: Date) => {
  const diffToNowSec = Math.round((Date.now() - date.getTime()) / 1000);
  const isTodayFlag = isToday(date);
  switch (true) {
    case diffToNowSec < 10:
      return `a few seconds ago`;
    case diffToNowSec < 60:
      return `${diffToNowSec} seconds ago`;
    case diffToNowSec < 3_600:
      return `${Math.round(diffToNowSec / 60)} minutes ago`;  
    case isTodayFlag:
      return date.toLocaleTimeString();
    default:
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
};

export const convertTimeToStr = (duration: number): string => {
  if (!duration) {
    return '0';
  }

  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor(duration / (1000 * 60 * 60));

  const hoursStr = hours < 10 ? '0' + hours : hours;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const secondsStr = seconds < 10 ? '0' + seconds : seconds;

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return today.toDateString() == date.toDateString();
}