import { render } from 'react-dom';
import React, { Component } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Grid,
  Edit,
  EditSettingsModel,
  Inject,
} from '@syncfusion/ej2-react-grids';
import { data } from '../../datasource';

export class UpdateRow extends React.Component<{}, {}> {
  public grid: Grid | null = null;
  public editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, mode: 'Batch' };

  click() {
    // Update a specified row by given options
    this.grid?.updateRow(1, { OrderID: 10248, CustomerID: 'HANAR', ShipCountry: 'Germany' });
    this.grid?.updateCell(0, 'CustomerID', 'AA');
  }

  public render() {
    return (
      <div>
        <button className="p-2 bg-gray-200 text-red-400 rounded m-2" onClick={this.click.bind(this)}>Click</button>
        <GridComponent dataSource={data} editSettings={this.editOptions} ref={g => this.grid = g}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' isPrimaryKey={true} width='100' textAlign='Right' />
            <ColumnDirective field='CustomerID' width='100' />
            <ColumnDirective field='ShipCountry' width='100' />
          </ColumnsDirective>
          <Inject services={[Edit]} />
        </GridComponent>
      </div>
    );
  }
};