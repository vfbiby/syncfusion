import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

interface User {
  username: string;
  displayName: string;
  password: string;
}

let initialState: { users: User[] } = {
  users: [],
};

const gridSlice = createSlice({
  name: 'hostMissions',
  initialState,
  reducers: {
    getHostMissions: (state, action: PayloadAction<User[]>) => {
      console.log(action.payload);
      state.users = action.payload;
    },
  },
});

export const { getHostMissions } = gridSlice.actions;
export default gridSlice.reducer;

function asyncFetchUsers() {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve([{
        username: 'james',
        displayName: 'J',
        password: 'sk',
      }]);
    }, 1000);
  });
}

export function* fetchUsers(action: any) {
  try {
    const users: User[] = yield call(asyncFetchUsers);
    yield put(getHostMissions(users));
  } catch (e) {
  }
}

export const fetchUsersAction = createAction('USER_FETCH');

export function* rootSaga() {
  yield takeLatest(fetchUsersAction, fetchUsers);
}

