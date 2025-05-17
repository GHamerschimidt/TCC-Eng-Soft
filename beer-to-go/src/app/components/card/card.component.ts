import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() name: string = 'name';
  @Input() imgPath: string = 'https://picsum.photos/seed/picsum111/300/200';
  @Input() description: string = 'description';
  @Input() details: string = 'details';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
}
