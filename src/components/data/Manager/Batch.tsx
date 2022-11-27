import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { data } from '../../grid/DataSource';

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
  let dm: DataManager;
  let style: { [x: string]: string; } = { class: 'e-form' };
  const [state, setState] = useState<{ items: IOrder[] } | undefined>(undefined);
  dm = new DataManager(data.slice(0, 5));
  const [action, setAction] = useState('Insert');
  const [changes, setChanges] = useState<ChangedRecordsProps>(
    {
      changedRecords: [],
      addedRecords: [],
      deletedRecords: [],
    },
  );

  function createRow(order: IOrder[]) {
    return order.map((row) => <Row key={row.OrderID} {...row} />);
  }

  useEffect(() => {
    dm.executeQuery(new Query()).then((e: ReturnOption) => {
      setState({ items: (e.result as IOrder[]) });
    });
  }, []);

  const wrappedAction = useCallback(async () => {
      const orderId = document.getElementById('OrderID') as HTMLInputElement;
      const cusId = document.getElementById('CustomerID') as HTMLInputElement;
      const empId = document.getElementById('EmployeeID') as HTMLInputElement;
      const rowData: IOrder = {
        CustomerID: cusId.value,
        EmployeeID: Number(empId.value),
        OrderID: Number(orderId.value),
      };
      console.log('rowData', rowData);
      if (!rowData.OrderID) return;
      orderId.value = cusId.value = empId.value = '';
      if (action === 'Remove') {
        await setChanges(prevState => {
          console.log('In Remove prevState', prevState);
          const { deletedRecords } = prevState;
          deletedRecords.push(rowData);
          return Object.assign({}, prevState, {
            deletedRecords: deletedRecords,
          });
        });
        console.log('In Remove', changes);
      } else if (action === 'Update') {
        console.log('In Update before', changes);
        await setChanges(prevState => {
          const { changedRecords } = prevState;
          changedRecords.push(rowData);
          return Object.assign({}, prevState, {
            changedRecords: changedRecords,
          });
        });
        console.log('In Update', changes);
      } else {
        const { addedRecords } = changes;
        addedRecords.push(rowData);
        await setChanges(prevState => {
          return Object.assign({}, prevState, { addedRecords: addedRecords });
        });
        console.log('In Add', changes);
      }
    }
    , [action]);

  function onSelectAction(e: ChangeEvent<HTMLSelectElement>) {
    setAction(e.target.value);
  }

  async function onSaveChanges() {
    dm.saveChanges(changes);
    await setChanges(prevState => {
      const newChanges = {
        addedRecords: [],
        deletedRecords: [],
        changedRecords: [],
      };
      return Object.assign({}, newChanges);
    });
    dm.executeQuery(new Query()).then((e: ReturnOption) => {
      console.log('In ExecuteQuery', changes);
      setState({
        items: (e.result as IOrder[]),
      });
    });
    console.log('In Save changes', changes);
  }

  return <div>
    <div style={style}>
      <select onChange={onSelectAction} defaultValue={action}>
        <option value='Insert'>Insert</option>
        <option value='Update'>Update</option>
        <option value='Remove'>Remove</option>
      </select>
      <input type='number' id='OrderID' placeholder='Order ID' />
      <input type='text' id='CustomerID' placeholder='Customer ID' />
      <input type='number' id='EmployeeID' placeholder='Employee ID' />
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
  </div>;
};
