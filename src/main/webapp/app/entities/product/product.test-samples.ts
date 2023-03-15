import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  title: 'plataforma',
  keywords: 'cross-platform Refinado deposit',
  description: 'función Mesa',
};

export const sampleWithPartialData: IProduct = {
  id: 66440,
  title: 'neural Hogar Mobilidad',
  keywords: 'Colonia',
  description: 'Rioja Plástico Increible',
  dateModified: dayjs('2023-03-10'),
  price: 90500,
};

export const sampleWithFullData: IProduct = {
  id: 19060,
  title: 'acompasada vertical política',
  keywords: 'neural intuitive SDR',
  description: 'Inteligente de Verde',
  rating: 44267,
  dateAdded: dayjs('2023-03-10'),
  dateModified: dayjs('2023-03-10'),
  price: 30260,
};

export const sampleWithNewData: NewProduct = {
  title: 'architectures enhance',
  keywords: 'bricks-and-clicks transmitter',
  description: 'out-of-the-box',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
