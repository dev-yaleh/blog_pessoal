import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])
    forwardRef(() => AuthModule),
],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}