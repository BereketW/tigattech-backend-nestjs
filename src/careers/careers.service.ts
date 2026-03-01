import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCareerDto, UpdateCareerDto } from './dto';

@Injectable()
export class CareersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCareerDto) {
    return this.prisma.career.create({ data: dto });
  }

  findAll() {
    return this.prisma.career.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const career = await this.prisma.career.findUnique({ where: { id } });
    if (!career) throw new NotFoundException(`Career #${id} not found`);
    return career;
  }

  async update(id: string, dto: UpdateCareerDto) {
    await this.findOne(id);
    return this.prisma.career.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.career.delete({ where: { id } });
  }
}
