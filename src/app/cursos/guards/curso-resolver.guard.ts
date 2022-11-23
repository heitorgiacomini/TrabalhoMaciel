import { IProduto } from './../IProduto';
import { CursosService } from './../cursos.service';
import { Curso } from './../curso';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CursoResolverGuard implements Resolve<IProduto> {

  constructor(
    private _cursosService: CursosService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduto> {// | Promise<Curso>|  Curso  {
    if(route.params && route.params['id']){
      return this._cursosService.GetById(route.params['id']);
    }


    return of({
      idProduto: null,
      idCategoria: null,
      foto: null,
      descricao: null,
      nome: null,
      preco: null
    });


    // return of({
    //   id: null,
    //   nome: null,
    //   telefone: null
    // });

  }

}
