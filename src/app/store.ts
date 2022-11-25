import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer from '../features/counter/counterSlice';
import gridReducer, { rootSaga } from '../features/grid/gridSlice';

const sagaMiddleware = createSagaMiddleware();
export const createStore = () => {
  const configureStore1 = configureStore({
    reducer: {
      counter: counterReducer,
      hostMissions: gridReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([sagaMiddleware]);
    },
  });
  sagaMiddleware.run(rootSaga);

  return configureStore1;
};

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch