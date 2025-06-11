import {
  Component,
  signal,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TreeSelectModule } from 'primeng/treeselect';
import { BeerTypes } from '../../enum/beer-types.enum';
import { TreeNode } from 'primeng/api';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';
import {
  SearchEvent,
  SearchEventType,
} from '../../interfaces/search-event.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [InputTextModule, ButtonModule, TreeSelectModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);

  @Output() search = new EventEmitter<SearchEvent>();

  private readonly destroy$ = new Subject<void>();
  private readonly searchInput$ = new Subject<string>();

  searchTerm = signal('');

  breweryFilterNode: TreeNode = {
    key: 'breweries',
    label: 'Cervejarias',
    data: 'breweries',
    selectable: true,
  };

  beerFilterNode: TreeNode = {
    key: 'beers',
    label: 'Cervejas',
    data: 'beers',
    selectable: true,
    children: Object.values(BeerTypes).map((type) => ({
      key: type,
      label: type,
      data: type,
      selectable: true,
    })),
  };

  filterNodes: TreeNode[] = [this.breweryFilterNode, this.beerFilterNode];
  selectedFilter = signal<TreeNode>(this.breweryFilterNode);

  ngOnInit(): void {
    this.setupDebounceSearch();
    this.clearFiltersOnRoutingHome();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange(value: string): void {
    this.searchInput$.next(value);
  }

  onFilterChange(node: TreeNode | null): void {
    if (node) {
      this.selectedFilter.set(node);
    } else {
      this.selectedFilter.set(this.breweryFilterNode);
    }
    this.emitSearch();
  }

  private clearFiltersOnRoutingHome(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        console.log(event.url);
        if (event.url === '/' || event.url === '/home') {
          this.searchTerm.set('');
          this.selectedFilter.set(this.breweryFilterNode);
        }
      });
  }

  private setupDebounceSearch(): void {
    this.searchInput$
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchTerm.set(value);
        this.emitSearch();
      });
  }

  private emitSearch(): void {
    const currentFilter = this.selectedFilter();
    const type = currentFilter.data as SearchEventType;
    this.search.emit({
      type,
      term: this.searchTerm(),
    });
  }
}
