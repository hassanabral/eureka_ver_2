import 'react-redux';
import { RootState } from '../app/store';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
