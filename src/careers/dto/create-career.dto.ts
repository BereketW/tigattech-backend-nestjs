import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CareerStatus, EmploymentType } from '@prisma/client';

export class CreateCareerDto {
  @ApiProperty({ example: 'Senior Frontend Developer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'engineering' })
  @IsString()
  category: string;

  @ApiProperty({ enum: EmploymentType, example: EmploymentType.FULL_TIME })
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({ example: 'We are looking for a senior frontend developer...' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ enum: CareerStatus, default: CareerStatus.ACTIVE })
  @IsEnum(CareerStatus)
  @IsOptional()
  status?: CareerStatus;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({ example: 'terminal', default: 'terminal' })
  @IsString()
  @IsOptional()
  icon?: string;
}
