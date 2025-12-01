import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/model.entities";
import { Repository } from "typeorm";

@Injectable() // Indica que essa classe é de servço e pode ser inserida/injetada em outras classes
export class PostagemService {

    // Iniciando ferrmentas para a classe de serviço
    constructor(
        @InjectRepository(Postagem) // Pode chamar os métodos de uma Classe Repository do TypeORM
        private postagemRepository: Repository<Postagem>
        

    ) {}
 
async findAll(): Promise<Postagem[]> {

    return this.postagemRepository.find()

}

/*
    pivate idade: number
    private nome: string

    private contaController: ContaController
    

*/

}