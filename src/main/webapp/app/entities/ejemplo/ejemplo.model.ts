import dayjs from 'dayjs/esm';
import { Genero } from 'app/entities/enumerations/genero.model';

export interface IEjemplo {
  id: number;
  campo1?: string | null;
  capo2?: number | null;
  campo3?: boolean | null;
  campo4?: dayjs.Dayjs | null;
  campo5?: Genero | null;
}

export type NewEjemplo = Omit<IEjemplo, 'id'> & { id: null };
