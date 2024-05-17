import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Avatar, Button, IconButton } from '@mui/material';
import { Search, Delete } from '@mui/icons-material';
import { useDialog } from './Layout';
import useDateFormat from '../hooks/useDateFormat';
import DateDialog from '../components/DateDialog';
import CountriesDialog from '../components/CountriesDialog';
import AirlineDialog from '../components/AirlineDialog';
import ClassDialog from '../components/ClassDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 80%;
  min-width: 500px;
  background-color: #fff;
  border-radius: 50px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const InputFieldWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f1f1f1;
    border-radius: 50px;
    border-right: none;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Value = styled.div`
  font-size: 12px;
  color: #888;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  padding: 5px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Header = () => {
  const { openDialog, closeDialog } = useDialog();
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [flightClass, setFlightClass] = useState(null);
  const [airline, setAirline] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { formatDate } = useDateFormat();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDialog = (field) => {
    setActiveField(field);
    switch (field) {
      case 'locations':
        openDialog(
          <CountriesDialog
            open={true}
            onClose={() => closeDialog()}
            title='여행 장소'
            setDeparture={setDeparture}
            setDestination={setDestination}
          />
        );
        break;
      case 'dates':
        openDialog(
          <DateDialog
            open={true}
            onClose={() => closeDialog()}
            title='여행 기간'
            departureDate={departureDate}
            arrivalDate={arrivalDate}
            setDepartureDate={setDepartureDate}
            setArrivalDate={setArrivalDate}
          />
        );
        break;
      case 'airlines':
        openDialog(
          <AirlineDialog
            open={true}
            onClose={() => closeDialog()}
            setAirline={setAirline}
          />
        );
        break;
      case 'classes':
        openDialog(
          <ClassDialog
            open={true}
            onClose={() => closeDialog()}
            setFlightClass={setFlightClass}
          />
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (departure || destination) {
      if (!departure || !destination) {
        toast.error('출발지와 도착지를 모두 입력해주세요.');
        return;
      }

      if ((departureDate && !arrivalDate) || (!departureDate && arrivalDate)) {
        toast.error(
          '출발일과 도착일을 모두 입력하거나, 모두 입력하지 않아야 합니다.'
        );
        return;
      }
    }

    const params = {
      ...(departure && { departures: departure }),
      ...(destination && { arrivals: destination }),
      ...(departureDate && { departure_date: formatDate(departureDate) }),
      ...(arrivalDate && { arrival_date: formatDate(arrivalDate) }),
      ...(flightClass && { flightClass: flightClass }),
      ...(airline && { airline: airline }),
    };

    const queryString = new URLSearchParams(params).toString();
    navigate(`/?${queryString}`);
  };

  const handleLogout = () => {
    logout();
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/');
    }, 3000);
  };

  const handleClearField = (field) => {
    switch (field) {
      case 'locations':
        setDeparture(null);
        setDestination(null);
        break;
      case 'dates':
        setDepartureDate(null);
        setArrivalDate(null);
        break;
      case 'airlines':
        setAirline(null);
        break;
      case 'classes':
        setFlightClass(null);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <HeaderContainer>
        <Link to={'/'}>
          <img src={logo} alt='홈으로' style={{ height: '40px' }} />
        </Link>
        <InputContainer>
          {['locations', 'dates', 'airlines', 'classes'].map((field, index) => (
            <InputFieldWrapper
              key={field}
              onClick={() => handleOpenDialog(field)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className={hoverIndex === index - 1 ? 'no-border-right' : ''}
            >
              <Label>
                {field === 'locations'
                  ? '출발 / 도착'
                  : field === 'dates'
                  ? '여행 기간'
                  : field === 'airlines'
                  ? '항공사'
                  : '좌석'}
              </Label>
              <Value>
                {field === 'locations'
                  ? `${departure ? departure : '출발지 검색'} / ${
                      destination ? destination : '도착지 검색'
                    }`
                  : field === 'dates'
                  ? `${
                      departureDate ? formatDate(departureDate) : '날짜 추가'
                    } - ${arrivalDate ? formatDate(arrivalDate) : '날짜 추가'}`
                  : field === 'airlines'
                  ? airline
                    ? airline
                    : '항공사 선택'
                  : flightClass
                  ? flightClass
                  : '좌석 선택'}
              </Value>
              {((field === 'locations' && (departure || destination)) ||
                (field === 'dates' && (departureDate || arrivalDate)) ||
                (field === 'airlines' && airline) ||
                (field === 'classes' && flightClass)) && (
                <DeleteButton
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearField(field);
                  }}
                >
                  <Delete fontSize='small' />
                </DeleteButton>
              )}
            </InputFieldWrapper>
          ))}
          <div
            style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}
          >
            <Avatar
              sx={{
                bgcolor: '#ff385c',
                width: 48,
                height: 48,
                cursor: 'pointer',
                ':active': {
                  transform: 'scale(0.95)',
                },
              }}
              onClick={handleSubmit}
            >
              <Search />
            </Avatar>
          </div>
        </InputContainer>
        {authState.isAuthenticated ? (
          <ProfileSection>
            <Button variant='text' color='inherit' onClick={handleLogout}>
              Logout
            </Button>
            <Link to='/profile'>
              <Avatar src='avatar.png' />
            </Link>
          </ProfileSection>
        ) : (
          <Link to={'/login'}> 로그인 | 회원가입</Link>
        )}
      </HeaderContainer>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
      />
    </>
  );
};

export default Header;
