import { useState } from 'react';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';

const airlines = [
  '대한항공',
  '아시아나항공',
  '에어부산',
  '제주항공',
  '티웨이항공',
];

const Dialog = ({ open, onClose, title, setAirline }) => {
  const [airlineValue, setAirlineValue] = useState('');

  const handleConfirm = () => {
    if (airlineValue) {
      setAirline(airlineValue);
      onClose();
    }
  };

  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin='dense'>
          <InputLabel id='airline-label'>항공사</InputLabel>
          <Select
            labelId='airline-label'
            value={airlineValue}
            onChange={(e) => setAirlineValue(e.target.value)}
          >
            {airlines.map((airline) => (
              <MenuItem key={airline} value={airline}>
                {airline}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!airlineValue && (
          <Alert severity='error' style={{ marginTop: 20 }}>
            항공사를 선택해 주세요.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleConfirm} disabled={!airlineValue}>
          확인
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
