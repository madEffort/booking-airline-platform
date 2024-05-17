import { Modal, Box, Typography } from '@mui/material';
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

const ConfirmLogoutModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Typography variant="h6" component="h2">
          성공적으로 로그아웃 하였습니다.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          잠시 후 메인 페이지로 이동합니다.
        </Typography>
      </ModalBox>
    </Modal>
  );
};

export default ConfirmLogoutModal;
