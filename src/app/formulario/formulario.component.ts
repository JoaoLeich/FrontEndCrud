import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { __addDisposableResource } from 'tslib';
import { MatButtonModule } from '@angular/material/button';
import { Livro } from '../Model/Livro';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-formulario',
  imports:
    [
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule,
      CommonModule
    ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent {

  constructor() { }

  @Output() newLivro = new EventEmitter<Livro>();
  @Output() updateLivro = new EventEmitter<Livro>();
  @Input() livro: Livro;

  formulario = new FormGroup
    ({
      idLivro: new FormControl({ value: null }),
      nomeLivro: new FormControl('', [Validators.required, Validators.minLength(3)]),
      categoriaLivro: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dataPublicacao: new FormControl(null, [Validators.required])
    });

  showBtnCadastrar: boolean = true;

  Cadastrar() {

    let id: number = 0;
    let nome: string = this.formulario.value.nomeLivro;
    let categoria: string = this.formulario.value.categoriaLivro;
    let dataPublicacao: Date = this.formulario.value.dataPublicacao;

    let livro: Livro = new Livro(id, nome, categoria, dataPublicacao);

    this.formulario.reset();

    this.newLivro.emit(livro);
  }

  ngOnChanges() {
    
    if (this.livro) {
      this.formulario.patchValue({
        idLivro: this.livro.id,
        nomeLivro: this.livro.nome,
        categoriaLivro: this.livro.categoria,
        dataPublicacao: this.livro.dataPublicacao
      });

      this.showBtnCadastrar = false;
    }
  }

  Alterar() {

    let id: number = this.formulario.value.idLivro;
    let nome: string = this.formulario.value.nomeLivro;
    let categoria: string = this.formulario.value.categoriaLivro;
    let dataPublicacao: Date = this.formulario.value.dataPublicacao;

    let livro: Livro = new Livro(id, nome, categoria, dataPublicacao);

    this.formulario.reset();
    this.showBtnCadastrar = true;

    this.updateLivro.emit(livro);

  }

  Cancelar() {
    this.formulario.reset();

    this.showBtnCadastrar = true;
  }


}
