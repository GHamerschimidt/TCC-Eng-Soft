import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Brewery } from '../../interfaces/brewery.interface';
import { BreweryService } from '../../services/brewery/brewery.service';
import { EMPTY, Observable, catchError, map, pipe, switchMap } from 'rxjs';
import { NotFoundError } from '../../errors/not-found.error';

@Component({
  selector: 'app-brewery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brewery.component.html',
  styleUrl: './brewery.component.scss',
})
export class BreweryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private breweryService = inject(BreweryService);

  brewery$!: Observable<Brewery>;

  ngOnInit(): void {
    this.brewery$ = this.route.paramMap.pipe(this.getBreweryFromRoute());
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
    return this.breweryService.getBreweryById(id);
  }

  private validateBreweryExists(brewery: Brewery | undefined): Brewery {
    if (!brewery) {
      throw new NotFoundError('Cervejaria');
    }
    return brewery;
  }

  private handleBreweryError(error: unknown): Observable<never> {
    if (error instanceof NotFoundError) {
      console.log('Redirecionando para a página inicial:', error.message);
      this.router.navigate(['/home']);
      return EMPTY;
    }
    throw error;
  }
}
