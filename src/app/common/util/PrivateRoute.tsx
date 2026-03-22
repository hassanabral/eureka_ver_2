import { Navigate, useLocation } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useSelector((state: any) => state.firebase.auth);
  const location = useLocation();

  if (!isLoaded(auth)) return null;

  if (isEmpty(auth)) {
    return <Navigate to="/feed" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
