import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ClassDialog = ({ open, onClose, setFlightClass }) => {
  const classes = ['이코노미', '비즈니스', '퍼스트클래스'];

  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>클래스 선택</DialogTitle>
      <DialogContent>
        <List>
          {classes.map((flightClass) => (
            <ListItem
              button
              key={flightClass}
              onClick={() => {
                setFlightClass(flightClass);
                onClose();
              }}
            >
              <ListItemText primary={flightClass} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default ClassDialog;
