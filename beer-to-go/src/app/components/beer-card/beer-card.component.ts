import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Beer } from '../../interfaces/beer.interface';
import { CardVariant } from '../card/type/card.variant';
import { BreweryService } from '../../services/brewery/brewery.service';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent {
  private readonly breweryService = inject(BreweryService);

  @Input({ required: true }) beer!: Beer;
  @Input() variant: CardVariant = CardVariant.CardButton;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  brewery = computed(() =>
    this.breweryService.getBreweryById(this.beer.breweryId)
  );
}
