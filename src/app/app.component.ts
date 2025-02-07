import { Component, Output, signal} from '@angular/core';
import { FormularioComponent } from "./formulario/formulario.component";
import { Livro } from './Model/Livro';
import { LivroServiceService } from './Service/livro-service.service';
import { TabelaDadosComponent } from "./tabela-dados/tabela-dados.component";

@Component({
  selector: 'app-root',
  imports: [FormularioComponent, TabelaDadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private service: LivroServiceService) { }

  @Output() livroClicked: Livro;

  livros = signal<Livro[]>([]);

  ngOnInit() {

    this.service.GetAllLivros().subscribe(ret => {

      if (Array.isArray(ret))
      { this.livros.set(ret); }
      else
      { this.livros.set([]); }

    });
  }

  onLivroCreated(livro: Livro) {
    this.service.AddLivro(livro).subscribe(ret => {
     
      this.livros.update((vetor) =>
        (vetor ? [...vetor, ret] : [ret]));
    
    });
  }


  onLivroClicked(id: number) {
    this.service.GetLivroByID(id).
      subscribe(result => {
        this.livroClicked = result;
      });
  }

  onLivroDeleted(id: number) {
    this.service.DeleteLivro(id).subscribe(ret => {
      this.livros.update((vetor) =>
        [...vetor.filter(livro => livro.id !== id)]);
    });

  }

  onUpdateLivro(livro: Livro) {
    this.service.UpdateLivro(livro, livro.id).subscribe(ret => {
      this.livros.update((vetor) =>
        vetor.map((livro) =>
          (livro.id === ret.id ? ret : livro)));

    });
  }

}
