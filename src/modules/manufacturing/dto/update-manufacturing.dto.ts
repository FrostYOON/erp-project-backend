import { PartialType } from '@nestjs/swagger';
import { CreateManufacturingDto } from './create-manufacturing.dto';

export class UpdateManufacturingDto extends PartialType(CreateManufacturingDto) {}
