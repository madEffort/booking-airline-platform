import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import PageLayout from '../layouts/PageLayout';
import Header from '../layouts/Header';
import FlightInfo from '../components/FlightInfo';
import SideBar from '../layouts/SideBar';
import { FlightInfoContext } from '../context/FlightInfoContext';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';

const Home = () => {
  const {
    flights,
    fetchFlights,
    selectedFlight,
    currentPage,
    setCurrentPage,
    totalPages,
    searchParams,
    setSearchParams,
  } = useContext(FlightInfoContext);

  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    setSearchParams(params);
    fetchFlights(1, 6, params); 
  }, [location.search, setSearchParams, fetchFlights]);

  useEffect(() => {
    fetchFlights(currentPage, 6, searchParams);
  }, [currentPage, searchParams, fetchFlights]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PageLayout header={<Header />} aside={<SideBar flight={selectedFlight} />}>
      <ContentWrapper>
        <FlightList flights={flights} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </ContentWrapper>
    </PageLayout>
  );
};

const FlightList = ({ flights }) => {
  return (
    <>
      {flights.map((flight) => (
        <FlightInfo key={uuidv4()} {...flight} />
      ))}
    </>
  );
};

const ContentWrapper = styled.div`
  height: 100%;
  padding: 20px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100px;
  text-align: center;

  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #ff5773;
  }
`;

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
}) => {
  return (
    <PaginationContainer>
      <PaginationButton onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </PaginationButton>
      <span style={{ color: 'black' }}>
        {currentPage} of {totalPages}
      </span>
      <PaginationButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Home;
