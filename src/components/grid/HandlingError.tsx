import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import React from 'react';
import { DataManager } from '@syncfusion/ej2-data';
import { FailureEventArgs } from '@syncfusion/ej2-grids';

const onActionFailure = (e: FailureEventArgs, gridRef: GridComponent | null) => {
  const span = document.createElement('span');
  if (gridRef) {
    (gridRef.element.parentNode as HTMLElement).insertBefore(span, gridRef.element);
    span.style.color = '#FF0000';
    // @ts-ignore
    span.innerHTML = 'Server exception 404 Not found, ' + e.name;
  }
};
export const HandlingError = () => {
  const dataManager = new DataManager({
    url: 'https://services.odata.org/invalidurl',
  });
  let gridRef: GridComponent | null;
  return <div>
    <GridComponent ref={g => gridRef = g} dataSource={dataManager} actionFailure={(e) => onActionFailure(e, gridRef)}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
        <ColumnDirective field='ShipCity' headerText='Ship City' width='150' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='150' />
      </ColumnsDirective>
    </GridComponent>
  </div>;
};
