import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EjemploDetailComponent } from './ejemplo-detail.component';

describe('Ejemplo Management Detail Component', () => {
  let comp: EjemploDetailComponent;
  let fixture: ComponentFixture<EjemploDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjemploDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ejemplo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EjemploDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EjemploDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ejemplo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ejemplo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
