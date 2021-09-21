import { FilmesService } from './../../services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { IListaFilmes } from 'src/app/models/IListaFilmes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buscar: string = '';
  public listaDeFilmes: IListaFilmes = {};

  constructor(private filmesService: FilmesService) {
  }

  ngOnInit(): void {
    this.buscarFilmesPopulares();
  }

  buscarFilmes(filtro: string): void{
    this.filmesService.buscarFilmes(filtro).subscribe(retorno =>{
      this.listaDeFilmes = retorno;
    });
  }

  buscarFilmesPopulares(): void{
    this.filmesService.listarPopulares().subscribe(result => {
      this.listaDeFilmes = result;
    });
  }

  filtrarFilmes(): void{
    if(this.buscar.length > 0)
      this.buscarFilmes(this.buscar);
    else
      this.buscarFilmesPopulares();
  }

  listarFilmeAleatorio(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    this.buscarFilmes(characters.charAt(Math.floor(Math.random() * charactersLength)));
 }
}
