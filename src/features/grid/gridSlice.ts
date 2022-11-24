import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  displayName: string;
  password: string;
}

let initialState: { user: User[] } = {
  user: [],
};

const gridSlice = createSlice({
  name: 'hostMissions',
  initialState,
  reducers: {
    getHostMissions: (state, action: PayloadAction<User>) => {
      state.user = [action.payload];
    },
  },
});