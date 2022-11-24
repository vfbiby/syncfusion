import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { decrement, increment } from '../features/counter/counterSlice';
import { useAppSelector } from '../app/hook';

export function Counter() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return <div>
    <div>
      <button
        className='p-2 rounded'
        aria-label='Increment value'
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span title='counter' className='w-12 inline-block'>{count}</span>
      <button
        className='p-2 rounded'
        aria-label='Decrement value'
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  </div>;
}