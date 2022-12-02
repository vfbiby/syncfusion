import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { data } from '../../grid/DataSource';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Order } from '../../../app/Type';

function Row(props: IOrder) {
  return (<tr key={props.OrderID}>
    <td>{props.OrderID}</td>
    <td>{props.CustomerID}</td>
    <td>{props.EmployeeID}</td>
  </tr>);
}

type IOrder = { OrderID: number, CustomerID: string, EmployeeID: number };
type ChangedRecordsProps = { changedRecords: any [], addedRecords: any [], deletedRecords: any [] };
export const Batch = () => {
  const gridRef = useRef<GridComponent | null>(null);
  let dm: DataManager;
  let style: { [x: string]: string; } = { class: 'e-form' };
  const [state, setState] = useState<{ items: IOrder[] } | undefined>(undefined);
  const [dataSource] = useState(data.slice(0, 5));
  dm = new DataManager(dataSource);
  const [action, setAction] = useState('Insert');
  const [changes, setChanges] = useState<ChangedRecordsProps>(
    {
      changedRecords: [],
      addedRecords: [],
      deletedRecords: [],
    },
  );
  const [orderID, setOrderID] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [employeeID, setEmployeeID] = useState('');

  const createRow = useCallback((order: IOrder[]) => order.map((row) => <Row key={row.OrderID} {...row} />), []);

  useEffect(() => {
    dm.executeQuery(new Query()).then((e: ReturnOption) => {
      setState({ items: (e.result as IOrder[]) });
    });
  }, []);

  const wrappedAction = () => {
    const rowData: IOrder = {
      CustomerID: customerID,
      EmployeeID: Number(employeeID),
      OrderID: Number(orderID),
    };
    // console.log('rowData', rowData);
    setCustomerID('');
    setOrderID('');
    setEmployeeID('');
    if (action === 'Remove') {
      setChanges(prevState => {
        // console.log('In Remove prevState', prevState);
        const { deletedRecords } = prevState;
        deletedRecords.push(rowData);
        return Object.assign({}, prevState, {
          deletedRecords: deletedRecords,
        });
      });
      // console.log('In Remove', changes);
    } else if (action === 'Update') {
      // console.log('In Update before', changes);
      setChanges(prevState => {
        const { changedRecords } = prevState;
        changedRecords.push(rowData);
        return Object.assign({}, prevState, {
          changedRecords: changedRecords,
        });
      });
      // console.log('In Update', changes);
    } else {
      const { addedRecords } = changes;
      addedRecords.push(rowData);
      setChanges(prevState => {
        return Object.assign({}, prevState, { addedRecords: addedRecords });
      });
      // console.log('In Add', changes);
    }
  };

  function onSelectAction(e: ChangeEvent<HTMLSelectElement>) {
    setAction(e.target.value);
  }

  function onSaveChanges() {
    dm.saveChanges(changes, 'OrderID');
    setChanges({
      addedRecords: [],
      deletedRecords: [],
      changedRecords: [],
    });
    dm.executeQuery(new Query()).then((e: ReturnOption) => {
      // console.log('In ExecuteQuery', changes);
      // console.log('eeeee', e);
      setState({
        items: (e.result as IOrder[]),
      });
    });
    // console.log('In Save changes', changes);
  }

  function gridSet() {
    gridRef.current?.setCellValue(10248, 'ShipRegion', 'SD');
    gridRef.current?.setCellValue(10248, 'CustomerID', 'SD');
  }

  function gridUpdate() {
    // updateCell, updateRow is not working
    gridRef.current?.updateCell(1, 'ShipRegion', 'SD');
    gridRef.current?.updateRow(3, { 'ShipRegion': 'SD' });

    gridRef.current?.updateRowValue(10249, { 'OrderID': 10249, 'CustomerID': '2223', 'ShipRegion': 'DD' });
  }

  const getShipRegionTemplate = (row: Order) => {
    return <span className='p-2 rounded bg-pink-100'>{row.ShipRegion}</span>;
  };

  return <div>
    <div style={style}>
      <select onChange={onSelectAction} defaultValue={action}>
        <option value='Insert'>Insert</option>
        <option value='Update'>Update</option>
        <option value='Remove'>Remove</option>
      </select>
      <input type='number' value={orderID} onChange={(e) => setOrderID(e.target.value)} id='OrderID'
             placeholder='Order ID' />
      <input type='text' value={customerID} onChange={(e) => setCustomerID(e.target.value)} id='CustomerID'
             placeholder='Customer ID' />
      <input type='number' value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} id='EmployeeID'
             placeholder='Employee ID' />
      <input className='px-2 py-1 rounded' type='button' value='Action' id='manipulate' onClick={wrappedAction} />
      <button className='px-2 py-1 rounded ml-3' onClick={onSaveChanges}>Save Changes</button>
    </div>
    <div>
      <table id='datatable' className='e-table'>
        <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer ID</th>
          <th>Employee ID</th>
        </tr>
        </thead>
        <tbody>{state?.items ? createRow(state.items) : null}</tbody>
      </table>
    </div>
    <hr className='my-5' />
    <button className='px-2 py-1 rounded ml-3' onClick={gridSet}>Direct set</button>
    <button className='px-2 py-1 rounded ml-3' onClick={gridUpdate}>Direct Update</button>
    <div className='py-2'>
      <GridComponent ref={gridRef} dataSource={dataSource}>
        <ColumnsDirective>
          <ColumnDirective field='OrderID' isPrimaryKey />
          <ColumnDirective field='CustomerID' />
          <ColumnDirective field='ShipRegion' template={getShipRegionTemplate} />
        </ColumnsDirective>
      </GridComponent>
    </div>
  </div>;
};
