import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  catchError,
  Observable,
  of,
  Subject,
  take,
  switchMap,
  EMPTY,
} from 'rxjs';
import { ModalService } from 'src/app/shared/modal/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  produtosUm$!: Observable<any[]>;
  produtosDois$!: Observable<any[]>;

  deleteModalRef!: NgbModalRef;
  @ViewChild('deleteModal', { static: true })
  deleteModal!: any;

  error$ = new Subject<boolean>();

  cursoId!: number;

  constructor(
    private _cursoService: CursosService,
    private router: Router,
    private route: ActivatedRoute,
    private _modalService: ModalService
  ) {}

  ngOnInit() {
    // this._cursoService.list()
    // .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    console.log(1);
    this.produtosUm$ = this._cursoService.List(1).pipe(
      catchError((error) => {
        // this.error$.next(true);
        this.handleError();
        return of();
      })
    );

    this.produtosDois$ = this._cursoService.List(2).pipe(
      catchError((error) => {
        // this.error$.next(true);
        this.handleError();
        return of();
      })
    );

    // this.cursos$ += this._cursoService.List(2).pipe(
    //   catchError((error) => {
    //     // this.error$.next(true);
    //     this.handleError();
    //     return of();
    //   })
    // );
    // this.cursos$.subscribe(val => console.log(val));
  }

  handleError() {
    this._modalService.showAlert(
      'Erro ao carregar cursos. Tente novamente mais tarde.',
      'danger'
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(id: any) {
    this.cursoId = id;
    // this.deleteModalRef = this._modalService.openModal(this.deleteModal);
    // this._modalService.showConfirm();

    const result$ = this._modalService.showConfirm();
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this._cursoService.Delete(this.cursoId) : of()
        )
      ).subscribe(
        (success) => {
          //this.onRefresh();
        },
        (error) => {
          console.log(error);
          this._modalService.showAlert(
            error.error.text,
            'info'
          );
          this.onRefresh();
        }
      );
  }

}
