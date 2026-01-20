import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Excercise13 } from './excercise13';

describe('Excercise13', () => {
  let component: Excercise13;
  let fixture: ComponentFixture<Excercise13>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Excercise13]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Excercise13);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
