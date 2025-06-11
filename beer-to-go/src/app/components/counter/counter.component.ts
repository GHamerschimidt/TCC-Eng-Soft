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
  @Input() minValue: number = 0;
  count = model<number>(0);
  isShaking = false;

  increase(): void {
    const newValue = this.count() + 1;
    if (this.limit && newValue > this.limit) {
      this.shake();
      return;
    }
    this.count.set(newValue);
  }

  decrease(): void {
    const newValue = this.count() - 1;
    if (newValue < this.minValue) {
      this.shake();
      return;
    }
    this.count.set(newValue);
  }

  private shake(): void {
    if (this.isShaking) return;

    this.isShaking = true;
    setTimeout(() => {
      this.isShaking = false;
    }, 300);
  }
}
