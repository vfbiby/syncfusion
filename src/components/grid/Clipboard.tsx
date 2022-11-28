import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { data } from '../../datasource';
import { useRef } from 'react';

export const Clipboard = () => {
  const gridRef = useRef<GridComponent | null>(null);

  const copy = () => {
    gridRef.current?.copy();
  };

  const copyHeader = () => {
    gridRef.current?.copy(true);
  };

  return <div>
    <button className="px-2 py-1 rounded m-2" onClick={copy}>Copy</button>
    <button className="px-2 py-1 rounded m-2" onClick={copyHeader}>CopyHeader</button>
    <GridComponent ref={gridRef} dataSource={data} selectionSettings={{ type: 'Multiple' }} height={272}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
        <ColumnDirective field='ShipCity' headerText='Ship City' width='150' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='150' />
      </ColumnsDirective>
    </GridComponent>
  </div>;
};