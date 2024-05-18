/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState, useContext } from 'react';
import ConfirmPurchaseModal from '../components/ConfirmPurChaseModal';
import { FlightInfoContext } from '../context/FlightInfoContext';
import { AuthContext } from '../context/AuthContext'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  width: 100%;
  height: 200px;
  background-image: url('https://loremflickr.com/500/200/landmark/');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: #333;
  margin: 20px 0;
`;

const Details = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #777;
`;

const Facilities = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  width: 100%;
`;

const Facility = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 40%;
  min-width: 120px;
  max-width: 150px;
`;

const FacilityIcon = styled.div`
  font-size: 2em;
  color: #555;
`;

const FacilityLabel = styled.span`
  margin-top: 5px;
  color: #777;
  text-align: center;
`;

const BookButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  font-size: 1.5em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

const SideBar = ({ flight }) => {
  const { purchaseTicket } = useContext(FlightInfoContext); 
  const { authState } = useContext(AuthContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPurchase = async () => {
    try {
      await purchaseTicket(flight.id, authState.user.id);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to purchase ticket', error);
    }
  };

  if (!flight) {
    return (
      <Container>
        <Title>항공권을 선택해 주세요.</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Title>상세 정보</Title>
      <Details>
        <DetailRow>
          <Label>Departure:</Label>
          <Value>
            {flight.departure} at {flight.departure_time}
          </Value>
        </DetailRow>
        <DetailRow>
          <Label>Arrival:</Label>
          <Value>
            {flight.destination} at {flight.arrival_time}
          </Value>
        </DetailRow>
        <DetailRow>
          <Label>Duration:</Label>
          <Value>{flight.duration}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Class:</Label>
          <Value>{flight.flightClass}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Gate:</Label>
          <Value>{flight.gate}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Airline:</Label>
          <Value>{flight.airline}</Value>
        </DetailRow>
      </Details>
      <Facilities>
        <Facility>
          <FacilityIcon>🛜</FacilityIcon>
          <FacilityLabel>무료 와이파이</FacilityLabel>
        </Facility>
        <Facility>
          <FacilityIcon>🧳</FacilityIcon>
          <FacilityLabel>Luggage (10KG)</FacilityLabel>
        </Facility>
        <Facility>
          <FacilityIcon>🍽️</FacilityIcon>
          <FacilityLabel>기내식 제공</FacilityLabel>
        </Facility>
        <Facility>
          <FacilityIcon>🎥</FacilityIcon>
          <FacilityLabel>엔터테인먼트 서비스</FacilityLabel>
        </Facility>
      </Facilities>
      <BookButton onClick={handleOpenModal}>최저가 {formatPrice(flight.price)}원 예약하기</BookButton>
      <ConfirmPurchaseModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmPurchase}
      />
    </Container>
  );
};

export default SideBar;
