import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCeComponent } from './inventario-ce.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from '@coreui/angular';
import { AsteriskFormDirective } from 'src/app/@core/directives/asterisk-form/asterisk-form.directive';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InventarioCeComponent', () => {
  let component: InventarioCeComponent;
  let fixture: ComponentFixture<InventarioCeComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CardModule,
        MatButtonModule, BrowserAnimationsModule, NoopAnimationsModule , InventarioCeComponent],
        providers: [HttpClient, HttpHandler, FormBuilder, AsteriskFormDirective, {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioCeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should check initial form values for form', () => {
    const inventarioFormGroup = component.form;
    const inventarioFormValues = {
      name: '',
      reference: '',
      qtd: '',
      price: '',
    }
    expect(inventarioFormGroup.value).toEqual(inventarioFormValues);
  });

  it('should check if form is valid', () => {
    formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
        name: ['Vestido', Validators.required],
        reference: [
          1234,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern("^[0-9]*$"),
            Validators.min(0)
          ]
        ],
        qtd: [
          15,
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.min(0)
          ]
        ],
        price: [
          180,
          [
            Validators.required,
            Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"),
            Validators.min(0)
          ]
        ],
    });

    expect(component.form.valid).toBe(true);
    fixture.detectChanges();
  })

  it('should check if form is invalid', () => {
    formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
        name: [null, Validators.required],
        reference: [
          1234,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern("^[0-9]*$"),
            Validators.min(0)
          ]
        ],
        qtd: [
          15,
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.min(0)
          ]
        ],
        price: [
          180,
          [
            Validators.required,
            Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"),
            Validators.min(0)
          ]
        ],
    });

    expect(component.form.invalid).toBe(true);
    fixture.detectChanges();
  })

  it('should set submitted to true', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

});
