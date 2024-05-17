// src/context/LoadingContext.js
import { createContext, useState, useEffect } from 'react';
import america from '../assets/america.png';
import france from '../assets/france.png';
import germany from '../assets/germany.png';
import japan from '../assets/japan.png';

export const LoadingContext = createContext();

const images = [
  {
    src: america,
    description: '인천에서 로스앤젤레스까지의 여정을 찾고 있습니다',
  },
  {
    src: france,
    description: '서울에서 파리까지의 여정을 찾고 있습니다',
  },
  {
    src: germany,
    description: '서울에서 베를린까지의 여정을 찾고 있습니다',
  },
  {
    src: japan,
    description: '서울에서 도쿄까지의 여정을 찾고 있습니다',
  },
];

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const finishLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const img = new Image();
    img.src = randomImage.src;
    img.onload = () => {
      setSelectedImage(randomImage);
      setTimeout(() => {
        finishLoading();
      }, 3500); // 최소 로딩 시간 3초 설정
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, selectedImage }}>
      {children}
    </LoadingContext.Provider>
  );
};
