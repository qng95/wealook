const week_day = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
]

export const Epoch2DateStr = (epoch_second) => {
  const date = new Date(epoch_second * 1000);
  const dateStr = `${date.getDate()}`;
  const dayStr = week_day[date.getDay()];
  return `${dayStr} ${dateStr}`;
}

export const Epoch2HourStr = (epoch_second) => {
  const date = new Date(epoch_second * 1000);
  const hourStr = `${date.getHours()}`;
  const minuteStr = `${date.getMinutes()}`;
  return `${hourStr}:${minuteStr}`;
}

export default {
  Epoch2DateStr: Epoch2DateStr,
  Epoch2HourStr: Epoch2HourStr,
}