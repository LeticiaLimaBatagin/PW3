import { IFilme } from './../models/IFilme.model';
import { IFilmeApi, IListaFilmeApi } from './../models/IFilmeApi.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { IListaFilmes } from '../models/IListaFilmes.model';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { IFilmeDetalhes } from '../models/IFilmeDetalhes.model';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private key = 'api_key=034c5fdfe098d8cb374c2152cf44c2e7';
  private language = 'language=pt-BR';
  private region = 'region=BR';

  constructor(
    private http: HttpClient,
    private  toast: ToastrService
  ) { }

  buscarFilmes(buscar: string): Observable<IListaFilmes>{
    const url = `${this.apiUrl}/search/movie?${this.language}&${this.region}&${this.key}&query=${buscar}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map(result => result),
      catchError(erro => this.exibirErro(erro))
    )
  }

  public listarPopulares(): Observable<IListaFilmes>{
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=034c5fdfe098d8cb374c2152cf44c2e7&language=pt-BR&page=1&region=BR';
    return this.http.get<IListaFilmes>(url).pipe(
      map(result => result),
      catchError(erro => this.exibirErro(erro))
    )
  }

  public buscarPorId(id: number): Observable<IFilmeDetalhes>{
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=034c5fdfe098d8cb374c2152cf44c2e7&language=pt-BR`;
    return this.http.get<IFilmeDetalhes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  public addFilmeAPlaylist(filme: IFilme): Observable<IFilmeApi>{
    const url = 'https://parseapi.back4app.com/classes/Filme';
    const configApi = {
      'X-Parse-Application-Id': 'eGxKdXOIJyCUz6R6qyrcgl7XdQBEfX0IIMdWebtb',
      'X-Parse-REST-API-Key': 'G17ENIE5KI2UWY3Xw5gCPd8QRrkNGISmDPX42ERL'
    };
    const headers = new HttpHeaders(configApi);

    let filmeApi: IFilmeApi;

    filmeApi = {
      poster_path: filme.poster_path,
      adult: filme.adult,
      overview: filme.overview,
      release_date: filme.release_date,
      genre_ids: filme.genre_ids,
      codigo: filme.id,
      original_title: filme.original_title,
      original_language: filme.original_language,
      title: filme.title,
      backdrop_path: filme.backdrop_path,
      popularity: filme.popularity,
      vote_count: filme.vote_count,
      video: filme.video,
      vote_average: filme.vote_average,
    };

    return this.http.post<IFilmeApi>(url, filmeApi,{headers}).pipe(
      map(retorno => retorno),
      catchError(error=>this.exibirErro(error))
    );
  }

  public buscarFilmeDaPlaylist(): Observable<IListaFilmeApi>{
    const url = 'https://parseapi.back4app.com/classes/Filme';
    const configApi = {
      'X-Parse-Application-Id': 'eGxKdXOIJyCUz6R6qyrcgl7XdQBEfX0IIMdWebtb',
      'X-Parse-REST-API-Key': 'G17ENIE5KI2UWY3Xw5gCPd8QRrkNGISmDPX42ERL'
    };
    const headers = new HttpHeaders(configApi);

    return this.http.get<IListaFilmeApi>(url,{headers}).pipe(
      map(retorno => retorno),
      catchError(error=>this.exibirErro(error))
    );
  }

  exibirErro(erro: any): Observable<any>{
    this.exibirMensagens('Erro',`Erro de acesso a API: ${erro.message}`,'toast-error');
    return EMPTY
  }

  exibirMensagens(titulo: string, mensagem: string, tipo: string): void{
    this.toast.show(mensagem, titulo,{closeButton:true, progressBar: true, timeOut: 5000},tipo);
  }

}
