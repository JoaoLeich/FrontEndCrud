import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../Model/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroServiceService {

  URL: string = "http://localhost:5207";

  constructor(private client: HttpClient) { }

  GetAllLivros(): Observable<Livro[]> {
    return this.client.get<Livro[]>(`${this.URL}/livros`);
  }

  GetLivroByID(id: number): Observable<Livro> {
    return this.client.get<Livro>(`${this.URL}/livros/${id}`);
  }

  AddLivro(livro: Livro): Observable<Livro> {
    return this.client.post<Livro>(`${this.URL}/livros`, livro);
  }

  DeleteLivro(id: number): Observable<void> {
    return this.client.delete<void>(`${this.URL}/livros/${id}`);
  }

  UpdateLivro(newLivro: Livro,id:number): Observable<Livro> {
    return this.client.put<Livro>(`${this.URL}/livros/${id}`, newLivro);
  }

}
