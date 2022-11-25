import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
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
    fetchOrders: (state) => {
      state.isLoading = true;
    },
    getHostMissions: (state, action: PayloadAction<Order[]>) => {
      console.log(action.payload);
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
});

export const { getHostMissions, fetchOrders } = gridSlice.actions;
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
    yield put(getHostMissions(data as Order[]));
  } catch (e) {
  }
}

export const fetchUsersAction = createAction('USER_FETCH');

export function* rootSaga() {
  yield takeLatest(fetchUsersAction, fetchUsers);
}

