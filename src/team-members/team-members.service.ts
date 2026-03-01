import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto';

@Injectable()
export class TeamMembersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({ data: dto });
  }

  findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) throw new NotFoundException(`Team member #${id} not found`);
    return member;
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    await this.findOne(id);
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.teamMember.delete({ where: { id } });
  }
}
