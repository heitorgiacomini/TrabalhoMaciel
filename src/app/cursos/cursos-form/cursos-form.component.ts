import { Curso } from './../curso';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../shared/modal/alert-modal.service';
import { Location } from '@angular/common';
import { map, switchMap, tap } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _cursosService: CursosService,
    private _alertModalService: ModalService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      idProduto: [curso.idProduto],
      nome: [curso.nome, [Validators.required]],
      descricao: [curso.descricao, [Validators.required]],
      foto: [curso.foto, [Validators.required]],
      preco: [curso.preco, [Validators.required]],
      idCategoria: [curso.idCategoria, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this._cursosService.Save(this.form.value).subscribe(
        (success) => {
          this._alertModalService.showAlert(
            'Produto salvo com sucesso!',
            'success',
            1500
          );
          this._location.back();
        },
        (error) => {
          console.log(error);
          this._alertModalService.showAlert(error.error.text, 'info', 1500);
          this.router.navigate([''], { relativeTo: this.route });
        },
        () => {}
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field)!.errors;
    // return this.form.controls[field].errors;
  }
}
