export class Livro {
    id: number;
    nome: string;
    categoria: string;
    dataPublicacao: Date;

    constructor(id: number, nome: string, categoria: string, dataPublicacao: Date) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.dataPublicacao = dataPublicacao;
    }
}