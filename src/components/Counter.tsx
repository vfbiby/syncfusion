import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { decrement, increment, selectCount } from '../features/counter/counterSlice';
import { useAppSelector } from '../app/hook';

type CounterP = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

export function Counter(props: CounterP) {

  return <div>
    <div>
      <button
        className='p-2 rounded'
        aria-label='Increment value'
        onClick={() => props.increment()}
      >
        Increment
      </button>
      <span title='counter' className='w-12 inline-block'>{props.count}</span>
      <button
        className='p-2 rounded'
        aria-label='Decrement value'
        onClick={() => props.decrement()}
      >
        Decrement
      </button>
    </div>
  </div>;
}

const mapStateToProps = (state: RootState) => {
  return { count: selectCount(state) };
};

const mapDispatchToProps = {
    increment: increment, decrement: decrement,
  }
;

export default connect(mapStateToProps, mapDispatchToProps)(Counter);