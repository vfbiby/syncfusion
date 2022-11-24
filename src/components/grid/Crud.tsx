import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import React from 'react';
import { Ajax } from '@syncfusion/ej2-base';
import {
  DataResult,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  Edit,
  FilterSettingsModel,
} from '@syncfusion/ej2-grids';

export const Crud = () => {
  let gridRef: GridComponent | null;
  const orderService: OrderService = new OrderService();
  const pageSettingModel: PageSettingsModel = { pageSize: 10 };
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const toolbarOptions: string[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const filterSettings: FilterSettingsModel = { type: 'Excel' };
  const renderComplete = () => {
    if (gridRef && gridRef.dataSource instanceof Array && !(gridRef.dataSource as object[]).length) {
      const state = { skip: 0, take: 10 };
      dataStateChange(state);
    }
  };
  const dataStateChange = (state: DataStateChangeEventArgs) => {
    // @ts-ignore
    if (state.action && (state.action.requestType === 'filterchoicerequest' || state.action.requestType === 'filtersearchbegin')) {
      orderService.execute(state).then((e) => state.dataSource && state.dataSource(e));
    } else {
      orderService.execute(state).then((gridData) => {
        if (gridRef) {
          gridRef.dataSource = gridData;
        }
      });
    }
  };

  function dataSourceChanged(state: DataSourceChangedEventArgs): void {
    console.log('dataSourceChanged', state);
    if (state.action === 'add') {
      orderService.addRecord(state).then(() => state.endEdit?.());
    } else if (state.action === 'edit') {
      orderService.updateRecord(state).then(() => state.endEdit?.());
    } else if (state.requestType === 'delete') {
      orderService.deleteRecord(state).then(() => state.endEdit?.());
    }
  }

  return <div>
    <div className='flex'>
      <button className='p-2 rounded my-2'>Empty</button>
    </div>
    <GridComponent ref={g => gridRef = g} dataBound={renderComplete} dataStateChange={dataStateChange}
                   allowPaging allowGrouping allowSorting allowFiltering
                   toolbar={toolbarOptions}
                   editSettings={editSettings}
                   dataSourceChanged={dataSourceChanged}
                   filterSettings={filterSettings}
                   pageSettings={pageSettingModel}>
      <ColumnsDirective>
        <ColumnDirective field='id' headerText='ID' width='30' textAlign='Right' />
        <ColumnDirective field='username' headerText='Username' width='150' />
        <ColumnDirective field='displayName' headerText='Display Name' width='150' />
        <ColumnDirective field='password' headerText='Password' width='150' />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Group, Toolbar, Edit]} />
    </GridComponent>
  </div>;
};

export class OrderService {
  public ajax: Ajax = new Ajax({
    mode: true,
    onFailure: (e: Error) => false,
    type: 'GET',
  });
  private BASE_URL: string = '/api/1.0/users';

  public addRecord(state: DataSourceChangedEventArgs): Promise<DataResult> {
    const add: Ajax = new Ajax({
      mode: true,
      onFailure: (e: Error) => false,
      type: 'POST',
    });
    add.url = this.BASE_URL;
    return add.send(JSON.stringify(state.data)).then((response: any) => {
      const data: any = JSON.parse(response);
      return data;
    });
  }

  public updateRecord(state: DataSourceChangedEventArgs): Promise<DataResult> {
    const update: Ajax = new Ajax({
      mode: true,
      onFailure: (e: Error) => false,
      type: 'PUT',
    });
    update.url = this.BASE_URL;
    return update.send(JSON.stringify(state.data)).then((response: any) => {
      const data: any = JSON.parse(response);
      return data;
    });
  }

  public deleteRecord(state: DataSourceChangedEventArgs): Promise<DataResult> {
    const remove: Ajax = new Ajax({
      mode: true,
      onFailure: (e: Error) => false,
      type: 'DELETE',
    });
    remove.url = this.BASE_URL;
    // @ts-ignore
    return remove.send(JSON.stringify((state.data && state.data[0]))).then((response: any) => {
      const data: any = JSON.parse(response);
      return data;
    });
  }

  public execute(state: DataStateChangeEventArgs): Promise<DataResult> {
    return this.getData(state);
  }

  private getData(state: DataStateChangeEventArgs): Promise<DataResult> {
    const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
    this.ajax.url = `${this.BASE_URL}?${pageQuery}&$inlinecount=allpages&format=json`;
    return this.ajax.send().then((response: any) => {
      const data: any = JSON.parse(response);
      const newVar = {
        count: data.length,
        result: data,
      };
      console.log(newVar);
      return newVar;
    });
  }
}
