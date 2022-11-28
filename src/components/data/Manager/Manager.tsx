import { data } from '../../grid/DataSource';
import { DataManager, JsonAdaptor, Predicate, Query } from '@syncfusion/ej2-data';
import { Order } from '../../../app/Type';
import { ColumnMenu, ContextMenu, GridComponent, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import { contextMenuItems } from '../../grid/Grid';

const Row = (item: Order) => {
  return <tr>
    <td>{item.OrderID}</td>
    <td>{item.CustomerID}</td>
    <td>{item.EmployeeID}</td>
  </tr>;
};

export const Manager = () => {
  const dataManager = new DataManager({ json: data, adaptor: new JsonAdaptor });
  const result = dataManager
    .executeLocal(
      new Query()
        .select(['OrderID', 'EmployeeID', 'CustomerID'])
        .page(1, 3)
        .sortByDesc('EmployeeID')
        .where('EmployeeID', '>', 0),
    ) as Order[];
  const lists = result.map((row) => <Row key={row.OrderID} {...row} />);
  let predicate = new Predicate('EmployeeID', 'equal', 3)
    .or('EmployeeID', 'equal', 5);
  predicate = predicate.and('ShipRegion', 'equal', 'CJ');
  const resultWithPredicate = dataManager.executeLocal(new Query().where(predicate).take(8));
  const resultWithSearch = dataManager.executeLocal(new Query().search('VI', ['CustomerID']).take(8));
  const resultWithGroup = dataManager.executeLocal(new Query().group('CustomerID').take(8));
  const resultWithAggregate = dataManager.executeLocal(new Query().requiresCount().aggregate('min', 'EmployeeID').take(8));

  return <div className='flex flex-col gap-6'>
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
    <div>
      <span className='text-3xl'>Result with Predicate</span>
      <GridComponent contextMenuItems={contextMenuItems} allowPaging allowSorting showColumnMenu
                     dataSource={resultWithPredicate}>
        <Inject services={[Page, ColumnMenu, ContextMenu, Sort]} />
      </GridComponent>
    </div>
    <div>
      <span className='text-3xl uppercase'>Result with Search</span>
      <GridComponent contextMenuItems={contextMenuItems} allowPaging allowSorting showColumnMenu
                     dataSource={resultWithSearch}>
        <Inject services={[Page, ColumnMenu, ContextMenu, Sort]} />
      </GridComponent>
    </div>
    <div>
      <span className='text-3xl uppercase'>Result with Group</span>
      <GridComponent contextMenuItems={contextMenuItems} allowPaging allowSorting showColumnMenu
                     dataSource={resultWithGroup}>
        <Inject services={[Page, ColumnMenu, ContextMenu, Sort]} />
      </GridComponent>
    </div>
    <div>
      <span className='text-3xl uppercase'>Result with Aggregate</span>
      <GridComponent contextMenuItems={contextMenuItems} allowPaging allowSorting showColumnMenu
                     dataSource={resultWithAggregate}>
        <Inject services={[Page, ColumnMenu, ContextMenu, Sort]} />
      </GridComponent>
    </div>
  </div>;
};