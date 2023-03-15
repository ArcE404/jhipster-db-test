import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EjemploComponent } from './list/ejemplo.component';
import { EjemploDetailComponent } from './detail/ejemplo-detail.component';
import { EjemploUpdateComponent } from './update/ejemplo-update.component';
import { EjemploDeleteDialogComponent } from './delete/ejemplo-delete-dialog.component';
import { EjemploRoutingModule } from './route/ejemplo-routing.module';

@NgModule({
  imports: [SharedModule, EjemploRoutingModule],
  declarations: [EjemploComponent, EjemploDetailComponent, EjemploUpdateComponent, EjemploDeleteDialogComponent],
})
export class EjemploModule {}
