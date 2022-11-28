import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { data } from '../../components/grid/DataSource';
import { Order } from '../../app/Type';
import { Sorts } from '@syncfusion/ej2-react-grids';

interface User {
  username: string;
  displayName: string;
  password: string;
}

type OrderStates = {
  orders: { result: Order[], count: number }
  isLoading: boolean;
  filters?: [];
  sorting?: [];
  paging?: [];
};

let initialState: OrderStates = {
  'orders': { result: [], count: 0 },
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
      state.orders.result = action.payload;
      state.orders.count = action.payload.length;
      state.isLoading = false;
    },
    sortByColumn: (state, action: PayloadAction<Sorts>) => {
      const { name, direction } = action.payload as { name: keyof Order, direction: string };
      if (name)
        state.orders.result.sort((a, b) => {
          if (typeof (a[name]) === 'string') { // @ts-ignore
            return direction === 'ascending' ? a[name].localeCompare(b[name]) : b[name].localeCompare(a[name]);
          }
          if (typeof (a[name]) === 'number') { // @ts-ignore
            return action.payload.direction === 'ascending' ? a[name] - b[name] : b[name] - a[name];
          }
        });
    },
  },
});

export const { fetchOrders, sortByColumn, fetchOrdersSuccess } = orderSlice.actions;
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

