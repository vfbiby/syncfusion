import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import React from 'react';
import { DataManager, ODataAdaptor, Query } from '@syncfusion/ej2-data';

export const SendExtraParams = () => {
  const dataManager = new DataManager({
    adaptor: new ODataAdaptor(),
    url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/',
  });
  const query = new Query().addParams('ej2grid', 'yes');
  return <div>
    <GridComponent dataSource={dataManager} query={query}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
        <ColumnDirective field='ShipCity' headerText='Ship City' width='150' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='150' />
      </ColumnsDirective>
    </GridComponent>
  </div>;
};