import { TestBed } from '@angular/core/testing';

import { ServicioestudianteService } from './servicioestudiante.service';

describe('ServicioestudianteService', () => {
  let service: ServicioestudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioestudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
