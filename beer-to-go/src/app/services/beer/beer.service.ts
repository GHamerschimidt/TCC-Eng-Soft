import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { Beer, BeerTypeGroup } from '../../interfaces/beer.interface';
import { BREWERIES } from '../../mock-data/mock-data-brewery';
import { BeerTypes } from '../../enum/beer-types.enum';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  getBeers$(searchTerm?: string, beerType?: BeerTypes): Observable<Beer[]> {
    const allBeers = BREWERIES.flatMap((brewery) =>
      brewery.beerCatalog.map((beer) => ({
        ...beer,
        breweryId: brewery.id,
      }))
    );

    if (!searchTerm?.trim() && !beerType) {
      return of(allBeers);
    }

    const normalizedTerm = searchTerm?.toLowerCase().trim();
    const filteredBeers = allBeers.filter((beer) => {
      const matchesSearch =
        !normalizedTerm ||
        beer.name.toLowerCase().includes(normalizedTerm) ||
        beer.description.toLowerCase().includes(normalizedTerm);

      const matchesType = !beerType || beer.type === beerType;

      return matchesSearch && matchesType;
    });

    return of(filteredBeers);
  }

  groupBeersByType$(beers: Beer[]): Observable<BeerTypeGroup[]> {
    return from(beers).pipe(
      groupBy((beer) => beer.type),
      mergeMap((group) =>
        group.pipe(
          toArray(),
          map((beers) => ({
            type: group.key,
            beers: beers,
          }))
        )
      ),
      toArray()
    );
  }
}
