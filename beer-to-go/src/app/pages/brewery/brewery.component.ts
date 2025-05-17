import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, catchError, map, pipe, switchMap } from 'rxjs';
import { BeerCardComponent } from '../../components/beer-card/beer-card.component';
import { NotFoundError } from '../../errors/not-found.error';
import { BeerTypeGroup } from '../../interfaces/beer.interface';
import { Brewery } from '../../interfaces/brewery.interface';
import { BeerService } from '../../services/beer/beer.service';
import { BreweryService } from '../../services/brewery/brewery.service';

@Component({
  selector: 'app-brewery',
  standalone: true,
  imports: [CommonModule, BeerCardComponent],
  templateUrl: './brewery.component.html',
  styleUrl: './brewery.component.scss',
})
export class BreweryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private breweryService = inject(BreweryService);
  private beerService = inject(BeerService);

  brewery$!: Observable<Brewery>;
  groupedBeers$!: Observable<BeerTypeGroup[]>;

  ngOnInit(): void {
    this.brewery$ = this.route.paramMap.pipe(this.getBreweryFromRoute());
    this.groupedBeers$ = this.getGroupedBeersByType();
  }

  private getBreweryFromRoute() {
    return pipe(
      map(this.extractBreweryId),
      switchMap((id) => this.getBreweryById(id)),
      map(this.validateBreweryExists),
      catchError(this.handleBreweryError.bind(this))
    );
  }

  private extractBreweryId(params: ParamMap): number {
    const id = params.get('id');
    if (!id) {
      throw new NotFoundError('Cervejaria', 'com ID inválido');
    }
    return Number(id);
  }

  private getBreweryById(id: number): Observable<Brewery | undefined> {
    return this.breweryService.getBreweryById$(id);
  }

  private validateBreweryExists(brewery: Brewery | undefined): Brewery {
    if (!brewery) {
      throw new NotFoundError('Cervejaria');
    }
    return brewery;
  }

  private handleBreweryError(error: unknown): Observable<never> {
    if (error instanceof NotFoundError) {
      this.router.navigate(['/home']);
      return EMPTY;
    }
    throw error;
  }

  private getGroupedBeersByType(): Observable<BeerTypeGroup[]> {
    return this.brewery$.pipe(
      switchMap((brewery) =>
        this.beerService.groupBeersByType$(brewery.beerCatalog)
      )
    );
  }
}
