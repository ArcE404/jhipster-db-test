import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EjemploFormService } from './ejemplo-form.service';
import { EjemploService } from '../service/ejemplo.service';
import { IEjemplo } from '../ejemplo.model';

import { EjemploUpdateComponent } from './ejemplo-update.component';

describe('Ejemplo Management Update Component', () => {
  let comp: EjemploUpdateComponent;
  let fixture: ComponentFixture<EjemploUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ejemploFormService: EjemploFormService;
  let ejemploService: EjemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EjemploUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EjemploUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EjemploUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ejemploFormService = TestBed.inject(EjemploFormService);
    ejemploService = TestBed.inject(EjemploService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ejemplo: IEjemplo = { id: 456 };

      activatedRoute.data = of({ ejemplo });
      comp.ngOnInit();

      expect(comp.ejemplo).toEqual(ejemplo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEjemplo>>();
      const ejemplo = { id: 123 };
      jest.spyOn(ejemploFormService, 'getEjemplo').mockReturnValue(ejemplo);
      jest.spyOn(ejemploService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ejemplo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ejemplo }));
      saveSubject.complete();

      // THEN
      expect(ejemploFormService.getEjemplo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ejemploService.update).toHaveBeenCalledWith(expect.objectContaining(ejemplo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEjemplo>>();
      const ejemplo = { id: 123 };
      jest.spyOn(ejemploFormService, 'getEjemplo').mockReturnValue({ id: null });
      jest.spyOn(ejemploService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ejemplo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ejemplo }));
      saveSubject.complete();

      // THEN
      expect(ejemploFormService.getEjemplo).toHaveBeenCalled();
      expect(ejemploService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEjemplo>>();
      const ejemplo = { id: 123 };
      jest.spyOn(ejemploService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ejemplo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ejemploService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
