import { Component, Input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';

const SHAKE_ANIMATION_DURATION = 300;
const DEFAULT_MIN_VALUE = 0;

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() limit?: number;
  @Input() minValue: number = DEFAULT_MIN_VALUE;
  count = model<number>(DEFAULT_MIN_VALUE);
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
    }, SHAKE_ANIMATION_DURATION);
  }
}
