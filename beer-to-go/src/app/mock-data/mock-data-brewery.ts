import { Brewery } from '../interfaces/brewery.interface';
import {
  BEER_LIST_ONE,
  BEER_LIST_THREE,
  BEER_LIST_TWO,
} from './mock-data-beer';

export const BREWERIES: Brewery[] = [
  {
    id: 1001,
    name: 'Cervejaria do Barril',
    description:
      'Especializada em cervejas artesanais do tipo IPA e Pale Ale, com um toque brasileiro único.',
    imgPath: 'https://picsum.photos/seed/picsum/300/200',
    beerCatalog: BEER_LIST_ONE,
  },
  {
    id: 1002,
    name: 'Bebidas Tradição',
    description:
      'Produz cervejas do estilo Pilsen e Weiss, seguindo receitas tradicionais alemãs.',
    imgPath: 'https://picsum.photos/seed/picsum2/300/200',
    beerCatalog: BEER_LIST_TWO,
  },
  {
    id: 1003,
    name: 'Cervejaria Artesanal Nova Era',
    description:
      'Focada em cervejas escuras como Stout e Porter, além de cervejas especiais com café e chocolate.',
    imgPath: 'https://picsum.photos/seed/picsum3/300/200',
    beerCatalog: BEER_LIST_THREE,
  },
];
