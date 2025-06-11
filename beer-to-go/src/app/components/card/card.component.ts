import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardVariant } from './type/card.variant';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() name: string = 'name';
  @Input() variant: CardVariant = CardVariant.CardButton;
  @Input() imgPath: string = 'https://picsum.photos/seed/picsum111/300/200';
  @Input() description: string = 'description';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  isCardButtonVariant(): boolean {
    return this.variant === CardVariant.CardButton;
  }
}
