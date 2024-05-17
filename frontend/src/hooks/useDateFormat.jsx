// useDateFormat.js
import dayjs from 'dayjs';

const useDateFormat = () => {
  const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD') : null);
  return { formatDate };
};

export default useDateFormat;
