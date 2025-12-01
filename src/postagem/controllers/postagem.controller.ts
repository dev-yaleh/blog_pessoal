import { Postagem } from '../entities/model.entities';
import { PostagemService } from './../services/postagem.service';
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

@Controller("/postagens") // Indica que Classe é uma Controller
export class PostagemController {

constructor(private readonly postagemService: PostagemService) {}

@Get()
@HttpCode(HttpStatus.OK) // Define o código de status HTTP para 200 OK  
findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll(); // Chama o método findAll do serviço de postagem
}

}

