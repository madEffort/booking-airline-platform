import styled from '@emotion/styled';
import Ticket from './Ticket';
import { v4 as uuidv4 } from 'uuid';

const TicketList = ({ tickets, handleRefund, lastTicketElementRef }) => {
  return (
    <List>
      {tickets.map((ticket, index) => (
        <Ticket
          key={uuidv4()}
          {...ticket}
          handleRefund={handleRefund}
          ref={index === tickets.length - 1 ? lastTicketElementRef : null}
        />
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

export default TicketList;
