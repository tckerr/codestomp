import { TestBed, inject } from '@angular/core/testing';

import { QuitterNotificationService } from './quitter-notification.service';

describe('QuitterNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuitterNotificationService]
    });
  });

  it('should ...', inject([QuitterNotificationService], (service: QuitterNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
