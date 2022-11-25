import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useEffect, useRef } from 'react';
import { fetchUsersAction } from '../../features/grid/gridSlice';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

export const ReduxGrid = () => {
  const orders = useAppSelector(state => state.hostMissions.orders);
  const dispatch = useAppDispatch();
  const gridRef = useRef<GridComponent | null>(null);

  useEffect(() => {
    if (gridRef.current) gridRef.current.refresh();
    else console.log('no gridRef');
  }, [orders]);
  return (
    <div>
      <button onClick={() => dispatch(fetchUsersAction())} className='p-2 rounded'>fetch
      </button>
      <div className='p-2'>
        <GridComponent ref={gridRef} dataSource={orders}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' textAlign='Left' headerText='OrderID' />
            <ColumnDirective field='CustomerID' textAlign='Left' headerText='CustomerID' />
            <ColumnDirective field='EmployeeID' textAlign='Left' headerText='EmployeeID' />
            <ColumnDirective field='OrderDate' textAlign='Left' headerText='OrderDate' />
            <ColumnDirective field='ShipName' textAlign='Left' headerText='ShipName' />
            <ColumnDirective field='ShipCity' textAlign='Left' headerText='ShipCity' />
            <ColumnDirective field='ShipAddress' textAlign='Left' headerText='ShipAddress' />
            <ColumnDirective field='ShipRegion' textAlign='Left' headerText='ShipRegion' />
            <ColumnDirective field='ShipPostalCode' textAlign='Left' headerText='ShipPostalCode' />
            <ColumnDirective field='ShipCountry' textAlign='Left' headerText='ShipCountry' />
            <ColumnDirective field='Freight' textAlign='Left' headerText='Freight' />
            <ColumnDirective field='Verified' textAlign='Left' headerText='Verified' />
          </ColumnsDirective>
        </GridComponent>
      </div>
    </div>
  );
};