import { BeerTypes } from '../enum/beer-types.enum';

export type SearchEventType = 'breweries' | `beers` | BeerTypes;

export interface SearchEvent {
  type: SearchEventType;
  term: string;
}
