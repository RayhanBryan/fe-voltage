import { TestBed } from '@angular/core/testing';

import { DataGeneratorServiceService } from './data-generator.service';

describe('DataGeneratorServiceService', () => {
  let service: DataGeneratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGeneratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
