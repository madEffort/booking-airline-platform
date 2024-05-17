import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>회원탈퇴 확인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          취소
        </Button>
        <Button onClick={onConfirm} color='secondary'>
          회원탈퇴
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
