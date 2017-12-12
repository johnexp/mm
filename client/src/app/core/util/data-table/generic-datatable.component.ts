import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfirmationDialogComponent } from './../dialog/confirmation-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericDataSource } from './generic-datasource';
import { DataSource } from '@angular/cdk/collections';
import { GenericService } from './../../service/generic.service';
import { Pagination } from './../../domain/pagination';
import { GenericDatabase } from './generic-database';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSortable } from '@angular/material';
import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-generic-datatable',
  templateUrl: './generic-datatable.component.html',
  styleUrls: ['./generic-datatable.component.css'],
  providers: [GenericService]
})
export class GenericDatatableComponent implements OnInit, AfterViewInit {

  @Input() columns: any[];
  @Input() selectable: Boolean;
  @Input() multipleSelection: Boolean = true;
  @Input() selectionData: any[];
  @Input() selectedIds: any[] = [];
  @Input() showSelected: Boolean = false;
  @Input() filterPlaceholder: String = 'Filtrar';
  @Input() hasFilter: Boolean = true;
  @Input() hasPaginator: Boolean = true;
  @Input() actions: any;
  @Input() lazy: Boolean = false;
  @Input() resource: string;
  @Input() canCreate: Boolean = true;
  @Input() customEdit: Boolean = false;
  @Input() logicalExclusion: Boolean = false;
  @Output() deleteRecord: EventEmitter<any> = new EventEmitter<any>();
  @Output() editRecord: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('filter') filter: ElementRef;
  // TODO: fazer filtro de itens selecionados
  // @ViewChild('filterSelected') filterSelected: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ContentChild('filtersRef', { read: TemplateRef }) filtersRef: TemplateRef<any>;
  @ContentChild('columnsRef', { read: TemplateRef }) columnsRef: TemplateRef<any>;
  @ContentChild('buttonsRef', { read: TemplateRef }) buttonsRef: TemplateRef<any>;

  displayedColumns: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  resultsLength: Number = 0;
  isLoadingResults: Boolean = false;
  isRateLimitReached: Boolean = false;
  hasUpdate: Boolean = false;
  hasDelete: Boolean = false;
  model: any = {};
  _dataChange = new BehaviorSubject(new GenericDatabase());

  get database(): GenericDatabase {
    if (!this.lazy) {
      if (this._dataChange.value.data.length !== this.dataSource.data.length) {
        this.dataSource = new MatTableDataSource(this._dataChange.value.data);
        this.dataSource.sort = this.sort;
        if (this.hasPaginator) {
          this.dataSource.paginator = this.paginator;
        }
      }
    }
    return this._dataChange.value;
  }

  @Input('database')
  set database(database: GenericDatabase) {
    this._dataChange.next(database);
  }

  constructor(private genericService: GenericService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.createColumns();
  }

  ngAfterViewInit() {
    if (this.lazy) {
      this.database = new GenericDatabase;

      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      Observable.merge(this.sort.sortChange, this.paginator.page)
        .startWith(null)
        .switchMap(() => {
          this.isLoadingResults = true;
          this.clearEmptyFilterValues();
          return this.genericService.filterGeneric(this.model,
            this.resource,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize);
        })
        .map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;

          return data.docs;
        })
        .catch(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return Observable.of([]);
        })
        .subscribe(data => {
          this.dataSource.data = data;
        });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  clearEmptyFilterValues() {
    const objKeys = Object.keys(this.model);
    for (let index = 0; index < objKeys.length; index++) {
      const key = objKeys[index];
      if (this.model[key] === '') {
        delete this.model[key];
      }
    }
  }

  /**
   * Create table columns
   */
  createColumns() {
    if (this.selectable) {
      this.displayedColumns.push('selection');
    }
    if (this.actions) {
      this.displayedColumns.push('actions');
    }
    this.displayedColumns.push(...this.columns.map(x => x.columnDef));
  }

  /**
   * Changes records selection
   *
   * @param record - selected record
   */
  changeSelection(record) {
    if (this.multipleSelection) {
      const recordIndex = this.selectionData.findIndex(data => data._id === record._id);
      const recordIdIndex = this.selectedIds.indexOf(record._id);
      if (recordIndex > -1) {
        this.selectionData.splice(recordIndex, 1);
        this.selectedIds.splice(recordIdIndex, 1);
      } else {
        this.selectedIds.push(record._id);
        this.selectionData.push(record);
      }
    } else {
      this.eraseSelection();
      this.selectionData.push(record);
      this.selectedIds.push(record._id);
    }
  }

  changeSelectionAll() {
    if (this.lazy) {
      if (this.selectionData.length < this.resultsLength) {
        this.eraseSelection();
        return this.genericService.filterGeneric(this.model,
          this.resource,
          this.sort.active,
          this.sort.direction,
          1,
          +this.resultsLength).subscribe(
          results => {
            this.selectionData.push(...results.docs);
            this.selectedIds.push(...results.docs.map(doc => doc._id));
          }
          );
      } else {
        this.eraseSelection();
      }
    } else {
      if (this.selectionData.length < this.database.data.length) {
        this.selectionData.push(...this.database.data);
        this.selectedIds.push(...this.database.data.map(doc => doc._id));
      } else {
        this.eraseSelection();
      }
    }
  }

  eraseSelection() {
    this.selectionData.length = 0;
    this.selectedIds.length = 0;
  }

  doFilter() {
    this.paginator.pageIndex = 0;
    this.paginator.page.emit();
  }

  clearFilter() {
    if (this.lazy) {
      this.model = {};
      this.doFilter();
      this.sort.sort({ id: 'id', start: 'asc', disableClear: false });
    } else {
      this.filter.nativeElement.value = '';
      this.applyFilter('');
    }
  }

  goEdit(row) {
    if (this.customEdit) {
      this.editRecord.emit(row);
    } else {
      const path = this.activatedRoute.root.firstChild.snapshot.url[0].path;
      this.router.navigate([path + '/editar/', row._id]);
    }
  }

  goView(row) {
    const path = this.activatedRoute.root.firstChild.snapshot.url[0].path;
    this.router.navigate([path + '/visualizar/', row._id]);
  }

  goCreate() {
    const path = this.activatedRoute.root.firstChild.snapshot.url[0].path;
    this.router.navigate([path + '/cadastrar']);
  }

  confirmDelete(row) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Deseja realmente excluir o registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecord.emit([row, this.paginator]);
      }
    });
  }

}
