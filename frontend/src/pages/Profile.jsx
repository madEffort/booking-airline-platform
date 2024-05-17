import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AuthContext } from '../context/AuthContext';
import { FlightInfoContext } from '../context/FlightInfoContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import Header from '../layouts/Header';
import PasswordChange from '../components/PasswordChange';
import { toast, ToastContainer } from 'react-toastify';
import { Typography, Button } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import TicketList from '../components/TicketList';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const Profile = () => {
  const { authState, logout } = useContext(AuthContext);
  const {
    fetchUserTickets,
    tickets,
    setCurrentPage,
    setTickets,
  } = useContext(FlightInfoContext);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/'); // Redirect to the main page if not authenticated
    } else {
      fetchUserTickets(1); // Fetch user's tickets for the first page
    }
  }, [authState.isAuthenticated, fetchUserTickets, navigate]);

  const handleRefund = async (ticketId) => {
    try {
      await axiosInstance.post(`/tickets/${ticketId}/refund`, null, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      toast.success('티켓이 환불되었습니다.');
      setCurrentPage(1);
      setTickets([]); // Reset tickets to avoid duplicate entries
      await fetchUserTickets(1); // Fetch tickets again after refund
    } catch (error) {
      toast.error('티켓 환불에 실패했습니다.');
      console.error('Failed to refund ticket', error);
    }
  };

  const uid = authState.user.id;

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstance.delete(`/delete/${uid}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (response.status === 200) {
        toast.success('회원탈퇴가 완료되었습니다.');
        logout();
        navigate('/');
      }
    } catch (error) {
      toast.error('회원탈퇴 중 오류가 발생했습니다.');
      console.error('Error deleting account:', error);
    }
  };

  return (
    <PageLayout header={<Header />} footer={null}>
      <ContentContainer>
        <TicketSection>
          <Typography variant='h6'>구매한 티켓</Typography>
          <TicketList tickets={tickets} handleRefund={handleRefund} />
        </TicketSection>
        <ProfileSection>
          <PasswordChange />
          <DeleteButton
            variant='contained'
            color='secondary'
            onClick={() => setIsDeleteModalOpen(true)}
          >
            회원탈퇴
          </DeleteButton>
        </ProfileSection>
      </ContentContainer>
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
      />
    </PageLayout>
  );
};

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 20px;
`;

const TicketSection = styled.div`
  height: 74vh;
  flex: 2;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const ProfileSection = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 80vh;
`;

const DeleteButton = styled(Button)`
  margin-top: 30px;
  width: 100%;
  background-color: #ff4d4d;
  &:hover {
    background-color: #ff1a1a;
  }
`;

export default Profile;
