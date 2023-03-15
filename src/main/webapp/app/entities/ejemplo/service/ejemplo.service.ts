import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEjemplo, NewEjemplo } from '../ejemplo.model';

export type PartialUpdateEjemplo = Partial<IEjemplo> & Pick<IEjemplo, 'id'>;

type RestOf<T extends IEjemplo | NewEjemplo> = Omit<T, 'campo4'> & {
  campo4?: string | null;
};

export type RestEjemplo = RestOf<IEjemplo>;

export type NewRestEjemplo = RestOf<NewEjemplo>;

export type PartialUpdateRestEjemplo = RestOf<PartialUpdateEjemplo>;

export type EntityResponseType = HttpResponse<IEjemplo>;
export type EntityArrayResponseType = HttpResponse<IEjemplo[]>;

@Injectable({ providedIn: 'root' })
export class EjemploService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ejemplos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ejemplo: NewEjemplo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ejemplo);
    return this.http
      .post<RestEjemplo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(ejemplo: IEjemplo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ejemplo);
    return this.http
      .put<RestEjemplo>(`${this.resourceUrl}/${this.getEjemploIdentifier(ejemplo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(ejemplo: PartialUpdateEjemplo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ejemplo);
    return this.http
      .patch<RestEjemplo>(`${this.resourceUrl}/${this.getEjemploIdentifier(ejemplo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEjemplo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEjemplo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEjemploIdentifier(ejemplo: Pick<IEjemplo, 'id'>): number {
    return ejemplo.id;
  }

  compareEjemplo(o1: Pick<IEjemplo, 'id'> | null, o2: Pick<IEjemplo, 'id'> | null): boolean {
    return o1 && o2 ? this.getEjemploIdentifier(o1) === this.getEjemploIdentifier(o2) : o1 === o2;
  }

  addEjemploToCollectionIfMissing<Type extends Pick<IEjemplo, 'id'>>(
    ejemploCollection: Type[],
    ...ejemplosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ejemplos: Type[] = ejemplosToCheck.filter(isPresent);
    if (ejemplos.length > 0) {
      const ejemploCollectionIdentifiers = ejemploCollection.map(ejemploItem => this.getEjemploIdentifier(ejemploItem)!);
      const ejemplosToAdd = ejemplos.filter(ejemploItem => {
        const ejemploIdentifier = this.getEjemploIdentifier(ejemploItem);
        if (ejemploCollectionIdentifiers.includes(ejemploIdentifier)) {
          return false;
        }
        ejemploCollectionIdentifiers.push(ejemploIdentifier);
        return true;
      });
      return [...ejemplosToAdd, ...ejemploCollection];
    }
    return ejemploCollection;
  }

  protected convertDateFromClient<T extends IEjemplo | NewEjemplo | PartialUpdateEjemplo>(ejemplo: T): RestOf<T> {
    return {
      ...ejemplo,
      campo4: ejemplo.campo4?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restEjemplo: RestEjemplo): IEjemplo {
    return {
      ...restEjemplo,
      campo4: restEjemplo.campo4 ? dayjs(restEjemplo.campo4) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEjemplo>): HttpResponse<IEjemplo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEjemplo[]>): HttpResponse<IEjemplo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
