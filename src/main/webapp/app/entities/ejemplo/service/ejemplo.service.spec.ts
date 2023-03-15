import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IEjemplo } from '../ejemplo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ejemplo.test-samples';

import { EjemploService, RestEjemplo } from './ejemplo.service';

const requireRestSample: RestEjemplo = {
  ...sampleWithRequiredData,
  campo4: sampleWithRequiredData.campo4?.format(DATE_FORMAT),
};

describe('Ejemplo Service', () => {
  let service: EjemploService;
  let httpMock: HttpTestingController;
  let expectedResult: IEjemplo | IEjemplo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EjemploService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Ejemplo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ejemplo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ejemplo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ejemplo', () => {
      const ejemplo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ejemplo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ejemplo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ejemplo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ejemplo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEjemploToCollectionIfMissing', () => {
      it('should add a Ejemplo to an empty array', () => {
        const ejemplo: IEjemplo = sampleWithRequiredData;
        expectedResult = service.addEjemploToCollectionIfMissing([], ejemplo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ejemplo);
      });

      it('should not add a Ejemplo to an array that contains it', () => {
        const ejemplo: IEjemplo = sampleWithRequiredData;
        const ejemploCollection: IEjemplo[] = [
          {
            ...ejemplo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEjemploToCollectionIfMissing(ejemploCollection, ejemplo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ejemplo to an array that doesn't contain it", () => {
        const ejemplo: IEjemplo = sampleWithRequiredData;
        const ejemploCollection: IEjemplo[] = [sampleWithPartialData];
        expectedResult = service.addEjemploToCollectionIfMissing(ejemploCollection, ejemplo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ejemplo);
      });

      it('should add only unique Ejemplo to an array', () => {
        const ejemploArray: IEjemplo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ejemploCollection: IEjemplo[] = [sampleWithRequiredData];
        expectedResult = service.addEjemploToCollectionIfMissing(ejemploCollection, ...ejemploArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ejemplo: IEjemplo = sampleWithRequiredData;
        const ejemplo2: IEjemplo = sampleWithPartialData;
        expectedResult = service.addEjemploToCollectionIfMissing([], ejemplo, ejemplo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ejemplo);
        expect(expectedResult).toContain(ejemplo2);
      });

      it('should accept null and undefined values', () => {
        const ejemplo: IEjemplo = sampleWithRequiredData;
        expectedResult = service.addEjemploToCollectionIfMissing([], null, ejemplo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ejemplo);
      });

      it('should return initial array if no Ejemplo is added', () => {
        const ejemploCollection: IEjemplo[] = [sampleWithRequiredData];
        expectedResult = service.addEjemploToCollectionIfMissing(ejemploCollection, undefined, null);
        expect(expectedResult).toEqual(ejemploCollection);
      });
    });

    describe('compareEjemplo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEjemplo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEjemplo(entity1, entity2);
        const compareResult2 = service.compareEjemplo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEjemplo(entity1, entity2);
        const compareResult2 = service.compareEjemplo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEjemplo(entity1, entity2);
        const compareResult2 = service.compareEjemplo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
