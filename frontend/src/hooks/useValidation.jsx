// useValidation.js
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useValidation = (departure, arrival) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateDates = (departure, arrival) => {
      const today = dayjs().startOf('day');

      // Check if departure and arrival are dayjs objects
      const departure2 = departure ? dayjs(departure) : null;
      const arrival2 = arrival ? dayjs(arrival) : null;

      if (departure2 && departure2.isBefore(today)) {
        return '출발일은 오늘보다 이전일 수 없습니다.';
      }
      if (arrival2 && arrival2.isBefore(today)) {
        return '도착일은 오늘보다 이전일 수 없습니다.';
      }
      if (departure2 && arrival2 && departure2.isAfter(arrival2)) {
        return '출발일은 도착일보다 늦을 수 없습니다.';
      }
      return '';
    };

    const errorMessage = validateDates(departure, arrival);
    setError(errorMessage);
    setIsValid(!errorMessage);
  }, [departure, arrival]);

  return { error, isValid };
};

export default useValidation;
