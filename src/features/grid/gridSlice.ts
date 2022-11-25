import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { data } from '../../components/grid/DataSource';
import { Order } from '../../app/Type';

interface User {
  username: string;
  displayName: string;
  password: string;
}

type ReduxGridStates = {
  orders: Order[]
  isLoading: boolean;
};

let initialState: ReduxGridStates = {
  'orders': [],
  isLoading: false,
};

const gridSlice = createSlice({
  name: 'hostMissions',
  initialState,
  reducers: {
    fetchHostMissions: (state) => {
      state.isLoading = true;
    },
    fetchHostMissionsSuccess: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchHostMissions, fetchHostMissionsSuccess } = gridSlice.actions;
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

function asyncFetchOrders() {
  return new Promise<Order[]>(resolve => {
    setTimeout(() => {
      resolve(data as Order[]);
    }, 888);
  });
}

export function* fetchUsers() {
  try {
    const users: User[] = yield call(asyncFetchUsers);
    // yield put(fetchHostMissionsSuccess(orders));
  } catch (e) {
  }
}

export function* fetchOrders() {
  try {
    const orders: Order[] = yield call(asyncFetchOrders);
    yield put(fetchHostMissionsSuccess(orders));
  } catch (e) {
  }
}

export const fetchUsersAction = createAction('USER_FETCH');

export function* rootSaga() {
  // yield takeLatest(fetchUsersAction, fetchUsers);
  yield takeLatest(fetchHostMissions, fetchOrders);
}

