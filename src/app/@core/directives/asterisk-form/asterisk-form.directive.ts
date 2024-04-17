import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[appAsteriskForm]',
  standalone: true
})

export class AsteriskFormDirective implements OnInit {
  @Input() formGroup: FormGroup | any;
  @Input() controlName: string | any;

  elementRef = inject(ElementRef)

  constructor() { }

  ngOnInit(): void {
    const isRequired = this.formGroup.controls[this.controlName]?.errors?.required;
    if (isRequired) {
      this.elementRef.nativeElement.innerHTML = '*';
    }else{
      this.elementRef.nativeElement.innerHTML = '';
    }
  }
}
