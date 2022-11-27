import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { data } from '../../grid/DataSource';

function Row(props: IOrder) {
  return (<tr key={props.OrderID}>
    <td>{props.OrderID}</td>
    <td>{props.CustomerID}</td>
    <td>{props.EmployeeID}</td>
  </tr>);
}

type IOrder = { OrderID: number, CustomerID: string, EmployeeID: number };
export const Crud = () => {
  let dm: DataManager;
  let style: { [x: string]: string; } = { class: 'e-form' };
  const [state, setState] = useState<{ items: IOrder[] } | undefined>(undefined);
  dm = new DataManager(data.slice(0, 5));
  const [action, setAction] = useState('Crud');

  function createRow(order: IOrder[]) {
    return order.map((row) => <Row key={row.OrderID} {...row} />);
  }

  useEffect(() => {
    dm.executeQuery(new Query()).then((e: ReturnOption) => {
      setState({ items: (e.result as IOrder[]) });
    });
  }, []);

  const wrappedAction = useCallback(() => {
      const orderId = document.getElementById('OrderID') as HTMLInputElement;
      const cusId = document.getElementById('CustomerID') as HTMLInputElement;
      const empId = document.getElementById('EmployeeID') as HTMLInputElement;
      const rowData: IOrder = {
        CustomerID: cusId.value,
        EmployeeID: Number(empId.value),
        OrderID: Number(orderId.value),
      };
      if (!rowData.OrderID) return;
      if (action === 'Remove')
        dm.remove('OrderID', rowData);
      else if (action === 'Update')
        dm.update('OrderID', rowData);
      else
        dm.insert(rowData);
      dm.executeQuery(new Query()).then((e: ReturnOption) => {
        console.log(e.result);
        setState({
          items: (e.result as IOrder[]),
        });
      });
    }
    , [action]);

  function onSelectAction(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setAction(e.target.value);
  }

  return <div>
    <div style={style}>
      <select onChange={onSelectAction} defaultValue={action}>
        <option selected value='Crud'>Crud</option>
        <option value='Update'>Update</option>
        <option value='Remove'>Remove</option>
      </select>
      <input type='number' id='OrderID' placeholder='Order ID' />
      <input type='text' id='CustomerID' placeholder='Customer ID' />
      <input type='number' id='EmployeeID' placeholder='Employee ID' />
      <input className='px-2 py-1 rounded' type='button' value='Action' id='manipulate' onClick={wrappedAction} />
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