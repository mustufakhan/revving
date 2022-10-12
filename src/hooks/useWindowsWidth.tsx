import { useState, useEffect } from 'react';

const useWindowsWidth = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    setIsScreenSmall(window.innerWidth < 600);
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isScreenSmall;
};

export default useWindowsWidth;
