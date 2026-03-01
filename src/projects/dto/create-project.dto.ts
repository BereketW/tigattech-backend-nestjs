import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';

export class ProjectMemberDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'JD' })
  @IsString()
  initials: string;

  @ApiPropertyOptional({ example: '#6366f1' })
  @IsString()
  @IsOptional()
  bgColor?: string;
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Fintech Analytics Dashboard' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'A comprehensive analytics dashboard for fintech companies',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Web App' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ example: ['#React', '#Tailwind', '#SaaS'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional({ type: [ProjectMemberDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectMemberDto)
  @IsOptional()
  members?: ProjectMemberDto[];
}
