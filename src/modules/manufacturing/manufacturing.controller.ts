import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturingService } from './manufacturing.service';
import { CreateManufacturingDto } from './dto/create-manufacturing.dto';
import { UpdateManufacturingDto } from './dto/update-manufacturing.dto';

@Controller('manufacturing')
export class ManufacturingController {
  constructor(private readonly manufacturingService: ManufacturingService) {}

  @Post()
  create(@Body() createManufacturingDto: CreateManufacturingDto) {
    return this.manufacturingService.create(createManufacturingDto);
  }

  @Get()
  findAll() {
    return this.manufacturingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufacturingDto: UpdateManufacturingDto) {
    return this.manufacturingService.update(+id, updateManufacturingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturingService.remove(+id);
  }
}
