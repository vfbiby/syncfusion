import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent, Group,
  Inject,
  Page,
  Sort,
} from '@syncfusion/ej2-react-grids';
import { ColumnMenu, Edit, ExcelExport, FilterSettingsModel, PdfExport } from '@syncfusion/ej2-grids';
import { data } from '../../datasource';

export const ColumnMenuExample = () => {
  const groupOptions = { showGroupedColumn: true };
  const filterSettings: FilterSettingsModel = { type: 'CheckBox' };

  return <div>
    <GridComponent
      allowPaging
      allowGrouping
      allowSorting
      showColumnMenu
      allowExcelExport
      allowPdfExport
      allowFiltering
      groupSettings={groupOptions}
      filterSettings={filterSettings}
      dataSource={data}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer Name' />
        <ColumnDirective field='Freight' headerText='Freight' format='C2' textAlign='Right' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='200' />
      </ColumnsDirective>
      <Inject services={[Sort, ColumnMenu, Filter, Page, Group, ExcelExport, Edit, PdfExport]} />
    </GridComponent>
  </div>;
};