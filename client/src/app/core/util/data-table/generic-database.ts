import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/** A generic database that the data source uses to retrieve data for the table. */
export class GenericDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _data: any[] = [];

  get data(): any[] { return this.dataChange.value; }
  set data(data: any[]) {
    const copiedData = this.data.slice();
    copiedData.push(...data);
    this.dataChange.next(copiedData);
  }

  constructor() {
  }

}
