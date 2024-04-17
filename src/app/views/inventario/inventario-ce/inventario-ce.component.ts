import { Component, OnInit } from '@angular/core';
import { CardModule } from '@coreui/angular';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsteriskFormDirective } from '../../../@core/directives/asterisk-form/asterisk-form.directive'
import { InventarioService } from 'src/app/views/inventario/service/inventario.service';
import { HttpClientModule } from '@angular/common/http';
import { Produto } from 'src/app/@core/models/produto.model';

@Component({
  selector: 'app-inventario-ce',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, MatButtonModule, AsteriskFormDirective, HttpClientModule],
  templateUrl: './inventario-ce.component.html',
  styleUrl: './inventario-ce.component.scss'
})
export class InventarioCeComponent {
  form: FormGroup = new FormGroup({});
  submitted = false;
  edit: boolean = false;
  view: boolean = false;
  idProduct: any;

  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
  ) {

  }

  ngOnInit(): void {
    this.setProdutoForm();

    if (window.location.href.indexOf("editar") > -1) {
      this.edit = true;
      this.route.params.subscribe((data) => {
        if (data['id']) this.idProduct = data['id'];
        this.getProduct(this.idProduct)
      });
    } else if (window.location.href.indexOf("visualizar") > -1) {
      this.view = true;
      this.route.params.subscribe((data) => {
        if (data['id']) this.idProduct = data['id'];
        this.getProduct(this.idProduct)
      });
    }
  }

  setProdutoForm(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        reference: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern("^[0-9]*$"),
            Validators.min(0)
          ]
        ],
        qtd: [
          '',
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.min(0)
          ]
        ],
        price: [
          '',
          [
            Validators.required,
            Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"),
            Validators.min(0)
          ]
        ],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  validateFormOnRealTime(): void {
    this.submitted = true
    if (this.form.invalid) {
      return;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.createProduct();
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  getProduct(id: number): void {
    this.inventarioService.get(id)
      .subscribe({
        next: (data) => {
          this.form.controls['name'].setValue(data.nome);
          this.form.controls['reference'].setValue(data.referencia);
          this.form.controls['price'].setValue(data.preco);
          this.form.controls['qtd'].setValue(data.quantidade);
        },
        error: (e) => console.error(e)
      });
  }

  createProduct(): void {
    let formValues = this.form.getRawValue();
    let criteria: Produto = {
      id: 0,
      nome: formValues.name,
      referencia: formValues.reference,
      preco: formValues.price,
      quantidade: formValues.qtd,
    }

    this.inventarioService.create( criteria)
      .subscribe({
        next: (res) => {
          this.goBack();
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    let formValues = this.form.getRawValue();
    let criteria: Produto = {
      id: this.idProduct,
      nome: formValues.name,
      referencia: formValues.reference,
      preco: formValues.price,
      quantidade: formValues.qtd,
    }

    this.inventarioService.update(this.idProduct, criteria)
      .subscribe({
        next: (res) => {
          this.goBack();
        },
        error: (e) => console.error(e)
      });
  }

  goBack(): void {
    this.router.navigate([
      'inventario',
      'gerenciar-inventario-loja',
    ]);
  }
}
