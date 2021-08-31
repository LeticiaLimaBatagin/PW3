import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListaFilmes } from '../models/IListaFilmes.model';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private key = 'api_key=034c5fdfe098d8cb374c2152cf44c2e7';
  private language = 'language=pt-BR';
  private region = 'region=BR';

  constructor(private http: HttpClient) { }

  buscarFilmes(buscar: string): Observable<IListaFilmes>{
    const url = `${this.apiUrl}/search/movie?${this.language}&${this.region}&${this.key}&query=${buscar}`;
    return this.http.get<IListaFilmes>(url);
  }
}
