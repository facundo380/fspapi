import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { debug } from 'console';
import { Note } from 'src/notes/note.entity';
import { getConnection } from "typeorm";
import { Cliente } from './cliente.entity';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  [x: string]: any;
  constructor(private clientesService: ClientesService) { }

  @Get()
  findAll() {
    return this.clientesService.getClientes();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.clientesService.findOne(id);
  }

  @Post() async create(@Body() cliente: Cliente) {
    //pruebo tranzaccion
    const connection = getConnection(); const queryRunner = connection.createQueryRunner();
    const operador =cliente.operador
    const denominacion =cliente.denominacion
    await queryRunner.connect();
    await queryRunner.query("INSERT INTO note  VALUES ('100','9aaa','9bbbb')");
    await queryRunner.query("INSERT INTO cliente  VALUES ('" + operador +  "','" + denominacion +  "')");
    await queryRunner.startTransaction();
    try {
      await queryRunner.commitTransaction();
      console.log("Intentando transaccion");
    }
    catch (err) {

      // since we have errors lets rollback changes we made await 
      console.log(err);
      
      queryRunner.rollbackTransaction();
    }
    finally {

      // you need to release query runner which is manually created: 
      console.log("Finalizando transaccion");
      await queryRunner.release();
      
    }

    //fin transaccion
    /*
    await Cliente
      .createQueryBuilder()
      .insert()
      .into("cliente")
      .values([
        { operador: "28", denominacion: "ORM OK 26 !!!" },
        { operador: "29", denominacion: "ORM OK 27 !!!" },
      ])
      .execute()

    await Note
      .createQueryBuilder()
      .insert()
      .into("note")
      .values([
        { title: "Desde Cliente..", description: "ORM OK Desde Clientes !!!" }
        //{ operador: "25", denominacion: "ORM OK 25 !!!" },
      ])
      .execute()
      */

    return this.clientesService.createCliente(cliente);
  }

  @Patch(':id')
  async editCliente(@Body() cliente: Cliente, @Param('id') id: string): Promise<Cliente> {
    const clienteEdited = await this.clientesService.editCliente(id, cliente);

    return clienteEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.clientesService.remove(id);
  }
}
