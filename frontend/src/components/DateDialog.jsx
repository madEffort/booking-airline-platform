import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useValidation from '../hooks/useValidation'; 
const DateDialog = ({
  open,
  onClose,
  title,
  departureDate,
  arrivalDate,
  setDepartureDate,
  setArrivalDate,
}) => {
  const [departureValue, setDepartureValue] = useState(
    departureDate ? dayjs(departureDate) : null
  );
  const [arrivalValue, setArrivalValue] = useState(
    arrivalDate ? dayjs(arrivalDate) : null
  );

  const validateDates = (departure, arrival) => {
    if (departure.isAfter(arrival)) {
      return '출발일은 도착일보다 늦을 수 없습니다.';
    }
    return '';
  };

  const { error, isValid } = useValidation(
    departureValue,
    arrivalValue,
    validateDates
  );

  const handleConfirm = () => {
    if (isValid) {
      setDepartureDate(departureValue.toDate());
      setArrivalDate(arrivalValue.toDate());
      onClose();
    }
  };

  const handleDepartureChange = (newValue) => {
    setDepartureValue(newValue);
  };

  const handleArrivalChange = (newValue) => {
    setArrivalValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 24px',
          gap: '30px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <DatePicker
              label='출발일 선택'
              value={departureValue}
              onChange={handleDepartureChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <div
              style={{
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              ~
            </div>
            <DatePicker
              label='도착일 선택'
              value={arrivalValue}
              onChange={handleArrivalChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </div>
        </LocalizationProvider>
        {error && <Alert severity='error'>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleConfirm} disabled={!isValid}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateDialog;
