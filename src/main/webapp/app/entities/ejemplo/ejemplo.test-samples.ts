import dayjs from 'dayjs/esm';

import { Genero } from 'app/entities/enumerations/genero.model';

import { IEjemplo, NewEjemplo } from './ejemplo.model';

export const sampleWithRequiredData: IEjemplo = {
  id: 21993,
  campo1: 'COM Interacciones',
  campo3: true,
};

export const sampleWithPartialData: IEjemplo = {
  id: 20177,
  campo1: 'Guapo Noruega',
  campo3: false,
  campo5: Genero['FEMENINO'],
};

export const sampleWithFullData: IEjemplo = {
  id: 30821,
  campo1: 'GráficaX',
  capo2: 12279,
  campo3: true,
  campo4: dayjs('2023-03-10'),
  campo5: Genero['FEMENINO'],
};

export const sampleWithNewData: NewEjemplo = {
  campo1: 'Mascotas Algodón Usabilidad',
  campo3: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
