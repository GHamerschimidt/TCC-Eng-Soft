import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { Brewery } from '../../interfaces/brewery.interface';
import { BreweryService } from '../../services/brewery/brewery.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  private router = inject(Router);
  private breweryService = inject(BreweryService);

  breweries$: Observable<Brewery[]> = this.breweryService.getAllBreweries$();

  navigateToBrewery(id: number): void {
    this.router.navigate(['/brewery', id]);
  }
}
