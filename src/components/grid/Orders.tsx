import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useEffect, useRef } from 'react';
import {
  ColumnDirective, ColumnMenu,
  ColumnsDirective, DataStateChangeEventArgs,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { fetchOrders, sortByColumn } from '../../features/grid/orderSlice';
import { OrderService } from './CustomBinding';

export const Orders = () => {
  const orders = useAppSelector(state => state.hostMissions.orders);
  const isLoading = useAppSelector(state => state.hostMissions.isLoading);
  const dispatch = useAppDispatch();
  const gridRef = useRef<GridComponent | null>(null);
  const orderService: OrderService = new OrderService();
  let data: any;

  function renderComplete() {
    if (gridRef.current && gridRef.current.dataSource instanceof Array && !(gridRef.current.dataSource as object[]).length) {
      const state = { skip: 0, take: 10 };
      dataStateChange(state);
    }/*    if (gridRef.current && (gridRef.current.dataSource instanceof Array) && !(gridRef.current.dataSource as Object[]).length) {
      const state = { skip: 0, take: 10 };
      dataStateChange(state);
    }*/
  }

  function dataStateChange(state: DataStateChangeEventArgs) {
    console.log('dataStateChange', state);
    if (state.action && state.action.requestType === 'sorting') {
      dispatch(sortByColumn(state.sorted ? state.sorted[0] : {}));
    }
    if (gridRef.current)
      gridRef.current.dataSource = orders;
  }

  useEffect(() => {
    console.log('in dispatch');
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    if (gridRef.current) gridRef.current.refresh();
    else console.log('no gridRef');
  }, [orders]);

  return (
    <div>
      <button onClick={() => {
        return dispatch(fetchOrders());
      }} className='p-2 rounded'>fetch
      </button>
      <div className='p-2'>
        {isLoading && <span>isLoading....</span>}
        <GridComponent
          allowSorting
          allowFiltering
          allowPaging
          allowGrouping
          showColumnMenu
          filterSettings={{ type: 'CheckBox' }}
          groupSettings={{ showGroupedColumn: true }}
          toolbar={['Add', 'Edit', 'Update', 'Delete', 'Search']}
          dataBound={renderComplete}
          dataStateChange={dataStateChange}
          ref={gridRef}
        >
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
          </ColumnsDirective>
          <Inject services={[Page, Group, ColumnMenu, Sort, Toolbar, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

