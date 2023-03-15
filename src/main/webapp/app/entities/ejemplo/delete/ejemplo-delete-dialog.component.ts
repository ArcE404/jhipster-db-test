import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEjemplo } from '../ejemplo.model';
import { EjemploService } from '../service/ejemplo.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ejemplo-delete-dialog.component.html',
})
export class EjemploDeleteDialogComponent {
  ejemplo?: IEjemplo;

  constructor(protected ejemploService: EjemploService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ejemploService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
