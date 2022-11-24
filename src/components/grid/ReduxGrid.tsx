import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useEffect } from 'react';
import { fetchUsersAction } from '../../features/grid/gridSlice';

export const ReduxGrid = () => {
  const users = useAppSelector(state => state.hostMissions.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(fetchUsersAction());
  }, []);
  return (
    <div>
      <button onClick={() => dispatch(fetchUsersAction())} className='p-2 rounded'>fetch</button>
      <div className='p-2'>
        {users.map(user => <div key={user.username}>
          <span className='w-6 h-6 inline-block rounded-full bg-pink-200'>{user.displayName}</span>
          <span>{user.username}</span>
        </div>)}
      </div>
    </div>
  );
};