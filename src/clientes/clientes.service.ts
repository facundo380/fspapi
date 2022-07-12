import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
  ) {}
  async getClientes(): Promise<Cliente[]> {
    return await this.clientesRepository.find();
  }

  findOne(id: string): Promise<Cliente> {
    return this.clientesRepository.findOne(id);
  }

  async createCliente(cliente: Cliente) {
    
    this.clientesRepository.save(cliente);
  }

  async remove(id: string): Promise<void> {
    await this.clientesRepository.delete(id);
  }

  async editCliente(id: string, cliente: Cliente): Promise<Cliente> {
    const editedCliente = await this.clientesRepository.findOne(id);
    if (!editedCliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    editedCliente.operador = cliente.operador;
    editedCliente.denominacion = cliente.denominacion;
    await editedCliente.save();
    return editedCliente;
  }
}