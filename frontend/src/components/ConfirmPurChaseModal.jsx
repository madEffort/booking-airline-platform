import { Modal, Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px;
  text-align: center;
`;

const ConfirmPurchaseModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Typography variant='h6' component='h2'>
          정말 구매하시겠습니까?
        </Typography>
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='primary' onClick={handleConfirm}>
            구매
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            취소
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default ConfirmPurchaseModal;
