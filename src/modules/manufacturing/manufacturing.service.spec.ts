import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturingService } from './manufacturing.service';

describe('ManufacturingService', () => {
  let service: ManufacturingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManufacturingService],
    }).compile();

    service = module.get<ManufacturingService>(ManufacturingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
