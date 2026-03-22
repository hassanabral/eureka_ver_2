import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

interface AuthState {
  currentUser: AuthUser | null;
  isLoaded: boolean;
  authenticated: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isLoaded: false,
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_AUTH(state, action: PayloadAction<AuthUser>) {
      state.currentUser = action.payload;
      state.isLoaded = true;
      state.authenticated = true;
    },
    CLEAR_AUTH(state) {
      state.currentUser = null;
      state.isLoaded = true;
      state.authenticated = false;
    },
  },
});

export const { SET_AUTH, CLEAR_AUTH } = authSlice.actions;
export default authSlice.reducer;
