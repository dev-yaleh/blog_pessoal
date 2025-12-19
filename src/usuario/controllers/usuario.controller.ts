import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

@ApiTags('Usuario') // Decorator que indica um título, para agrupar todas as requisições de Usuário
@Controller("/usuarios")
@ApiBearerAuth()    // Decorator que indica para o Swagger que essa controller usar autorização
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    // Anotação que indica que usaremos uma classe de validação especial (Guard)
    @UseGuards(JwtAuthGuard)    // Vamos nessa rota a autenticação via Token JWT de Validação
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id)
    }

    // Essa rota estará desprotegida de JWT
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    @ApiProperty()
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    @ApiProperty()
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiProperty()
    delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.usuarioService.delete(id);
  }

}