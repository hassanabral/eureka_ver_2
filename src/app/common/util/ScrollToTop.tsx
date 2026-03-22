import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children?: ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children as any;
};

export default ScrollToTop;
