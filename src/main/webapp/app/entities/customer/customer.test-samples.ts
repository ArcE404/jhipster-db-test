import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 24379,
};

export const sampleWithPartialData: ICustomer = {
  id: 35573,
  lastName: 'Vélez',
  email: 'Natalia26@yahoo.com',
};

export const sampleWithFullData: ICustomer = {
  id: 80941,
  firstName: 'Leticia',
  lastName: 'Mejía',
  email: 'Dolores_Trevio@yahoo.com',
  telephone: '930 069 931',
};

export const sampleWithNewData: NewCustomer = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
