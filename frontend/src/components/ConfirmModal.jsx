// ConfirmModal.js
import { Modal, Typography, Button, Box } from '@mui/material';
import styled from '@emotion/styled';

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px 32px 24px;
`;

const ConfirmModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography variant='h6' component='h2'>
          {message}
        </Typography>
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='primary' onClick={onConfirm}>
            Yes
          </Button>
          <Button variant='contained' color='secondary' onClick={onClose}>
            No
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmModal;
