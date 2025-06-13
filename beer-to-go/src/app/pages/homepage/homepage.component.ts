import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { Brewery } from '../../interfaces/brewery.interface';
import { BreweryService } from '../../services/brewery/brewery.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CardComponent } from '../../components/card/card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CardVariant } from '../../components/card/type/card.variant';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    CardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private breweryService = inject(BreweryService);

  private searchTermSubject = new BehaviorSubject<string>('');

  cardVariant = CardVariant.SimpleCardButton;
  hasSearch = signal(true);

  highlightedBreweries$: Observable<Brewery[]> =
    this.breweryService.getBreweries$(6, 12);

  regularBreweries$ = this.route.queryParams.pipe(
    map((params) => params['search'] || ''),
    switchMap((searchTerm) => {
      this.hasSearch.set(!searchTerm);
      return this.breweryService.getBreweries$(0, 12, searchTerm);
    })
  );

  ngOnInit(): void {
    const searchTerm = this.route.snapshot.queryParams['search'] || '';
    this.searchTermSubject.next(searchTerm);
  }

  navigateToBrewery(id: number): void {
    this.router.navigate(['/brewery', id]);
  }
}
