import './App.css'
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject, Page, PageSettingsModel, Search,
  Sort, SortSettingsModel, Toolbar
} from '@syncfusion/ej2-react-grids';
import { data } from './DataSource';

function App() {
  const pageSettings: PageSettingsModel = { pageSize: 10 };
  const sortSettings: SortSettingsModel = {
    columns: [
      { field: 'EmployeeID', direction: 'Descending' }
    ]
  };
  const filterSettings = {
    columns: [
      { field: 'EmployeeID', operator: 'greaterthan', value: 2 }
    ]
  };

  const groupSettings = { columns: ['EmployeeID'] };
  return <GridComponent
    allowPaging={true}
    pageSettings={pageSettings}
    allowSorting={true}
    sortSettings={sortSettings}
    allowFiltering={false}
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
  </GridComponent>;
}

export default App
