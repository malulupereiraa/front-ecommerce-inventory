import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CardModule, TooltipModule } from '@coreui/angular';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from '../service/inventario.service'
import { HttpClientModule } from '@angular/common/http';
import { Produto } from 'src/app/@core/models/produto.model';

@Component({
  selector: 'app-inventario-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule,
    MatDividerModule, MatIconModule, CardModule, TooltipModule, NgbDatepickerModule, HttpClientModule,
  MatProgressSpinnerModule],
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.scss'
})
export class InventarioListComponent {
  displayedColumns: string[] = ['actions', 'id', 'nome', 'quantidade', 'referencia', 'preco'];
  produtos: any[] = new Array<any>();
  dataSource: any = new MatTableDataSource<Produto>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  private modalService = inject(NgbModal);
  private router = inject(Router);
  private inventarioService = inject(InventarioService);
  closeResult = '';

  @ViewChild('content')
  private modalConfirmDelete: TemplateRef<any> | undefined | any;

  idToManipulate: any;
  pageSize: number = 5;
  currentPage: number = 0;
  totalSize: number = 0;
  pageLength: number = 0;
  loading: boolean = true;

  constructor(  ) {

  }

  ngOnInit(): void {
    this.getAllProdutos()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  getAllProdutos(): void {
    this.inventarioService.getAll()
      .subscribe({
        next: (data) => {
          this.loading = false;
          setTimeout(() => {
            this.produtos = data;
            this.pageLength = this.produtos.length;
            this.dataSource = new MatTableDataSource(this.produtos);
            this.dataSource.paginator = this.paginator;

          }, 500);
        },
        error: (e) => { console.error(e);  this.loading = false;}
      });
  }

  editProduct(id: any): void {
    this.router.navigate([
      'inventario',
      'gerenciar-inventario-loja',
      'editar',
      id,
    ]);
  }

  viewProduct(id: any): void {
    this.router.navigate([
      'inventario',
      'gerenciar-inventario-loja',
      'visualizar',
      id,
    ]);
  }

  confirmDelete(id: any): void {
    this.inventarioService.delete(id)
      .subscribe({
        next: (res) => {
          this.getAllProdutos();
        },
        error: (e) => console.error(e)
      });
  }

  deleteProduct(id: any): void {
    this.open(this.modalConfirmDelete);
    this.idToManipulate = id;
  }

  pageEvent(event: any): void {
    console.log(event);
    this.pageSize = event.pageSize;
  }

  goToAddProduto(): void {
    this.router.navigate([
      'inventario',
      'gerenciar-inventario-loja',
      'cadastrar',
    ]);
  }
}
