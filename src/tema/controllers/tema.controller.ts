import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../services/tema.service";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)    // Colocando essa Anotação aqui, indica que todos os endpoints são protegidos
@ApiTags('Tema')
@Controller("/temas")
@ApiBearerAuth()
export class TemaController {
    constructor(private readonly temaService: TemaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
        return this.temaService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    findAllBydescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
        return this.temaService.findAllByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiProperty()
    create(@Body() Tema: Tema): Promise<Tema> {
        return this.temaService.create(Tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    update(@Body() Tema: Tema): Promise<Tema> {
        return this.temaService.update(Tema);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiProperty()
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.temaService.delete(id);
    }

}