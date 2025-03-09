import { Injectable } from '@nestjs/common';
import { CreateManufacturingDto } from './dto/create-manufacturing.dto';
import { UpdateManufacturingDto } from './dto/update-manufacturing.dto';

@Injectable()
export class ManufacturingService {
  create(createManufacturingDto: CreateManufacturingDto) {
    return 'This action adds a new manufacturing';
  }

  findAll() {
    return `This action returns all manufacturing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacturing`;
  }

  update(id: number, updateManufacturingDto: UpdateManufacturingDto) {
    return `This action updates a #${id} manufacturing`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturing`;
  }
}
