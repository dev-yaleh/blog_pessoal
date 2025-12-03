import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/model.entities";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

/*
    @Injectable: Indica que é uma Classe de Serviço e pode ser inserida/injetada 
    diretamente em outras classes sem a necessidade de instância

    @InjectRepository(Postagem): Decorator que inverte a dependência da Classe(Repository).
    Com isso, podemos criar objetos de Classes Repository sem precisar instanciar objetos.
    Além disso, indica ao Nest que a nossa Repository aponta para a Entidade Postagem, isto é,
    os métodos de manipulação de BD dentro da Repository serão direcionados a tabela tb_postagem
*/

@Injectable() // Indica que essa classe é de servço e pode ser inserida/injetada em outras classes
export class PostagemService {

    // Iniciando ferrmentas para a classe de serviço
    constructor(
        @InjectRepository(Postagem) // Pode chamar os métodos de uma Classe Repository do TypeORM
        private postagemRepository: Repository<Postagem>
        

    ) { }
 
async findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find()

}

// Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
        where: { id }
    })

    if (!postagem) {
        throw new HttpException('Postagem not found', HttpStatus.NOT_FOUND);
    }
    // Se a postagem foi encontrada, retorna ela
    return postagem;
}

 async findByTitulo(titulo: string): Promise<Postagem[]> {
        // Verifica se existi postagem com o parametro informado
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {

        /*
            {
                "id": 1
                "titulo": "",
                "texto": "Texto da Postagem 3"
            }
        */

        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(postagem.id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem || !postagem.id) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        // Se a postagem foi encontrada, cadastra ela no BD e retorna ela
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        // Se a postagem foi encontrada, apaga ela no BD e retorna uma confirmação de exclusão
        return await this.postagemRepository.delete(id);

    }

}

/* REPOSITORY<POSTAGEM>

    find() => SELECT * FROM tb_postagens
    save() => INSERT INTO tb_postagens VALUES (titulo, texto, data)

    findOne() => SELECT * FROM tb_postagens WHERE id = {id}

*/

/*
    pivate idade: number
    private nome: string

    private contaController: ContaController
    

*/
