import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notificaciones.service';

describe('NotificacionesService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
