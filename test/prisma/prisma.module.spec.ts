import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PrismaReadService } from '../../src/prisma/prisma-read.service';

describe('PrismaModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should provide PrismaService', async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    const prismaService = module.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
  });

  it('should provide PrismaReadService', async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    const prismaReadService = module.get<PrismaReadService>(PrismaReadService);
    expect(prismaReadService).toBeDefined();
  });
});