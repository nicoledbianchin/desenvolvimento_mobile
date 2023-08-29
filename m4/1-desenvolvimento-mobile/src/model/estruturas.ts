export class Nota {
    id: number;
    titulo: string;
    texto: string;
    modificacao: Date;
    status: number;

    constructor(id: number, titulo: string) {
        this.id = id;
        this.titulo = titulo;
        this.modificacao = new Date();
        this.status = 0;
    }
}

export class Usuario {
    id: string;
    nome: string;
    email: string;
    notas: Nota[];
    ultId = 0;

    constructor(id: string, nome: string) {
        this.id = id;
        this.nome = nome;

        // importante inicializar arrays antes de utilizá-los!!!
        this.notas = [];
    }

    inserirNota(titulo: string, texto: string, status: number): Nota {
        this.ultId++;
        const nota = this.addNota(this.ultId, titulo);
        nota.texto = texto;
        nota.status = status;
        return nota;
    }

    addNota(id, titulo): Nota {
        const nota: Nota = new Nota(id, titulo);
        this.notas.push(nota);
        this.ultId = id;
        return nota;
    }

    /**
     * Altera dados de uma nota especifica.
     * @param nota objeto com os dados da nota. O atributo id indica o objeto a ser alterado.
     */
    alterar(nota: Nota): void {
        for (let index = 0; index < this.notas.length; index++) {
            const element = this.notas[index];
            if (element.id === nota.id) {
                element.status = nota.status;
                element.texto = nota.texto;
                element.titulo = nota.titulo;
                element.modificacao = new Date();
                return;
            }
        }
    }

    removerNota(id): Nota {
        for (let index = 0; index < this.notas.length; index++) {
            const element = this.notas[index];
            if (element.id === id) {
                this.remover(element);
                return element;
            }
        }
    }

    remover(nota): void {
        nota.status = 1;
        nota.modificacao = new Date();
    }

    recuperar(nota): void {
        nota.status = 0;
        nota.modificacao = new Date();
    }


}
