import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEjemplo } from '../ejemplo.model';
import { EjemploService } from '../service/ejemplo.service';

@Injectable({ providedIn: 'root' })
export class EjemploRoutingResolveService implements Resolve<IEjemplo | null> {
  constructor(protected service: EjemploService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEjemplo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ejemplo: HttpResponse<IEjemplo>) => {
          if (ejemplo.body) {
            return of(ejemplo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
