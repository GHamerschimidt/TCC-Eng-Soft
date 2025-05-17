import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Brewery } from '../../interfaces/brewery.interface';
import { BREWERIES } from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class BreweryService {
  constructor() {}

  getAllBreweries(): Observable<Brewery[]> {
    return of(BREWERIES);
  }

  getBreweryById(id: number): Observable<Brewery | undefined> {
    return of(BREWERIES.find((brewery) => brewery.id === id));
  }
}
