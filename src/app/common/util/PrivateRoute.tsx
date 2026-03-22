import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useSelector((state: any) => state.auth);
  const location = useLocation();

  if (!auth.isLoaded) return null;

  if (!auth.authenticated) {
    return <Navigate to="/feed" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
