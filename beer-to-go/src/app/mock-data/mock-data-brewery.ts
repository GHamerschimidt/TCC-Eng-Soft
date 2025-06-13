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
    imgPath: 'assets/imgs/breweries/logo_cervejaria1.png',
    beerCatalog: getBeerListOne(1001),
  },
  {
    id: 1002,
    name: 'Bebidas Tradição',
    description:
      'Produz cervejas do estilo Pilsen e Weiss, seguindo receitas tradicionais alemãs.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria2.png',
    beerCatalog: getBeerListTwo(1002),
  },
  {
    id: 1003,
    name: 'Cervejaria Artesanal Nova Era',
    description:
      'Focada em cervejas escuras como Stout e Porter, além de cervejas especiais com café e chocolate.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria3.png',
    beerCatalog: getBeerListThree(1003),
  },
  {
    id: 1004,
    name: 'Cervejaria Raízes do Brasil',
    description:
      'Cervejaria artesanal que celebra os sabores e ingredientes típicos de cada região do Brasil.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria4.png',
    beerCatalog: getBeerListFour(1004),
  },
  {
    id: 1005,
    name: 'Cervejaria Pantanal',
    description:
      'Produção artesanal com ingredientes do Pantanal, unindo tradição europeia com sabores regionais.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria5.png',
    beerCatalog: getBeerListFive(1005),
  },
  {
    id: 1006,
    name: 'Cervejaria Mata Atlântica',
    description:
      'Cervejaria sustentável que utiliza ingredientes da Mata Atlântica e práticas eco-friendly.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria6.png',
    beerCatalog: getBeerListSix(1006),
  },
  {
    id: 1007,
    name: 'Cervejaria Serra da Mantiqueira',
    description:
      'Especializada em cervejas de altitude, produzidas com água mineral da Serra da Mantiqueira.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria7.png',
    beerCatalog: getBeerListSeven(1007),
  },
  {
    id: 1008,
    name: 'Cervejaria Vale do Paraíba',
    description:
      'Cervejaria familiar que mantém tradições centenárias com toques de modernidade.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria8.png',
    beerCatalog: getBeerListEight(1008),
  },
  {
    id: 1009,
    name: 'Cervejaria Amazônia',
    description:
      'Produz cervejas únicas com ingredientes amazônicos, respeitando a cultura local.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria9.png',
    beerCatalog: getBeerListNine(1009),
  },
  {
    id: 1010,
    name: 'Cervejaria Águas Claras',
    description:
      'Cervejaria que utiliza águas minerais especiais de diferentes regiões do Brasil.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria10.png',
    beerCatalog: getBeerListTen(1010),
  },
  {
    id: 1011,
    name: 'Cervejaria Missões',
    description:
      'Cervejaria histórica que preserva as tradições das antigas missões do sul do Brasil.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria11.png',
    beerCatalog: getBeerListEleven(1011),
  },
  {
    id: 1012,
    name: 'Cervejaria Caminhos do Mar',
    description:
      'Cervejaria litorânea especializada em harmonização com frutos do mar.',
    imgPath: 'assets/imgs/breweries/logo_cervejaria12.png',
    beerCatalog: getBeerListTwelve(1012),
  },
];
