import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2-data';
import { data } from '../../../datasource';
import {
  ColumnDirective,
  ColumnsDirective, Edit, EditSettingsModel,
  GridComponent,
  Inject,
  Page,
  Sort,
  SortSettingsModel, Toolbar, ToolbarItems,
} from '@syncfusion/ej2-react-grids';
import { Order } from '../../../app/Type';
import { useRef } from 'react';

const dm = new DataManager({ json: data, adaptor: new JsonAdaptor });
const sortSettings: SortSettingsModel = {
  columns: [{ field: 'OrderID', direction: 'Ascending' }],
};
const editOptions: EditSettingsModel = { allowEditing: true, allowDeleting: true, allowAdding: true, mode: 'Batch' };
const toolbarOptions: ToolbarItems[] = ['Add', 'Update', 'Delete', 'Edit'];

export const ManagerLocal = () => {
  const gridRef = useRef<GridComponent | null>(null);

  const add = () => {
    dm.insert({ OrderID: 1, CustomerID: 'ZZ', ShipRegion: 'A' });
  };

  const gridAddRow = () => {
    gridRef.current?.addRecord({ OrderID: 1111, CustomerID: 'James', ShipRegion: 'C' });
  };

  const gridUpdateRow = () => {
    gridRef.current?.updateRow(1, { OrderID: 10248, CustomerID: 'EE', ShipRegion: 'G' });
  };

  const setRow = () => {
    gridRef.current?.setRowData(10251, { OrderID: 10251, CustomerID: 'EE', ShipRegion: 'G' });
  };

  const setCell = () => {
    gridRef.current?.setCellValue(10250, 'CustomerID', 'JAMES');
  };

  const update = () => {
    dm.update('OrderID', { OrderID: 10248, CustomerID: 'ZZ', ShipRegion: 'A' });
  };

  const getCustomTemplate = (rows: Order) => {
    return <div><input className='px-2 py-1 rounded' defaultValue={rows.ShipCity} /></div>;
  };

  return <div>
    <div>
      <button onClick={add} className='p-2 m-2 rounded'>DM Add</button>
      <button onClick={update} className='p-2 m-2 rounded'>DM Update</button>
      <button onClick={gridAddRow} className='p-2 m-2 rounded'>Grid Add</button>
      <button onClick={gridUpdateRow} className='p-2 m-2 rounded'>Grid Update</button>
      <button onClick={setCell} className='p-2 m-2 rounded'>Set Cell</button>
      <button onClick={setRow} className='p-2 m-2 rounded'>Set Row</button>
    </div>
    <GridComponent ref={gridRef} allowSorting allowPaging toolbar={toolbarOptions} editSettings={editOptions}
                   sortSettings={sortSettings} dataSource={dm}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' isPrimaryKey={true} />
        <ColumnDirective field='CustomerID' />
        <ColumnDirective field='ShipRegion' />
        <ColumnDirective headerText='City' template={getCustomTemplate} />
      </ColumnsDirective>
      <Inject services={[Sort, Toolbar, Edit, Page]} />
    </GridComponent>
  </div>;
};