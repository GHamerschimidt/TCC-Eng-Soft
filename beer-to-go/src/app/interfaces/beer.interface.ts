import { BeerTypes } from '../enum/beer-types.enum';

export interface Beer {
  id: number;
  breweryId: number;
  name: string;
  type: BeerTypes;
  description: string;
  ibu: number;
  abv: number;
  price: number;
  quantity: number;
  imgPath: string;
}

export interface BeerTypeGroup {
  type: BeerTypes;
  beers: Beer[];
}
