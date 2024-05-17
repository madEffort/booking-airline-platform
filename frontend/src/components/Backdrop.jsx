import styled from '@emotion/styled';
import { useDialog } from '../layouts/Layout';

const BackdropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Backdrop = ({ children }) => {
  const { closeDialog } = useDialog();
  const handleBackdropClick = (event) => {
    if (event.target.classList.contains('Backdrop')) {
      closeDialog();
    }
  };

  return (
    <BackdropWrapper className='Backdrop' onClick={handleBackdropClick}>
      {children}
    </BackdropWrapper>
  );
};

export default Backdrop;
