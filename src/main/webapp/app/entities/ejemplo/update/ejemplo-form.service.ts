import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEjemplo, NewEjemplo } from '../ejemplo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEjemplo for edit and NewEjemploFormGroupInput for create.
 */
type EjemploFormGroupInput = IEjemplo | PartialWithRequiredKeyOf<NewEjemplo>;

type EjemploFormDefaults = Pick<NewEjemplo, 'id' | 'campo3'>;

type EjemploFormGroupContent = {
  id: FormControl<IEjemplo['id'] | NewEjemplo['id']>;
  campo1: FormControl<IEjemplo['campo1']>;
  capo2: FormControl<IEjemplo['capo2']>;
  campo3: FormControl<IEjemplo['campo3']>;
  campo4: FormControl<IEjemplo['campo4']>;
  campo5: FormControl<IEjemplo['campo5']>;
};

export type EjemploFormGroup = FormGroup<EjemploFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EjemploFormService {
  createEjemploFormGroup(ejemplo: EjemploFormGroupInput = { id: null }): EjemploFormGroup {
    const ejemploRawValue = {
      ...this.getFormDefaults(),
      ...ejemplo,
    };
    return new FormGroup<EjemploFormGroupContent>({
      id: new FormControl(
        { value: ejemploRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      campo1: new FormControl(ejemploRawValue.campo1, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100)],
      }),
      capo2: new FormControl(ejemploRawValue.capo2, {
        validators: [Validators.min(0)],
      }),
      campo3: new FormControl(ejemploRawValue.campo3, {
        validators: [Validators.required],
      }),
      campo4: new FormControl(ejemploRawValue.campo4),
      campo5: new FormControl(ejemploRawValue.campo5),
    });
  }

  getEjemplo(form: EjemploFormGroup): IEjemplo | NewEjemplo {
    return form.getRawValue() as IEjemplo | NewEjemplo;
  }

  resetForm(form: EjemploFormGroup, ejemplo: EjemploFormGroupInput): void {
    const ejemploRawValue = { ...this.getFormDefaults(), ...ejemplo };
    form.reset(
      {
        ...ejemploRawValue,
        id: { value: ejemploRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EjemploFormDefaults {
    return {
      id: null,
      campo3: false,
    };
  }
}
