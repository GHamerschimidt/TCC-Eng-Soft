import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BreweryComponent } from './pages/brewery/brewery.component';
import { BeerListComponent } from './pages/beers/beer-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'brewery/:id',
    component: BreweryComponent,
  },
  {
    path: 'beers',
    component: BeerListComponent,
  },
];
