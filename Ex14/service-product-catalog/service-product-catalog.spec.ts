import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductCatalog } from './service-product-catalog';

describe('ServiceProductCatalog', () => {
  let component: ServiceProductCatalog;
  let fixture: ComponentFixture<ServiceProductCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProductCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProductCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
