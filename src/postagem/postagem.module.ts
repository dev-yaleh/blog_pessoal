import { Module } from "@nestjs/common";
import { Postagem } from './entities/model.entities'
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])], 
 controllers: [PostagemController],
  providers: [PostagemService],
})
export class PostagemModule {}