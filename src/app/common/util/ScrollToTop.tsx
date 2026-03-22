import { useEffect, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ScrollToTopProps extends RouteComponentProps {
  children?: ReactNode;
}

const ScrollToTop = ({ location, children }: ScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children as any;
};

export default withRouter(ScrollToTop);
