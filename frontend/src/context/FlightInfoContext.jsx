import {
  useCallback,
  createContext,
  useState,
  useContext,
  useRef,
} from 'react';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const FlightInfoContext = createContext();

export const FlightInfoProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const [flights, setFlights] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const isSubmittingRef = useRef(false);

  const fetchFlights = useCallback(
    async (page = 1, limit = 6, params = {}) => {
      try {
        const response = await axiosInstance.get('/flights', {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
          params: {
            page,
            limit,
            ...params,
          },
        });
        const { flights, currentPage, totalPages } = response.data;
        setFlights(flights);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    },
    [authState.token]
  );

  const fetchUserTickets = useCallback(
    async (page = 1) => {
      try {
        const response = await axiosInstance.get(`/tickets?page=${page}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        if (page === 1) {
          setTickets(response.data.tickets);
        } else {
          setTickets((prevTickets) => [
            ...prevTickets,
            ...response.data.tickets,
          ]);
        }
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
        if (error.response && error.response.status === 403) {
          toast.error('인증 오류: 다시 로그인 해주세요.', {
            toastId: 'auth-error',
          });
        } else {
          toast.error('티켓 목록을 가져오는 데 실패했습니다.', {
            toastId: 'fetch-tickets-error',
          });
        }
      }
    },
    [authState.token]
  );

  const purchaseTicket = useCallback(
    async (flightId, userId) => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      console.log('isSubmitting set to true');
      try {
        console.log(
          `purchaseTicket called with flightId: ${flightId}, userId: ${userId}`
        );
        const response = await axiosInstance.post(
          `/purchase/${flightId}`,
          { flightId, userId },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          toast.success('구매 완료', { toastId: 'purchase-success' });
          await fetchUserTickets(1);
        } else {
          toast.error('구매 실패', { toastId: 'purchase-failure' });
        }
      } catch (error) {
        toast.error('구매 실패', { toastId: 'purchase-error' });
        console.error('Failed to purchase ticket', error);
      } finally {
        isSubmittingRef.current = false;
        console.log('isSubmitting set to false');
      }
    },
    [authState.token, fetchUserTickets]
  );

  const updateSearchResults = (newFlights, newTotalPages, params) => {
    setFlights(newFlights);
    setCurrentPage(1);
    setTotalPages(newTotalPages);
    setSearchParams(params);
  };

  return (
    <FlightInfoContext.Provider
      value={{
        flights,
        tickets,
        currentPage,
        totalPages,
        selectedFlight,
        setSelectedFlight,
        setCurrentPage,
        fetchFlights,
        fetchUserTickets,
        updateSearchResults,
        purchaseTicket,
        setTickets,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </FlightInfoContext.Provider>
  );
};
