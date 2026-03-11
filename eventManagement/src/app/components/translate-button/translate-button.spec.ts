import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateButton } from './translate-button';

describe('TranslateButton', () => {
  let component: TranslateButton;
  let fixture: ComponentFixture<TranslateButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
