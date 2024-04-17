import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../../@core/models/produto.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})

export class InventarioService {
  readonly baseUrl = environment.baseUrl + '/Inventarios';
  readonly tokenType = 'Bearer ';
  readonly header = new HttpHeaders().set('Authorization', this.tokenType + localStorage.getItem('JWT_TOKEN'));
  readonly headers = { headers: this.header };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl, this.headers);
  }

  get(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`, this.headers);
  }

  create(data: Produto): Observable<any> {
    return this.http.post(this.baseUrl, data, this.headers);
  }

  update(id: number, data: Produto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.headers);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.headers);
  }

}
