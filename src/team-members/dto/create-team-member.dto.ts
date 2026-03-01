import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MemberStatus } from '@prisma/client';

export class CreateTeamMemberDto {
  @ApiProperty({ example: 'Alexandra Deff' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Senior Product Designer' })
  @IsString()
  role: string;

  @ApiProperty({ example: 'Dev' })
  @IsString()
  department: string;

  @ApiPropertyOptional({ enum: MemberStatus, default: MemberStatus.OFFLINE })
  @IsEnum(MemberStatus)
  @IsOptional()
  status?: MemberStatus;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isLead?: boolean;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/alexandradeff' })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://github.com/alexandradeff' })
  @IsString()
  @IsOptional()
  github?: string;

  @ApiPropertyOptional({ example: 'https://twitter.com/alexandradeff' })
  @IsString()
  @IsOptional()
  twitter?: string;
}
