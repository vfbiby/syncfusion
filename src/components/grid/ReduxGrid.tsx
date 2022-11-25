import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useEffect, useRef } from 'react';
import { fetchHostMissions, fetchUsersAction } from '../../features/grid/gridSlice';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

export const ReduxGrid = () => {
  const orders = useAppSelector(state => state.hostMissions.orders);
  const isLoading = useAppSelector(state => state.hostMissions.isLoading);
  const dispatch = useAppDispatch();
  const gridRef = useRef<GridComponent | null>(null);

  useEffect(() => {
    if (gridRef.current) gridRef.current.refresh();
    else console.log('no gridRef');
  }, [orders]);
  return (
    <div>
      <button onClick={() => {
        return dispatch(fetchHostMissions());
      }} className='p-2 rounded'>fetch
      </button>
      <div className='p-2'>
        {isLoading && <span>isLoading....</span>}
        <GridComponent ref={gridRef} dataSource={orders}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' textAlign='Left' headerText='Order ID' />
            <ColumnDirective field='CustomerID' textAlign='Left' headerText='Customer ID' />
            <ColumnDirective field='EmployeeID' textAlign='Left' headerText='Employee ID' />
            <ColumnDirective field='OrderDate' textAlign='Left' headerText='Order Date' />
            <ColumnDirective field='ShipName' textAlign='Left' headerText='Ship Name' />
            <ColumnDirective field='ShipCity' textAlign='Left' headerText='Ship City' />
            <ColumnDirective field='ShipAddress' textAlign='Left' headerText='Ship Address' />
            <ColumnDirective field='ShipRegion' textAlign='Left' headerText='Ship Region' />
            <ColumnDirective field='ShipPostalCode' textAlign='Left' headerText='ShipPostal Code' />
            <ColumnDirective field='ShipCountry' textAlign='Left' headerText='Ship Country' />
            <ColumnDirective field='Freight' textAlign='Left' headerText='Freight' />
            <ColumnDirective field='Verified' textAlign='Left' headerText='Verified' />
          </ColumnsDirective>
        </GridComponent>
      </div>
    </div>
  );
};