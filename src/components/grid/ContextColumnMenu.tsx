import {
  ColumnChooser,
  ColumnDirective,
  ColumnMenu,
  ColumnsDirective,
  ContextMenu,
  Edit,
  ExcelExport,
  Filter,
  FilterSettingsModel,
  GridComponent, Group,
  GroupSettingsModel,
  Inject,
  Page,
  PdfExport,
  Resize,
  Sort, Toolbar, ToolbarItems,
} from '@syncfusion/ej2-react-grids';
import { data } from '../../datasource';
import { contextMenuItems } from './Clipboard';

export const ContextColumnMenu = () => {
  const groupOptions: GroupSettingsModel = { showGroupedColumn: true, showDropArea: false };
  const filterSettings: FilterSettingsModel = { type: 'CheckBox' };
  const toolbarOptions: ToolbarItems[] = ['ColumnChooser'];

  return <div>
    <GridComponent
      allowPaging
      allowGrouping
      allowSorting
      showColumnMenu
      allowExcelExport
      allowPdfExport
      allowFiltering
      allowResizing
      showColumnChooser
      toolbar={toolbarOptions}
      contextMenuItems={contextMenuItems}
      groupSettings={groupOptions}
      filterSettings={filterSettings}
      dataSource={data}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer Name' />
        <ColumnDirective field='Freight' headerText='Freight' format='C2' textAlign='Right' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='200' />
      </ColumnsDirective>
      <Inject
        services={[Sort, ColumnMenu, ColumnChooser, Toolbar, Resize, ContextMenu, Filter, Page, Group, ExcelExport, Edit, PdfExport]} />
    </GridComponent>
  </div>;
};