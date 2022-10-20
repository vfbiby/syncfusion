import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Search,
  Sort,
  SortSettingsModel,
  Toolbar
} from '@syncfusion/ej2-react-grids';
import { data } from './DataSource';

export function Grid() {
  let grid: GridComponent | null;
  const pageSettings: PageSettingsModel = { pageSize: 10 };
  const sortSettings: SortSettingsModel = {
    columns: [
      { field: 'EmployeeID', direction: 'Descending' }
    ]
  };
  const filterSettings = {
    columns: [
      { field: 'EmployeeID', operator: 'greaterthan', value: 2 },
      { field: 'CustomerID', operator: 'contains', value: 'H' }
    ]
  };

  const groupSettings = { columns: ['EmployeeID'] };

  return (<div>
    <div className={"p-2 flex gap-2"}>
      <button onClick={() => {
        if (grid) {
          console.log(grid.searchSettings.fields);
          grid.searchSettings = {
            fields: ['ShipCountry'],
            ignoreCase: true,
            key: 'B',
            operator: 'contains'
          };
        }
      }} className={"bg-blue-400 p-2 rounded text-white"}>Search
      </button>
      <button onClick={() => {
        if (grid) {
          console.log(grid.filterSettings.columns?.map(column => {
            return { field: column.field, value: column.value }
          }))
        }
      }} className={"bg-blue-400 p-2 rounded text-white"}>Filter
      </button>
      <button onClick={() => {
        if (grid) {
          console.log('refreshing');
          grid.refresh();
        }
      }} className={"bg-blue-400 p-2 rounded text-white"}>Refresh
      </button>
    </div>
    <GridComponent
      ref={g => grid = g}
      allowPaging={true}
      pageSettings={pageSettings}
      allowSorting={true}
      sortSettings={sortSettings}
      allowFiltering={true}
      filterSettings={filterSettings}
      allowGrouping={false}
      groupSettings={groupSettings}
      searchSettings={{
        fields: ['CustomerID'],
        ignoreCase: true,
        key: 'Ha',
        operator: 'contains'
      }}
      toolbar={['Search']}
      dataSource={data}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' width='100' textAlign="Right"/>
        <ColumnDirective field='CustomerID' width='100'/>
        <ColumnDirective field='EmployeeID' width='100' textAlign="Right"/>
        <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right"/>
        <ColumnDirective field='ShipCountry' width='100'/>
      </ColumnsDirective>
      <Inject services={[Page, Sort, Filter, Search, Toolbar, Group]}/>
    </GridComponent>
  </div>);
}