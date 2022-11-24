import { decrement, increment, selectCount } from '../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';

export function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

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