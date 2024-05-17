import { useState, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { RiFlightLandFill, RiFlightTakeoffFill } from 'react-icons/ri';
import {
  MdOutlineFastfood,
  MdOutlineLiveTv,
  MdOutlineUsb,
  MdWifi,
} from 'react-icons/md';
import ConfirmModal from './ConfirmModal';
import dayjs from 'dayjs';

const TicketContainer = styled.div`
  background: #fff;
  mix-width: 750px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
`;

const FlightInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const DurationInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin: 0 20px;
  flex: 1;
  span {
    margin: 0 10px;
  }
  hr {
    flex: 1;
    border: none;
    border-top: 1px solid #999;
    margin: 0 10px;
  }
`;

const FlightDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const Ticket = forwardRef((props, ref) => {
  const {
    departure,
    departure_airport,
    destination,
    destination_airport,
    departure_date,
    arrival_date,
    departure_time,
    arrival_time,
    duration,
    flightClass,
    price,
    handleRefund,
    id,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmRefund = () => {
    handleRefund(id);
    handleCloseModal();
  };

  const isRefundable = dayjs(departure_date).isAfter(dayjs());

  return (
    <TicketContainer ref={ref}>
      <Header>
        <div>
          <Typography variant='h5'>{departure_time}</Typography>
          <Typography variant='body2'>{departure_date}</Typography>
        </div>
        <div>
          <Typography variant='h5'>{arrival_time}</Typography>
          <Typography variant='body2'>{arrival_date}</Typography>
        </div>
      </Header>
      <Details>
        <FlightInfoContainer>
          <FlightInfo>
            <Typography variant='h6'>
              {departure} ({departure_airport})
            </Typography>
            <Typography style={{ paddingBottom: '10px' }} variant='body2'>
              Terminal 3 International
            </Typography>
            <InfoIcon>
              <MdOutlineLiveTv />
              <Typography>In-flight entertainment</Typography>
            </InfoIcon>
            <InfoIcon>
              <MdWifi />
              <Typography variant='body2'>Wifi</Typography>
            </InfoIcon>
            <InfoIcon>
              <MdOutlineFastfood />
              <Typography variant='body2'>Free In-flight meal</Typography>
            </InfoIcon>
            <InfoIcon>
              <MdOutlineUsb />
              <Typography variant='body2'>Power/USB port</Typography>
            </InfoIcon>
          </FlightInfo>
        </FlightInfoContainer>
        <DurationInfo>
          <RiFlightTakeoffFill style={{ width: '24px', height: '24px' }} />
          <hr />
          <span>{duration}</span>
          <hr />
          <RiFlightLandFill style={{ width: '24px', height: '24px' }} />
        </DurationInfo>
        <FlightInfo>
          <Typography variant='h6'>
            {destination} ({destination_airport})
          </Typography>
          <Typography style={{ paddingBottom: '10px' }} variant='body2'>
            Terminal 3 International
          </Typography>
          <FlightDetails>
            <InfoItem>
              <Typography variant='body2'>Model:</Typography>
              <Typography variant='body2'>Airbus A330-300</Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant='body2'>Layout:</Typography>
              <Typography variant='body2'>2-2-2</Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant='body2'>Seat:</Typography>
              <Typography variant='body2'>{flightClass}</Typography>
            </InfoItem>
          </FlightDetails>
        </FlightInfo>
      </Details>

      <PriceSection>
        <Typography variant='h6'>USD {price}</Typography>
        {isRefundable && (
          <>
            <Button
              variant='outlined'
              sx={{ color: '#3f51b5', borderColor: '#3f51b5' }}
              onClick={handleOpenModal}
            >
              Refund
            </Button>
            <ConfirmModal
              message={'정말 환불하시겠습니까?'}
              open={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmRefund}
            />
          </>
        )}
      </PriceSection>
    </TicketContainer>
  );
});

Ticket.displayName = 'Ticket';

export default Ticket;
