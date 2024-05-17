// src/pages/Loading.jsx
import { useContext, useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { LoadingContext } from '../context/LoadingContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // 어둡게 만드는 오버레이
    z-index: 2;
  }
`;

const LoadingContent = styled.div`
  position: relative;
  z-index: 3;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 95vw; // 화면 너비의 95%로 설정
  max-width: 95%; // max-width를 95%로 설정하여 화면 너비를 넘지 않도록 함
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: #ff385c;
  transition: width 0.2s;
`;

const Loading = () => {
  const { loading, selectedImage } = useContext(LoadingContext);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 100 ? prevProgress + 1 : 100
        );
      }, 30);

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <LoadingContainer image={selectedImage.src}>
      <LoadingContent>
        <LoadingText>{selectedImage.description}</LoadingText>
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading;
