import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlPtbr extends MatPaginatorIntl {

  itemsPerPageLabel = 'Registros por página';
  nextPageLabel = 'próxima página';
  previousPageLabel = 'página anterior';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' à ' + endIndex + ' de ' + length;
  };

}