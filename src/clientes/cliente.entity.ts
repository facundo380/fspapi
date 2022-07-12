import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';


@Entity()
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  operador: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  denominacion: string;

  
}