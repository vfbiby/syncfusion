import {
  Column,
  ColumnDirective, ColumnMenu,
  ColumnsDirective, ContextMenu, ContextMenuItem,
  Filter,
  FilterEventArgs, FilterSettingsModel,
  GridComponent,
  Group, GroupSettingsModel,
  Inject,
  Page,
  PageSettingsModel,
  Search,
  Sort,
  SortSettingsModel,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { data } from './DataSource';
import { EmitType } from '@syncfusion/ej2-base';

export const contextMenuItems: ContextMenuItem[] = ['AutoFit', 'AutoFitAll',
  'SortAscending', 'SortDescending', 'Copy', 'Edit', 'Delete', 'Save',
  'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
  'LastPage', 'NextPage'];

export function Grid() {
  let grid: GridComponent | null;
  const pageSettings: PageSettingsModel = { pageSize: 10 };
  const sortSettings: SortSettingsModel = {
    columns: [{ field: 'EmployeeID', direction: 'Descending' }],
  };
  const filterSettings: FilterSettingsModel = {
    type: 'CheckBox',
    // columns: [
    //   { field: 'EmployeeID', operator: 'greaterthan', value: 2 },
    //   { field: 'CustomerID', operator: 'contains', value: 'H' },
    // ],
  };

  const groupSettings: GroupSettingsModel = { showGroupedColumn: true, columns: ['EmployeeID'] };
  const hello = (type: EmitType<FilterEventArgs>) => {
    console.log();
  };

  return (
    <div>
      <div className={'p-2 flex gap-2'}>
        <button onClick={() => {
          if (grid) {
            const selectedRow = grid.getSelectedRowIndexes()[0];
            if (grid.getSelectedRowIndexes().length) { // @ts-ignore
              grid.dataSource.splice(selectedRow, 1);
            } else
              alert('No records selected for delete operation');
            grid.refresh();
          }
        }
        } className='p-2'>delete
        </button>
        <button
          onClick={() => {
            if (grid) {
              console.log(grid.searchSettings.fields);
              grid.searchSettings = {
                fields: ['ShipCountry'],
                ignoreCase: true,
                key: 'B',
                operator: 'contains',
              };
            }
          }}
          className={'bg-blue-400 p-2 rounded text-white'}
        >
          Search
        </button>
        <button
          onClick={() => {
            if (grid) {
              console.log(
                grid.filterSettings.columns?.map((column) => {
                  return { field: column.field, value: column.value };
                }),
              );
            }
          }}
          className={'bg-blue-400 p-2 rounded text-white'}
        >
          Filter
        </button>
        <button
          onClick={() => {
            if (grid) {
              console.log('refreshing');
              console.log(
                grid.columns.map((column) => (column as Column).headerText),
              );
              grid.refresh();
            }
          }}
          className={'bg-blue-400 p-2 rounded text-white'}
        >
          Refresh
        </button>
      </div>
      <GridComponent
        ref={(g) => (grid = g)}
        // allowResizing
        // actionBegin={hello}
        allowPaging={true}
        pageSettings={pageSettings}
        allowSorting={true}
        sortSettings={sortSettings}
        allowFiltering={true}
        // filterSettings={filterSettings}
        allowGrouping={true}
        // groupSettings={groupSettings}
        searchSettings={{
          // fields: ['CustomerID'],
          // ignoreCase: true,
          // key: 'Ha',
          // operator: 'contains',
        }}
        toolbar={['Search']}
        showColumnMenu={true}
        dataSource={data}
        contextMenuItems={contextMenuItems}
      >
        <ColumnsDirective>
          <ColumnDirective field='OrderID' width='100' textAlign='Right' />
          <ColumnDirective field='CustomerID' width='100' />
          <ColumnDirective field='EmployeeID' width='100' textAlign='Right' />
          <ColumnDirective
            field='Freight'
            width='100'
            format='C2'
            textAlign='Right'
          />
          <ColumnDirective field='ShipCountry' width='100' />
        </ColumnsDirective>
        <Inject services={[ColumnMenu, ContextMenu, Filter, Sort, Group]} />
      </GridComponent>
    </div>
  );
}
