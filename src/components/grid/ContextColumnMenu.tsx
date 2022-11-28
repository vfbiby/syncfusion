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
  PdfExport, Reorder,
  Resize, RowDataBoundEventArgs,
  Sort, Toolbar, ToolbarItems,
} from '@syncfusion/ej2-react-grids';
import { data } from '../../datasource';
import { contextMenuItems } from './Clipboard';
import { Order } from '../../app/Type';

export const ContextColumnMenu = () => {
  const groupOptions: GroupSettingsModel = { showGroupedColumn: true, showDropArea: false };
  const filterSettings: FilterSettingsModel = { type: 'CheckBox' };
  const toolbarOptions: ToolbarItems[] = ['ColumnChooser'];

  const rowDataBound = (args: RowDataBoundEventArgs) => {
    if ((args.data as Order).OrderID <= 10249)
      args.rowHeight = 50;
  };

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
      allowReordering
      rowDataBound={rowDataBound}
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
        services={[Sort, ColumnMenu, Reorder, ColumnChooser, Toolbar, Resize, ContextMenu, Filter, Page, Group, ExcelExport, Edit, PdfExport]} />
    </GridComponent>
  </div>;
};