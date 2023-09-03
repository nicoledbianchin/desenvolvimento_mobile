export class Usuario {
    uid?: string;
    did?: string;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;

    constructor() {
    }
}

// Objeto que representará uma resposta do serviço do Firebase para criação e login de usuário
export interface UserResponse {
    // campos devem ser opcionais, pois pode vir resulado com sucesso ou erro
    result?: {
        email?: string;
        uid?: string;
        user?: any;
    };
    error?: {
        code?: string;
        message?: string;
    };
}
