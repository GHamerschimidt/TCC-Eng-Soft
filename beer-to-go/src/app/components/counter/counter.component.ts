import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() limit?: number;
  count = model<number>(0);

  increase(): void {
    this.updateCount(1);
  }

  decrease(): void {
    this.updateCount(-1);
  }

  private updateCount(amount: number): void {
    const newValue = this.count() + amount;

    if (newValue < 0) {
      this.count.set(0);
      return;
    }

    if (this.limit && newValue > this.limit) {
      return;
    }

    this.count.set(newValue);
  }
}
