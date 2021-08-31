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
    this.buscarFilmes();

  }

  buscarFilmes(filtro = this.listarFilmeAleatorio()): void{
    this.filmesService.buscarFilmes(filtro).subscribe(retorno =>{
      this.listaDeFilmes = retorno;
    });
  }
  filtrarFilmes(): void{
    this.buscarFilmes(this.buscar);
  }

  verFilmes():void{
    console.log(this.listaDeFilmes);
  }

  listarFilmeAleatorio() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    return characters.charAt(Math.floor(Math.random() * charactersLength));
 }
}
