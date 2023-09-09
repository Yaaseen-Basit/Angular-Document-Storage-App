import { TestBed } from '@angular/core/testing';

import { DocumentserviceService } from './documentservice.service';

describe('DocumentserviceService', () => {
  let service: DocumentserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
