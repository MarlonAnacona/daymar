import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistryComponent } from './modal-registry.component';

describe('ModalRegistryComponent', () => {
  let component: ModalRegistryComponent;
  let fixture: ComponentFixture<ModalRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
