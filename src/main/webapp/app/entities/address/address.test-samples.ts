import { IAddress, NewAddress } from './address.model';

export const sampleWithRequiredData: IAddress = {
  id: 88754,
  postcode: 'Bulgarian ',
  country: 'Ti',
};

export const sampleWithPartialData: IAddress = {
  id: 83562,
  city: 'Vacaville',
  postcode: 'Extramuros',
  country: 'Se',
};

export const sampleWithFullData: IAddress = {
  id: 83280,
  address1: 'Cataluña Perseverando',
  address2: 'Asimilado',
  city: 'Saavedraberg',
  postcode: 'Coche',
  country: 'Gu',
};

export const sampleWithNewData: NewAddress = {
  postcode: 'Refinado H',
  country: 'An',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
