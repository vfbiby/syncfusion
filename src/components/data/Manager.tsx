import { data } from '../grid/DataSource';
import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2-data';
import { Order } from '../../app/Type';
import { GridComponent, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import { ColumnMenu, ContextMenu } from '@syncfusion/ej2-grids';
import { contextMenuItems } from '../grid/Grid';

const Row = (item: Order) => {
  return <tr>
    <td>{item.OrderID}</td>
    <td>{item.CustomerID}</td>
    <td>{item.EmployeeID}</td>
  </tr>;
};

export const Manager = () => {
  const result = new DataManager({ json: data, adaptor: new JsonAdaptor })
    .executeLocal(
      new Query()
        .select(['OrderID', 'EmployeeID', 'CustomerID'])
        .page(1, 3)
        .sortByDesc('EmployeeID')
        .where('EmployeeID', '>', 0),
    ) as Order[];
  const lists = result.map((row) => <Row key={row.OrderID} {...row} />);

  return <div>
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Customer ID</th>
        <th>Employee ID</th>
      </tr>
      </thead>
      <tbody>{lists}</tbody>
    </table>
    <div>
      <GridComponent contextMenuItems={contextMenuItems} allowPaging allowSorting showColumnMenu dataSource={result}>
        <Inject services={[Page, ColumnMenu, ContextMenu, Sort]} />
      </GridComponent>
    </div>
  </div>;
};