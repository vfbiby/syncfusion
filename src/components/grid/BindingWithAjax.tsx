import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import React from 'react';
import { Ajax } from '@syncfusion/ej2-base';

export const BindingWithAjax = () => {
  let gridRef: GridComponent | null;
  const ajax = new Ajax('https://ej2services.syncfusion.com/production/web-services/api/Orders', 'GET');
  ajax.send().then((data: any) => {
    if (gridRef) gridRef.dataSource = JSON.parse(data);
  });
  const addRecords = () => {
    if (gridRef) {
      gridRef.dataSource = [{}];
    }
  };
  return <div>
    <div className='flex'>
      <button onClick={addRecords} className='p-2 rounded my-2'>Empty</button>
    </div>
    <GridComponent ref={g => gridRef = g}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
        <ColumnDirective field='ShipCity' headerText='Ship City' width='150' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='150' />
      </ColumnsDirective>
    </GridComponent>
  </div>;
};
