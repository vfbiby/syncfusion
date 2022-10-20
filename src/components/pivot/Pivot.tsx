import { IDataOptions, PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

export function Pivot() {
  const remoteData = new DataManager({
    url: 'https://bi.syncfusion.com/northwindservice/api/orders',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });

  const dataSourceSettings: IDataOptions = {
    dataSource: remoteData,
    type: 'JSON',
    expandAll: true,
    filters: [],
    columns: [{ name: 'ProductName', caption: 'Product Name' }],
    rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
    formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
    values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
  };

  return (
    <div className={'app'}>
      <PivotViewComponent
        id={'PivotView'}
        width={'100%'}
        dataSourceSettings={dataSourceSettings}
      >
      </PivotViewComponent>
    </div>
  );
}