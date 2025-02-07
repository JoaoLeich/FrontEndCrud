import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MatTable, MatTableModule } from '@angular/material/table';
import { Livro } from '../Model/Livro';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela-dados',
  imports: [MatTableModule, MatButton, MatTableModule,CommonModule],
  templateUrl: './tabela-dados.component.html',
  styleUrl: './tabela-dados.component.css'
})
export class TabelaDadosComponent {


  @Input() ELEMENT_DATA: Livro[] = [];
  @Output() idAlter = new EventEmitter<number>();
  @Output() idDelete = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'nome', 'categoria', 'dataPublicacao', 'acoes'];
  
  editar(id: number) {
    if (id === 0) {
      return
    }
    this.idAlter.emit(id);

  }

  deletar(id: number) {
    if (id === 0) {
      return
  }
    this.idDelete.emit(id);
  }

}
