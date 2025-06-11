import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BreweryService } from '../../services/brewery/brewery.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CarouselModule } from 'primeng/carousel';
import { Brewery } from '../../interfaces/brewery.interface';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let breweryService: jasmine.SpyObj<BreweryService>;
  let router: Router;

  const mockBreweries: Brewery[] = [
    {
      id: 1,
      name: 'Brewery 1',
      description: 'desc1',
      imgPath: '123',
      beerCatalog: [],
    },
    {
      id: 2,
      name: 'Brewery 2',
      description: 'desc2',
      imgPath: '321',
      beerCatalog: [],
    },
  ];

  beforeEach(async () => {
    const breweryServiceSpy = jasmine.createSpyObj('BreweryService', [
      'getAllBreweries',
    ]);
    breweryServiceSpy.getAllBreweries.and.returnValue(of(mockBreweries));

    await TestBed.configureTestingModule({
      imports: [HomepageComponent, CarouselModule],
      providers: [{ provide: BreweryService, useValue: breweryServiceSpy }],
    }).compileComponents();

    breweryService = TestBed.inject(
      BreweryService
    ) as jasmine.SpyObj<BreweryService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should load breweries on init', () => {
      expect(breweryService.getAllBreweries$).toHaveBeenCalled();
      component.highlightedBreweries$.subscribe((breweries) => {
        expect(breweries).toEqual(mockBreweries);
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate to brewery details when navigateToBrewery is called', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const breweryId = 1;

      component.navigateToBrewery(breweryId);

      expect(navigateSpy).toHaveBeenCalledWith(['/brewery', breweryId]);
    });
  });

  describe('Error handling', () => {
    it('should handle empty brewery list', () => {
      breweryService.getAllBreweries$.and.returnValue(of([]));
      fixture = TestBed.createComponent(HomepageComponent);
      component = fixture.componentInstance;

      component.highlightedBreweries$.subscribe((breweries) => {
        expect(breweries).toEqual([]);
      });
    });
  });
});
