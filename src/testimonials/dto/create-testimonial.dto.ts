import { IsString, IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestimonialStatus } from '../../../generated/prisma/enums';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Sarah Jenkins' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Marketing Director' })
  @IsString()
  role: string;

  @ApiProperty({ example: 'TechFlow' })
  @IsString()
  company: string;

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 'Amazing team to work with! Delivered beyond expectations.',
  })
  @IsString()
  review: string;

  @ApiPropertyOptional({
    enum: TestimonialStatus,
    default: TestimonialStatus.PENDING,
  })
  @IsEnum(TestimonialStatus)
  @IsOptional()
  status?: TestimonialStatus;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
