import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { data } from '../../components/grid/DataSource';
import { Order } from '../../app/Type';

interface User {
  username: string;
  displayName: string;
  password: string;
}

type OrderStates = {
  orders: Order[]
  isLoading: boolean;
};

let initialState: OrderStates = {
  'orders': [],
  isLoading: false,
};

const orderSlice = createSlice({
  name: 'hostMissions',
  initialState,
  reducers: {
    fetchOrders: (state) => {
      state.isLoading = true;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchOrders, fetchOrdersSuccess } = orderSlice.actions;
export default orderSlice.reducer;

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

export function* fetchOrdersSaga() {
  try {
    const orders: Order[] = yield call(asyncFetchOrders);
    yield put(fetchOrdersSuccess(orders));
  } catch (e) {
  }
}

export const fetchUsersAction = createAction('USER_FETCH');

export function* rootSaga() {
  // yield takeLatest(fetchUsersAction, fetchUsers);
  yield takeLatest(fetchOrders, fetchOrdersSaga);
}

