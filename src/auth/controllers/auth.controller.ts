import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    // Anotação que indica que usaremos uma classe de validação especial (Guard)
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UsuarioLogin })
    @Post('/login')
     async login(@Request() req): Promise<{ token: string }> {
    return this.authService.login(req.user);
  }

}