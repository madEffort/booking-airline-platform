import { useContext,} from 'react';
import styled from '@emotion/styled';
import { RiFlightLandFill, RiFlightTakeoffFill } from 'react-icons/ri';
import { FlightInfoContext } from '../context/FlightInfoContext';

const FlightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 100%;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  text-align: center;
  flex: 1;

  span:first-of-type {
    font-size: 18px;
    font-weight: bold;
  }

  span:last-of-type {
    font-size: 16px;
    color: #666;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;

    span:first-of-type,
    span:last-of-type {
      font-size: 14px;
    }
  }
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

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;

    span,
    hr {
      display: none;
    }
  }
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex: 1;

  span:first-of-type {
    font-size: 18px;
    font-weight: bold;
    margin-right: 5px;
  }

  span:last-of-type {
    font-size: 16px;
    color: #666;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    span:first-of-type,
    span:last-of-type {
      font-size: 14px;
    }
  }
`;

const AirlineInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;

    span:first-of-type {
      font-size: 16px;
      font-weight: bold;
    }

    span:last-of-type {
      font-size: 14px;
      color: #999;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 5px;

    div {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    span:first-of-type,
    span:last-of-type {
      font-size: 14px;
    }
  }
`;

const FlightInfo = ({
  id,
  departure,
  departure_airport,
  destination,
  destination_airport,
  departure_date,
  destination_date,
  departure_time,
  arrival_time,
  destination_time,
  duration,
  airline,
  flightClass,
  price,
  gate
}) => {
  const { setSelectedFlight } = useContext(FlightInfoContext);

  const handleClick = () => {
    setSelectedFlight({
      id,
      departure,
      departure_airport,
      destination,
      destination_airport,
      departure_date,
      destination_date,
      departure_time,
      arrival_time,
      destination_time,
      duration,
      airline,
      flightClass,
      price,
      gate
    });
  };
  

  const formattedPrice = price !== undefined ? price.toLocaleString() : 'N/A';

  return (
    <FlightContainer onClick={handleClick}>
      <TimeInfo>
        <span>{departure_time}</span>
        <span>{departure_airport}</span>
      </TimeInfo>
      <DurationInfo>
        <RiFlightTakeoffFill style={{ width: '24px', height: '24px' }} />
        <hr />
        <span>{duration}</span>
        <hr />
        <RiFlightLandFill style={{ width: '24px', height: '24px' }} />
      </DurationInfo>
      <TimeInfo>
        <span>{destination_time}</span>
        <span>{destination_airport}</span>
      </TimeInfo>
      <AirlineInfo>
        <div>
          <span>{airline.name || airline}</span>
          <span>{flightClass}</span>
        </div>
      </AirlineInfo>
      <PriceInfo>
        <span>{formattedPrice} 원</span>
        <span> / 인</span>
      </PriceInfo>
    </FlightContainer>
  );
};

export default FlightInfo;
