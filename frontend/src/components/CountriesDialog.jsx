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
import Countries from './Countries';
import useValidation from '../hooks/useValidation';

const CountriesDialog = ({
  open,
  onClose,
  title,
  setDeparture,
  setDestination,
}) => {
  const [departureValue, setDepartureValue] = useState('');
  const [arrivalValue, setArrivalValue] = useState('');
  const [activeInput, setActiveInput] = useState(null);

  const validateCountries = (departure, arrival) => {
    if (!departure || !arrival) {
      return '출발지와 도착지를 모두 입력해야 합니다.';
    }
    if (departure === arrival) {
      return '출발지와 도착지가 같을 수 없습니다.';
    }
    return '';
  };

  const { error, isValid } = useValidation(
    departureValue,
    arrivalValue,
    validateCountries
  );

  const handleConfirm = () => {
    if (isValid) {
      setDeparture(departureValue);
      setDestination(arrivalValue);
      onClose();
    }
  };

  const handleCountrySelect = (country) => {
    if (activeInput === 'departure') {
      setDepartureValue(country);
    } else if (activeInput === 'arrival') {
      setArrivalValue(country);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
      >
        <div style={{ width: '40%' }}>
          <TextField
            autoFocus
            margin='dense'
            placeholder='출발지 선택'
            label='출발지'
            type='text'
            fullWidth
            value={departureValue}
            onFocus={() => setActiveInput('departure')}
            onChange={(e) => setDepartureValue(e.target.value)}
          />
          <TextField
            margin='dense'
            placeholder='도착지 선택'
            label='도착지'
            type='text'
            fullWidth
            value={arrivalValue}
            onFocus={() => setActiveInput('arrival')}
            onChange={(e) => setArrivalValue(e.target.value)}
          />
          {error && <Alert severity='error'>{error}</Alert>}
        </div>
        <Countries
          onCountrySelect={handleCountrySelect}
          activeInput={activeInput}
        />
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

export default CountriesDialog;
