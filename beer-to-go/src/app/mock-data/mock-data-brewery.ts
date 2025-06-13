import { Brewery } from '../interfaces/brewery.interface';
import {
  getBeerListOne,
  getBeerListTwo,
  getBeerListThree,
  getBeerListFour,
  getBeerListFive,
  getBeerListSix,
  getBeerListSeven,
  getBeerListEight,
  getBeerListNine,
  getBeerListTen,
  getBeerListEleven,
  getBeerListTwelve,
} from './mock-data-beer';

export const BREWERIES: Brewery[] = [
  {
    id: 1001,
    name: 'Cervejaria do Barril',
    description:
      'Especializada em cervejas artesanais do tipo IPA e Pale Ale, com um toque brasileiro único.',
    imgPath: 'https://picsum.photos/seed/picsum/300/200',
    beerCatalog: getBeerListOne(1001),
  },
  {
    id: 1002,
    name: 'Bebidas Tradição',
    description:
      'Produz cervejas do estilo Pilsen e Weiss, seguindo receitas tradicionais alemãs.',
    imgPath: 'https://picsum.photos/seed/picsum2/300/200',
    beerCatalog: getBeerListTwo(1002),
  },
  {
    id: 1003,
    name: 'Cervejaria Artesanal Nova Era',
    description:
      'Focada em cervejas escuras como Stout e Porter, além de cervejas especiais com café e chocolate.',
    imgPath: 'https://picsum.photos/seed/picsum3/300/200',
    beerCatalog: getBeerListThree(1003),
  },
  {
    id: 1004,
    name: 'Cervejaria Raízes do Brasil',
    description:
      'Cervejaria artesanal que celebra os sabores e ingredientes típicos de cada região do Brasil.',
    imgPath: 'https://picsum.photos/seed/picsum4/300/200',
    beerCatalog: getBeerListFour(1004),
  },
  {
    id: 1005,
    name: 'Cervejaria Pantanal',
    description:
      'Produção artesanal com ingredientes do Pantanal, unindo tradição europeia com sabores regionais.',
    imgPath: 'https://picsum.photos/seed/picsum5/300/200',
    beerCatalog: getBeerListFive(1005),
  },
  {
    id: 1006,
    name: 'Cervejaria Mata Atlântica',
    description:
      'Cervejaria sustentável que utiliza ingredientes da Mata Atlântica e práticas eco-friendly.',
    imgPath: 'https://picsum.photos/seed/picsum6/300/200',
    beerCatalog: getBeerListSix(1006),
  },
  {
    id: 1007,
    name: 'Cervejaria Serra da Mantiqueira',
    description:
      'Especializada em cervejas de altitude, produzidas com água mineral da Serra da Mantiqueira.',
    imgPath: 'https://picsum.photos/seed/picsum7/300/200',
    beerCatalog: getBeerListSeven(1007),
  },
  {
    id: 1008,
    name: 'Cervejaria Vale do Paraíba',
    description:
      'Cervejaria familiar que mantém tradições centenárias com toques de modernidade.',
    imgPath: 'https://picsum.photos/seed/picsum8/300/200',
    beerCatalog: getBeerListEight(1008),
  },
  {
    id: 1009,
    name: 'Cervejaria Amazônia',
    description:
      'Produz cervejas únicas com ingredientes amazônicos, respeitando a cultura local.',
    imgPath: 'https://picsum.photos/seed/picsum9/300/200',
    beerCatalog: getBeerListNine(1009),
  },
  {
    id: 1010,
    name: 'Cervejaria Águas Claras',
    description:
      'Cervejaria que utiliza águas minerais especiais de diferentes regiões do Brasil.',
    imgPath: 'https://picsum.photos/seed/picsum10/300/200',
    beerCatalog: getBeerListTen(1010),
  },
  {
    id: 1011,
    name: 'Cervejaria Missões',
    description:
      'Cervejaria histórica que resgata receitas das antigas missões jesuítas com ingredientes contemporâneos.',
    imgPath: 'https://picsum.photos/seed/picsum11/300/200',
    beerCatalog: getBeerListEleven(1011),
  },
  {
    id: 1012,
    name: 'Cervejaria Chapada',
    description:
      'Produção artesanal que celebra as riquezas naturais das chapadas brasileiras.',
    imgPath: 'https://picsum.photos/seed/picsum12/300/200',
    beerCatalog: getBeerListTwelve(1012),
  },
];
