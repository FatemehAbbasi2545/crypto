import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Column, TableOptions } from './../../model/table.model';
import { CryptoCurrency } from './../../model/crypto.interface';

@Component({
  selector: 'crypto-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.css'
})
export class CryptoTableComponent<T> implements AfterViewInit {
  @Input() set dataList(value: T[]) {
    if (value && value.length) {
      this.dataSource.data = value;
    }
  }

  @Input() set tableOptions(value: TableOptions) {
    if (value) {
      this.pageSize = value.pageSize;
      this.pageSizeOptions = [value.pageSize];
      this.displayedColumns = value.displayedColumns;
      this.columns = value.columns;
    }
  }

  @Output() onRowClick: EventEmitter<string> = new EventEmitter(); 

  @ViewChild('paginator') paginator!: MatPaginator;
  
  pageSize: number = 10;
  pageSizeOptions: number[] = [10];

  columns: Column[] = [];
  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<T>();

  ngAfterViewInit() {        
    this.dataSource.paginator = this.paginator;
  }  

  getCellValue(item: T, col: Column) {
    if (item && col && col.colDef) {      
      return item[col.colDef as keyof typeof item]   
    }
    return null;
  }

  handleRowClick(row: CryptoCurrency): void {
    this.onRowClick.emit(row.id);
  }
}
