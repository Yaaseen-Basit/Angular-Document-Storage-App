import { TestBed } from '@angular/core/testing';

import { DocumentuploadSService } from './documentupload-s.service';

describe('DocumentuploadSService', () => {
  let service: DocumentuploadSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentuploadSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
