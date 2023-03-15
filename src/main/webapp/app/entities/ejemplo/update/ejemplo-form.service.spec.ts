import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ejemplo.test-samples';

import { EjemploFormService } from './ejemplo-form.service';

describe('Ejemplo Form Service', () => {
  let service: EjemploFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjemploFormService);
  });

  describe('Service methods', () => {
    describe('createEjemploFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEjemploFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campo1: expect.any(Object),
            capo2: expect.any(Object),
            campo3: expect.any(Object),
            campo4: expect.any(Object),
            campo5: expect.any(Object),
          })
        );
      });

      it('passing IEjemplo should create a new form with FormGroup', () => {
        const formGroup = service.createEjemploFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campo1: expect.any(Object),
            capo2: expect.any(Object),
            campo3: expect.any(Object),
            campo4: expect.any(Object),
            campo5: expect.any(Object),
          })
        );
      });
    });

    describe('getEjemplo', () => {
      it('should return NewEjemplo for default Ejemplo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEjemploFormGroup(sampleWithNewData);

        const ejemplo = service.getEjemplo(formGroup) as any;

        expect(ejemplo).toMatchObject(sampleWithNewData);
      });

      it('should return NewEjemplo for empty Ejemplo initial value', () => {
        const formGroup = service.createEjemploFormGroup();

        const ejemplo = service.getEjemplo(formGroup) as any;

        expect(ejemplo).toMatchObject({});
      });

      it('should return IEjemplo', () => {
        const formGroup = service.createEjemploFormGroup(sampleWithRequiredData);

        const ejemplo = service.getEjemplo(formGroup) as any;

        expect(ejemplo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEjemplo should not enable id FormControl', () => {
        const formGroup = service.createEjemploFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEjemplo should disable id FormControl', () => {
        const formGroup = service.createEjemploFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
