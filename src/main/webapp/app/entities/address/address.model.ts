import { ICustomer } from 'app/entities/customer/customer.model';

export interface IAddress {
  id: number;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  postcode?: string | null;
  country?: string | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewAddress = Omit<IAddress, 'id'> & { id: null };
