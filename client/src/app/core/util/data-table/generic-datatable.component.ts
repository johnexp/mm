import { ConfirmationDialogComponent } from './../dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { GenericDataSource } from './generic-datasource';
import { DataSource } from '@angular/cdk/collections';
import { GenericService } from './../../service/generic.service';
import { Pagination } from './../../domain/pagination';
import { GenericDatabase } from './generic-database';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSortable } from '@angular/material';
import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core'
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-generic-datatable',
  templateUrl: './generic-datatable.component.html',
  providers: [GenericService]
})
export class GenericDatatableComponent implements OnInit {

  @Input() columns: any[];
  @Input() selectable: Boolean;
  @Input() selectionData: any[];
  @Input() filterPlaceholder: String = 'filtrar';
  @Input() hasFilter: Boolean = true;
  @Input() database: GenericDatabase;
  @Input() actions: any[] = [];
  @Input() lazy: Boolean = false;
  @Output() deleteRecord: EventEmitter<any> = new EventEmitter<any>();
  // @Input() pagination: Pagination;
  @ViewChild('filter') filter: ElementRef;
  // TODO: fazer filtro de itens selecionados
  // @ViewChild('filterSelected') filterSelected: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  displayedColumns: any[] = [];
  dataSource: any;

  resultsLength: number = 0;
  isLoadingResults: Boolean = false;
  isRateLimitReached: Boolean = false;
  hasUpdate: Boolean = false;
  hasDelete: Boolean = false;
  model: any = {};

  constructor(private genericService: GenericService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.createColumns();
    if (this.lazy) {
      this.dataSource = new MatTableDataSource()
    } else {
      this.dataSource = new GenericDataSource(this.database, this.paginator);
    }
    if (this.hasFilter) {
      this.createFilterObservable();
    }
  }

  ngAfterViewInit() {
    this.database = new GenericDatabase;

    if (this.lazy) {
      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      Observable.merge(this.sort.sortChange, this.paginator.page)
        .startWith(null)
        .switchMap(() => {
          this.isLoadingResults = true;
          this.clearEmptyFilterValues();
          return this.genericService.filterGeneric(this.model, {
            resource: 'versoes',
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex + 1,
            limit: this.paginator.pageSize
          }).$observable;
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

  clearEmptyFilterValues() {
    const objKeys = Object.keys(this.model);
    for (var index = 0; index < objKeys.length; index++) {
      var key = objKeys[index];
      if (this.model[key] === '') {
        delete this.model[key];
      }
    }
  }

  /**
   * Create filter keyup event observable
   */
  createFilterObservable() {
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) { return; }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });
    // TODO: fazer filtro de itens selecionados
    // Observable.fromEvent(this.filterSelected.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) { return; }
    //     this.dataSource.filter = this.filterSelected.nativeElement.value;
    //   });
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
    this.columns.forEach(column => {
      this.displayedColumns.push(column.value);
    });
  }

  /**
   * Changes records selection
   *
   * @param recordId - selected record id
   */
  changeSelection(recordId) {
    const recordIndex = this.selectionData.indexOf(recordId);
    if (recordIndex > -1) {
      this.selectionData.splice(recordIndex, 1);
    } else {
      this.selectionData.push(recordId);
    }
  }

  doFilter() {
    this.paginator.pageIndex = 0;
    this.paginator.page.emit();
  }

  clearFilter() {
    this.model = {};
    this.doFilter();
    this.sort.sort({ id: 'id', start: 'asc', disableClear: false });
  }

  goEdit(id) {
    this.router.navigate([this.router.config[0].path + '/editar/', id]);
  }

  goCreate() {
    this.router.navigate([this.router.config[0].path + '/cadastrar']);
  }

  confirmDelete(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Deseja realmente excluir o registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecord.emit([id, this.paginator]);
      }
    });
  }

}
