import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedBar } from './grouped-bar';

describe('GroupedBar', () => {
  let component: GroupedBar;
  let fixture: ComponentFixture<GroupedBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupedBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
