import { Beer } from './beer.interface';

export interface Brewery {
  id: number;
  name: string;
  description: string;
  imgPath: string;
  beerCatalog: Beer[];
}
