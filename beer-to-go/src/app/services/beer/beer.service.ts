import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { Beer, BeerTypeGroup } from '../../interfaces/beer.interface';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  groupBeersByType$(beers: Beer[]): Observable<BeerTypeGroup[]> {
    return from(beers).pipe(
      groupBy((beer) => beer.type),
      mergeMap((group) =>
        group.pipe(
          toArray(),
          map(
            (beers) =>
              ({
                type: group.key,
                beers: beers,
              } as BeerTypeGroup)
          )
        )
      ),
      toArray()
    );
  }
}
