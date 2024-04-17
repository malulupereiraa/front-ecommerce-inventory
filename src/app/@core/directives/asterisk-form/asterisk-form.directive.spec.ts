import { TestBed } from '@angular/core/testing';
import { AsteriskFormDirective } from './asterisk-form.directive';
import { ElementRef, inject, NO_ERRORS_SCHEMA } from '@angular/core';

let elementRef: ElementRef;

export class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
}

describe('AsteriskFormDirective', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useClass: MockElementRef }],
    });

  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext((): void => {
      const directive: AsteriskFormDirective = new AsteriskFormDirective();
      expect(directive).toBeTruthy();
    });
  });
});
