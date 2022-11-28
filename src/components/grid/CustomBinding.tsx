import {
  ColumnDirective,
  ColumnsDirective, DataResult, DataStateChangeEventArgs,
  GridComponent, Group,
  Inject, Page,
  PageSettingsModel, Sort,
} from '@syncfusion/ej2-react-grids';
import React from 'react';
import { Ajax, getValue } from '@syncfusion/ej2-base';

export const CustomBinding = () => {
  let gridRef: GridComponent | null;
  const orderService: OrderService = new OrderService();
  const pageSettingModel: PageSettingsModel = { pageSize: 10 };
  const renderComplete = () => {
    if (gridRef && gridRef.dataSource instanceof Array && !(gridRef.dataSource as object[]).length) {
      const state = { skip: 0, take: 10 };
      dataStateChange(state);
    }
  };
  const dataStateChange = (state: DataStateChangeEventArgs) => {
    console.log('111', state);
    orderService.execute(state).then((gridData) => {
      if (gridRef) {
        gridRef.dataSource = gridData;
      }
    });
  };
  return <div>
    <div className='flex'>
      <button className='p-2 rounded my-2'>Empty</button>
    </div>
    <GridComponent ref={g => gridRef = g} dataBound={renderComplete} dataStateChange={dataStateChange} allowPaging
                   allowGrouping allowSorting
                   pageSettings={pageSettingModel}>
      <ColumnsDirective>
        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
        <ColumnDirective field='ShipCity' headerText='Ship City' width='150' />
        <ColumnDirective field='ShipName' headerText='Ship Name' width='150' />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Group]} />
    </GridComponent>
  </div>;
};

export class OrderService {
  public ajax: Ajax = new Ajax({
    mode: true,
    onFailure: (e: Error) => false,
    type: 'GET',
  });
  private BASE_URL: string = 'https://ej2services.syncfusion.com/production/web-services/api/Orders';

  public execute(state: DataStateChangeEventArgs): Promise<DataResult> {
    return this.getData(state);
  }

  private getData(state: DataStateChangeEventArgs): Promise<DataResult> {
    const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
    this.ajax.url = `${this.BASE_URL}?${pageQuery}&$inlinecount=allpages&format=json`;
    return this.ajax.send().then((response: any) => {
      const data: any = JSON.parse(response);
      const newVar = {
        count: parseInt(getValue('count', data), 10),
        result: getValue('result', data),
      };
      console.log(newVar);
      return newVar;
    });
  }
}