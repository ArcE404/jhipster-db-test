import dayjs from 'dayjs/esm';

import { CategoryStatus } from 'app/entities/enumerations/category-status.model';
import { Genero } from 'app/entities/enumerations/genero.model';

import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 2529,
  description: 'Namibia Salchichas',
};

export const sampleWithPartialData: ICategory = {
  id: 35403,
  description: 'MoradoXX',
  sortOrder: 97365,
  dateModified: dayjs('2023-03-10'),
  status: CategoryStatus['RESTRICTED'],
  genero: Genero['FEMENINO'],
};

export const sampleWithFullData: ICategory = {
  id: 79578,
  description: 'NormasXX',
  sortOrder: 32315,
  dateAdded: dayjs('2023-03-10'),
  dateModified: dayjs('2023-03-10'),
  status: CategoryStatus['RESTRICTED'],
  genero: Genero['FEMENINO'],
};

export const sampleWithNewData: NewCategory = {
  description: 'busXXXXX',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
