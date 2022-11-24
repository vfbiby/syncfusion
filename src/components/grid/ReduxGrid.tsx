import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useEffect } from 'react';
import { fetchUsersAction } from '../../features/grid/gridSlice';

export const ReduxGrid = () => {
  const users = useAppSelector(state => state.hostMissions.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);
  return (
    <div>{users.map(user => <div key={user.username}>
      <span>{user.username}</span>
      <span>{user.displayName}</span>
    </div>)}
    </div>
  );
};