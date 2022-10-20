import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import * as localData from './localdata.json'

export function Pivot() {
  return (
    <div className={"app"}>
      <PivotViewComponent
        dataSourceSettings={{
          dataSource: localData.data,
          values: [{ name: 'Sold' }, { name: 'Amount' }],
          rows: [{ name: 'Country' }, { name: 'Products' }],
          columns: [{ name: 'Year' }, { name: 'Quarter' }]
        }}
      >
      </PivotViewComponent>
    </div>
  );
}