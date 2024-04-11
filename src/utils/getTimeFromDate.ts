export default function getTimeFromDate(date: string | undefined) {
  if (date === undefined) {
    return '';
  }

  const chatTime = new Date(date);
  const startDay = new Date();
  startDay.setHours(0, 0, 0, 0);

  const startWeek = new Date();
  startWeek.setHours(0, 0, 0, 0);
  startWeek.setDate(startWeek.getDate() - startWeek.getDay());

  let options: Intl.DateTimeFormatOptions = {};

  if (chatTime > startDay) {
    options = {
      hour: 'numeric',
      minute: 'numeric'
    };
  } else if (chatTime > startWeek) {
    options = {
      weekday: 'short'
    };
  } else {
    options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    };
  }

  return chatTime.toLocaleString('ru', options);
}
