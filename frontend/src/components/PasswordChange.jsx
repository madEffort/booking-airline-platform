// src/components/PasswordChange.jsx
import { useState } from 'react';
import styled from '@emotion/styled';
import { TextField, Button, Typography } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.post('/change-password', {
        oldPassword,
        newPassword,
      });
      toast.success('비밀번호가 변경되었습니다.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <PasswordChangeContainer>
      <Typography variant='h6' gutterBottom>
        비밀번호 변경
      </Typography>
      <TextField
        label='기존 비밀번호'
        type='password'
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='새 비밀번호'
        type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='새 비밀번호 확인'
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin='normal'
      />
      <StyledButton
        variant='contained'
        color='primary'
        onClick={handleChangePassword}
      >
        비밀번호 변경
      </StyledButton>
    </PasswordChangeContainer>
  );
};

const PasswordChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

export default PasswordChange;
