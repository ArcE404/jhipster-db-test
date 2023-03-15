import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EjemploComponent } from '../list/ejemplo.component';
import { EjemploDetailComponent } from '../detail/ejemplo-detail.component';
import { EjemploUpdateComponent } from '../update/ejemplo-update.component';
import { EjemploRoutingResolveService } from './ejemplo-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ejemploRoute: Routes = [
  {
    path: '',
    component: EjemploComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EjemploDetailComponent,
    resolve: {
      ejemplo: EjemploRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EjemploUpdateComponent,
    resolve: {
      ejemplo: EjemploRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EjemploUpdateComponent,
    resolve: {
      ejemplo: EjemploRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ejemploRoute)],
  exports: [RouterModule],
})
export class EjemploRoutingModule {}
