import { TestBed } from '@angular/core/testing';

import { InventarioService } from './inventario.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { take } from 'rxjs';

describe('InventarioService', () => {
  let service: InventarioService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, HttpTestingController, HttpClientTestingModule]
    });
    service = TestBed.inject(InventarioService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
