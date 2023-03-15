import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';
import { CategoryStatus } from 'app/entities/enumerations/category-status.model';
import { Genero } from 'app/entities/enumerations/genero.model';

export interface ICategory {
  id: number;
  description?: string | null;
  sortOrder?: number | null;
  dateAdded?: dayjs.Dayjs | null;
  dateModified?: dayjs.Dayjs | null;
  status?: CategoryStatus | null;
  genero?: Genero | null;
  parent?: Pick<ICategory, 'id' | 'description'> | null;
  products?: Pick<IProduct, 'id' | 'title'>[] | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
