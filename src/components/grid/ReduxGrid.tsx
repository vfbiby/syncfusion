import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useEffect, useRef } from 'react';
import { fetchUsersAction } from '../../features/grid/gridSlice';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

export const ReduxGrid = () => {
  const users = useAppSelector(state => state.hostMissions.users);
  const dispatch = useAppDispatch();
  const gridRef = useRef<GridComponent | null>(null);

  useEffect(() => {
    if (gridRef.current) gridRef.current.refresh();
    else console.log('no gridRef');
  }, [users]);
  return (
    <div>
      <button onClick={() => dispatch(fetchUsersAction())} className='p-2 rounded'>fetch
      </button>
      <div className='p-2'>
        <GridComponent ref={(g) => {
          if (g) {
            gridRef.current = g;
          } else console.log('gridInstance is null!');
        }} dataSource={users}>
          <ColumnsDirective>
            <ColumnDirective field='displayName' headerText='displayName' />
            <ColumnDirective field='username' headerText='username' />
          </ColumnsDirective>
        </GridComponent>
      </div>
    </div>
  );
};