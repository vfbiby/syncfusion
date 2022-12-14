import {
  ColumnDirective, ColumnMenu,
  ColumnsDirective, ContextMenu, ContextMenuItem, Edit,
  EditSettingsModel, Filter,
  GridComponent,
  Inject, Page, Resize,
  SelectionSettingsModel, Sort,
  Toolbar, ToolbarItems,
} from '@syncfusion/ej2-react-grids';
import { data } from '../../datasource';
import { useRef, useState } from 'react';

export const contextMenuItems: ContextMenuItem[] = ['AutoFit', 'AutoFitAll',
  'SortAscending', 'SortDescending', 'Copy', 'Edit', 'Delete', 'Save',
  'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
  'LastPage', 'NextPage'];

export const Clipboard = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const toolbarOptions: ToolbarItems[] = ['Add', 'Update', 'Cancel'];
  const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
  const selectionOptions: SelectionSettingsModel = { cellSelectionMode: 'Box', type: 'Multiple', mode: 'Cell' };

  const copy = () => {
    gridRef.current?.copy();
  };

  const copyHeader = () => {
    gridRef.current?.copy(true);
  };

  return <div>
    <button className='px-2 py-1 rounded m-2' onClick={copy}>Copy</button>
    <button className='px-2 py-1 rounded m-2' onClick={copyHeader}>CopyHeader</button>
    <GridComponent
      ref={gridRef}
      showColumnMenu
      allowSorting
      allowFiltering
      allowPaging
      editSettings={editOptions}
      toolbar={toolbarOptions}
      filterSettings={{ type: 'CheckBox' }}
      contextMenuItems={contextMenuItems}
      dataSource={data}
      selectionSettings={selectionOptions}
      enableAutoFill
      height={272}
    >
      <ColumnsDirective>
        <ColumnDirective isPrimaryKey visible={false} field='OrderID' headerText='Order ID' width='120'
                         textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
        <ColumnDirective field='ShipCity' headerText='Ship City' width='150' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='150' />
      </ColumnsDirective>
      <Inject services={[ContextMenu, ColumnMenu, Resize, Page, Filter, Sort, Edit, Toolbar]} />
    </GridComponent>
  </div>;
};