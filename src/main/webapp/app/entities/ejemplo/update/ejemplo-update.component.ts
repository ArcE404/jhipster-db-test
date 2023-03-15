import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EjemploFormService, EjemploFormGroup } from './ejemplo-form.service';
import { IEjemplo } from '../ejemplo.model';
import { EjemploService } from '../service/ejemplo.service';
import { Genero } from 'app/entities/enumerations/genero.model';

@Component({
  selector: 'jhi-ejemplo-update',
  templateUrl: './ejemplo-update.component.html',
})
export class EjemploUpdateComponent implements OnInit {
  isSaving = false;
  ejemplo: IEjemplo | null = null;
  generoValues = Object.keys(Genero);

  editForm: EjemploFormGroup = this.ejemploFormService.createEjemploFormGroup();

  constructor(
    protected ejemploService: EjemploService,
    protected ejemploFormService: EjemploFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ejemplo }) => {
      this.ejemplo = ejemplo;
      if (ejemplo) {
        this.updateForm(ejemplo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ejemplo = this.ejemploFormService.getEjemplo(this.editForm);
    if (ejemplo.id !== null) {
      this.subscribeToSaveResponse(this.ejemploService.update(ejemplo));
    } else {
      this.subscribeToSaveResponse(this.ejemploService.create(ejemplo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEjemplo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ejemplo: IEjemplo): void {
    this.ejemplo = ejemplo;
    this.ejemploFormService.resetForm(this.editForm, ejemplo);
  }
}
