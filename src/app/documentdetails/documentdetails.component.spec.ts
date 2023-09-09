import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdetailsComponent } from './documentdetails.component';

describe('DocumentdetailsComponent', () => {
  let component: DocumentdetailsComponent;
  let fixture: ComponentFixture<DocumentdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentdetailsComponent]
    });
    fixture = TestBed.createComponent(DocumentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
