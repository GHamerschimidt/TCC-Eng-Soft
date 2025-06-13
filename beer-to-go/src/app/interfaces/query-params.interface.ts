import { BeerTypes } from '../enum/beer-types.enum';

export interface SearchParams {
  search?: string;
  type?: BeerTypes;
}
