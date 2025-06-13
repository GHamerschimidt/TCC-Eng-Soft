import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Brewery } from '../../interfaces/brewery.interface';
import { BREWERIES } from '../../mock-data/mock-data-brewery';

@Injectable({
  providedIn: 'root',
})
export class BreweryService {
  getBreweryById(breweryId: number): Brewery | undefined {
    return BREWERIES.find((brewery) => brewery.id === breweryId);
  }

  getBreweries$(
    startIndex: number,
    endIndex: number,
    searchTerm?: string
  ): Observable<Brewery[]> {
    if (!searchTerm?.trim()) {
      return of(BREWERIES.slice(startIndex, endIndex));
    }

    const normalizedTerm = searchTerm.toLowerCase().trim();
    const filteredBreweries = BREWERIES.filter(
      (brewery) =>
        brewery.name.toLowerCase().includes(normalizedTerm) ||
        brewery.description.toLowerCase().includes(normalizedTerm)
    );

    return of(filteredBreweries.slice(startIndex, endIndex));
  }

  getBreweryById$(id: number): Observable<Brewery | undefined> {
    return of(BREWERIES.find((brewery) => brewery.id === id));
  }
}
