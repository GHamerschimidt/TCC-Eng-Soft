import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Beer } from '../../interfaces/beer.interface';
import { CardVariant } from '../card/type/card.variant';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent {
  @Input({ required: true }) beer!: Beer;
  @Input() variant: CardVariant = CardVariant.CardButton;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
}
