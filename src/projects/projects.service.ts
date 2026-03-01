import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProjectDto) {
    const { members, ...data } = dto;
    return this.prisma.project.create({
      data: {
        ...data,
        tags: data.tags ?? [],
        members: members?.length
          ? { createMany: { data: members } }
          : undefined,
      },
      include: { members: true },
    });
  }

  findAll() {
    return this.prisma.project.findMany({
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    const { members, ...data } = dto;

    return this.prisma.$transaction(async (tx) => {
      // If members are provided, replace them entirely
      if (members !== undefined) {
        await tx.projectMember.deleteMany({ where: { projectId: id } });
        if (members.length > 0) {
          await tx.projectMember.createMany({
            data: members.map((m) => ({ ...m, projectId: id })),
          });
        }
      }

      return tx.project.update({
        where: { id },
        data,
        include: { members: true },
      });
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({
      where: { id },
      include: { members: true },
    });
  }
}
