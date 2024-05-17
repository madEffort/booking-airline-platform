import{ useContext } from 'react';
import { FlightInfoContext } from '../context/FlightInfoContext';

const PurchaseButton = ({ flightId, userId }) => {
  const { purchaseTicket } = useContext(FlightInfoContext);

  const handlePurchase = () => {
    console.log('Button clicked');
    console.log(
      `Purchasing ticket for flightId: ${flightId}, userId: ${userId}`
    );
    purchaseTicket(flightId, userId);
  };

  return (
    <button
      onClick={handlePurchase}
      style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}
    >
      티켓 구매
    </button>
  );
};

export default PurchaseButton;
