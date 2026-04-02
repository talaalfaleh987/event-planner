import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCharts } from './pie-chart';

describe('PieCharts', () => {
  let component: PieCharts;
  let fixture: ComponentFixture<PieCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieCharts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieCharts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
