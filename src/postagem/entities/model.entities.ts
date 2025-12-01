import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_postagens' }) //Indica que essa classe é uma Entidade/Model
export class Postagem {

    @PrimaryGeneratedColumn() // Chave Primaria e Auto Incremental
    id: number;

    @IsNotEmpty() // Validador de objetos
    @Column({ length: 100, nullable: false }) // Regra do MySQL - NOT NULL
    titulo: string;

    @IsNotEmpty() // Validador de objetos
    @Column({ length: 1000, nullable: false }) // Regra do MySQL - NOT NULL
    texto: string;

    @UpdateDateColumn()
    data: Date;

}